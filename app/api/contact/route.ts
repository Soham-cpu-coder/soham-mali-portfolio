import { NextResponse } from "next/server";
import { Resend } from "resend";
import { profile } from "@/data/profile";
import { contactFormSchema } from "@/lib/contact";

export const runtime = "nodejs";

/**
 * Escapes user inputs to prevent HTML/script injection inside email templates.
 */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// NOTE: In-memory rate limiting does not persist across serverless function cold starts/lambdas on Vercel;
// it acts as a best-effort guard per execution instance.
interface RateLimitRecord {
  count: number;
  resetTime: number;
}
const rateLimitMap = new Map<string, RateLimitRecord>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  record.count += 1;
  return true;
}

export async function POST(request: Request) {
  try {
    // Get client IP for rate limiting
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          error: "Too many messages sent. Please wait a few minutes before trying again.",
        },
        { status: 429 }
      );
    }

    const body: unknown = await request.json();
    const parseResult = contactFormSchema.safeParse(body);

    if (!parseResult.success) {
      const fieldErrors = parseResult.error.flatten().fieldErrors;
      const firstErrorMessage =
        Object.values(fieldErrors)[0]?.[0] || "Invalid form submission. Please check your inputs.";
      return NextResponse.json({ error: firstErrorMessage }, { status: 400 });
    }

    const { name, email, message, website } = parseResult.data;

    // Honeypot trap: if filled, pretend success without sending
    if (website && website.length > 0) {
      return NextResponse.json(
        { success: true, message: "Thank you for reaching out!" },
        { status: 200 }
      );
    }

    // Gracefully handle missing RESEND_API_KEY
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey || apiKey.trim() === "" || apiKey === "re_123456789") {
      return NextResponse.json(
        {
          error:
            "Email service is currently offline or not configured with RESEND_API_KEY. Please reach out directly at " +
            profile.email +
            " or via WhatsApp.",
        },
        { status: 503 }
      );
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message);

    const resend = new Resend(apiKey);
    const toEmail = process.env.CONTACT_TO_EMAIL || profile.email;
    const fromEmail = process.env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";

    const { error: resendError } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: `New Portfolio Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\nSent from Soham Mali's Portfolio`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #0F1117; color: #FFFFFF; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
          <h2 style="color: #3B82F6; margin-top: 0;">New Message from Portfolio</h2>
          <div style="background: rgba(255,255,255,0.05); padding: 16px; border-radius: 8px; margin-bottom: 20px;">
            <p style="margin: 4px 0;"><strong>Sender:</strong> ${safeName}</p>
            <p style="margin: 4px 0;"><strong>Email:</strong> <a href="mailto:${safeEmail}" style="color: #8B5CF6;">${safeEmail}</a></p>
          </div>
          <div style="padding: 16px; background: #08090D; border-radius: 8px; border-left: 4px solid #3B82F6;">
            <p style="white-space: pre-wrap; margin: 0; line-height: 1.6; color: #E5E7EB;">${safeMessage}</p>
          </div>
          <p style="font-size: 12px; color: #6B7280; margin-top: 24px; text-align: center;">
            Sent from portfolio contact form &bull; Reply directly to this email to respond to ${safeName}.
          </p>
        </div>
      `,
    });

    if (resendError) {
      return NextResponse.json(
        {
          error:
            "Failed to send email via provider: " +
            resendError.message +
            ". Please contact via direct email or WhatsApp.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been received! I'll get back to you shortly.",
      },
      { status: 200 }
    );
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
