"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle2, AlertTriangle, Mail, Loader2 } from "lucide-react";
import { profile } from "@/data/profile";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.string().trim().email("Please enter a valid email address"),
  subject: z.string().trim().max(100).optional(),
  message: z.string().trim().min(10, "Message must be at least 10 characters"),
  website_hp: z.string().max(0).optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [serverStatus, setServerStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [serverMessage, setServerMessage] = useState<string>("");
  const [showMailtoFallback, setShowMailtoFallback] = useState<boolean>(false);
  const [cachedValues, setCachedValues] = useState<ContactFormData | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      website_hp: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setServerStatus("submitting");
    setServerMessage("");
    setShowMailtoFallback(false);
    setCachedValues(data);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resData = await res.json();

      if (res.ok && resData.success) {
        setServerStatus("success");
        setServerMessage(
          resData.message || "Thank you! Your message has been dispatched."
        );
        reset();
      } else {
        setServerStatus("error");
        setServerMessage(
          resData.error ||
            "Unable to send message. You can reach out directly via your email client."
        );
        if (resData.useMailto || res.status === 503 || res.status === 502) {
          setShowMailtoFallback(true);
        }
      }
    } catch (err: any) {
      setServerStatus("error");
      setServerMessage(
        "Network connection error. Please use direct email fallback below."
      );
      setShowMailtoFallback(true);
    }
  };

  const getMailtoLink = () => {
    if (!cachedValues) return `mailto:${profile.email}`;
    const subject = encodeURIComponent(
      `[Portfolio] ${cachedValues.subject || "Direct Message"} - from ${cachedValues.name}`
    );
    const body = encodeURIComponent(
      `Hi Soham,\n\n${cachedValues.message}\n\nBest regards,\n${cachedValues.name}\n${cachedValues.email}`
    );
    return `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="rounded-2xl bg-[#10121A] border border-white/10 p-6 sm:p-8">
      <h3 className="text-lg font-bold text-white mb-2">Send a Message</h3>
      <p className="text-xs text-slate-400 mb-6">
        Recruiters and collaborators: drop a note here and it will be forwarded directly to my inbox.
      </p>

      {/* Success Notification */}
      {serverStatus === "success" && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-white">Message Sent Successfully</p>
            <p className="mt-1 text-slate-300">{serverMessage}</p>
            <button
              type="button"
              onClick={() => setServerStatus("idle")}
              className="mt-3 text-xs font-semibold text-emerald-400 hover:text-emerald-300 underline"
            >
              Send another message
            </button>
          </div>
        </div>
      )}

      {/* Error / Fallback Notification */}
      {serverStatus === "error" && (
        <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs sm:text-sm space-y-3">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-white">Message Dispatch Notice</p>
              <p className="mt-1 text-slate-300">{serverMessage}</p>
            </div>
          </div>

          {showMailtoFallback && (
            <div className="pt-2 border-t border-rose-500/20">
              <a
                href={getMailtoLink()}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-medium hover:bg-blue-500 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>Open in Email App ({profile.email})</span>
              </a>
            </div>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Honeypot field (hidden offscreen from screen readers & users) */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website_hp">Leave this empty</label>
          <input
            id="website_hp"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("website_hp")}
          />
        </div>

        {/* Name & Email Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-xs font-medium text-slate-300 mb-1.5">
              Your Name <span className="text-blue-400">*</span>
            </label>
            <input
              id="name"
              type="text"
              placeholder="e.g. Alex Chen"
              {...register("name")}
              className={`w-full px-3.5 py-2.5 rounded-xl bg-[#090C14] border ${
                errors.name ? "border-rose-500" : "border-white/10"
              } text-white placeholder:text-slate-600 text-xs sm:text-sm focus:border-blue-500 focus:outline-none transition-colors`}
            />
            {errors.name && (
              <p className="text-[11px] text-rose-400 mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-xs font-medium text-slate-300 mb-1.5">
              Email Address <span className="text-blue-400">*</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="alex@company.com"
              {...register("email")}
              className={`w-full px-3.5 py-2.5 rounded-xl bg-[#090C14] border ${
                errors.email ? "border-rose-500" : "border-white/10"
              } text-white placeholder:text-slate-600 text-xs sm:text-sm focus:border-blue-500 focus:outline-none transition-colors`}
            />
            {errors.email && (
              <p className="text-[11px] text-rose-400 mt-1">{errors.email.message}</p>
            )}
          </div>
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="subject" className="block text-xs font-medium text-slate-300 mb-1.5">
            Subject
          </label>
          <input
            id="subject"
            type="text"
            placeholder="Internship opportunity / Technical discussion"
            {...register("subject")}
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#090C14] border border-white/10 text-white placeholder:text-slate-600 text-xs sm:text-sm focus:border-blue-500 focus:outline-none transition-colors"
          />
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-xs font-medium text-slate-300 mb-1.5">
            Message <span className="text-blue-400">*</span>
          </label>
          <textarea
            id="message"
            rows={4}
            placeholder="Tell me about your team, the role requirements, or project details..."
            {...register("message")}
            className={`w-full px-3.5 py-2.5 rounded-xl bg-[#090C14] border ${
              errors.message ? "border-rose-500" : "border-white/10"
            } text-white placeholder:text-slate-600 text-xs sm:text-sm focus:border-blue-500 focus:outline-none transition-colors resize-y`}
          />
          {errors.message && (
            <p className="text-[11px] text-rose-400 mt-1">{errors.message.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={serverStatus === "submitting"}
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold text-xs sm:text-sm hover:bg-blue-500 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed transition-all focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          {serverStatus === "submitting" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Dispatching message...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
