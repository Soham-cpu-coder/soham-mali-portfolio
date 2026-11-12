import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { profile } from "@/data/profile";

// In-memory rate limiting store (IP -> array of request timestamps)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 3;

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
  email: z.string().trim().email("Please provide a valid email address"),
  subject: z.string().trim().max(150, "Subject is too long").optional().default("Portfolio Contact Form"),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000, "Message is too long"),
  // Honeypot field - must be empty
  website_hp: z.string().max(0, "Bot detected").optional().or(z.literal("")),
});

export async function POST(request: Request) {
  try {
    // 1. IP extraction and rate limiting
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "anonymous";

    const now = Date.now();
    const timestamps = rateLimitMap.get(ip) || [];
    const recentTimestamps = timestamps.filter((time) => now - time < RATE_LIMIT_WINDOW_MS);

    if (recentTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many messages sent. Please wait a minute before trying again or email directly.",
        },
        { status: 429 }
      );
    }

    recentTimestamps.push(now);
    rateLimitMap.set(ip, recentTimestamps);

    // 2. Body parsing and validation
    const json = await request.json();
    const parseResult = contactSchema.safeParse(json);

    if (!parseResult.success) {
      const firstError = parseResult.error.errors[0]?.message || "Invalid form submission";
      return NextResponse.json({ success: false, error: firstError }, { status: 400 });
    }

    const { name, email, subject, message, website_hp } = parseResult.data;

    // Honeypot check: If filled, silently acknowledge without sending email
    if (website_hp && website_hp.length > 0) {
      return NextResponse.json({ success: true, message: "Message received." });
    }

    // 3. Resend configuration check
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey || apiKey.trim() === "" || apiKey === "your_resend_api_key_here") {
      return NextResponse.json(
        {
          success: false,
          error: "Resend API key is not configured on the server.",
          useMailto: true,
          recipientEmail: profile.email,
        },
        { status: 503 }
      );
    }

    // 4. Send email via Resend
    const resend = new Resend(apiKey);
    const fromAddress = process.env.RESEND_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";

    const data = await resend.emails.send({
      from: fromAddress,
      to: profile.email,
      replyTo: email,
      subject: `[Portfolio Inquiry] ${subject || `Message from ${name}`}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #111;">
          <h2 style="color: #3b82f6;">New Portfolio Contact Inquiry</h2>
          <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
          <p><strong>Subject:</strong> ${subject || "General Inquiry"}</p>
          <div style="margin-top: 16px; padding: 16px; background-color: #f4f4f5; border-radius: 8px;">
            <p style="white-space: pre-wrap; margin: 0;">${message}</p>
          </div>
        </div>
      `,
    });

    if (data.error) {
      return NextResponse.json(
        {
          success: false,
          error: data.error.message || "Failed to dispatch email via provider.",
          useMailto: true,
          recipientEmail: profile.email,
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Your message has been sent successfully! I will get back to you promptly.",
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Internal server error occurred while processing message.",
        useMailto: true,
        recipientEmail: profile.email,
      },
      { status: 500 }
    );
  }
}
