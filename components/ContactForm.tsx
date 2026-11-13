"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { contactFormSchema, ContactFormData } from "@/lib/contact";

export function ContactForm() {
  const [serverStatus, setServerStatus] = useState<{
    type: "idle" | "success" | "error";
    message?: string;
  }>({ type: "idle" });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      website: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setServerStatus({ type: "idle" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message.");
      }

      setServerStatus({
        type: "success",
        message: result.message || "Message delivered successfully! I will reply shortly.",
      });
      reset();
    } catch (err) {
      setServerStatus({
        type: "error",
        message:
          err instanceof Error
            ? err.message
            : "An unexpected error occurred. Please try contacting via WhatsApp or direct email.",
      });
    }
  };

  return (
    <div className="glass-panel rounded-2xl p-6 sm:p-8 text-left space-y-6">
      <div className="space-y-1">
        <h3 className="text-xl font-bold text-white">Send Me a Message</h3>
        <p className="text-xs text-gray-400">
          Have an inquiry, project proposal, or just want to discuss software engineering? Fill out
          the form below.
        </p>
      </div>

      {serverStatus.type === "success" && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3 text-emerald-300 text-xs sm:text-sm animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-emerald-400" />
          <span>{serverStatus.message}</span>
        </div>
      )}

      {serverStatus.type === "error" && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3 text-rose-300 text-xs sm:text-sm animate-in fade-in">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-rose-400" />
          <div className="space-y-1">
            <span className="font-semibold">Notice:</span>
            <p>{serverStatus.message}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        {/* Anti-spam honeypot (hidden from screen readers & users) */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input
            id="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("website")}
          />
        </div>

        {/* Name input */}
        <div className="space-y-1.5">
          <label htmlFor="contact-name" className="text-xs font-mono text-gray-300 block">
            Your Name <span className="text-rose-400">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            placeholder="John Doe"
            disabled={isSubmitting}
            {...register("name")}
            className={`w-full px-4 py-2.5 rounded-xl bg-surface border text-sm text-white placeholder-gray-500 focus:outline-none transition-colors ${
              errors.name
                ? "border-rose-500 focus:border-rose-400"
                : "border-border-subtle focus:border-accent-blue"
            }`}
          />
          {errors.name && (
            <p className="text-[11px] text-rose-400 font-mono">{errors.name.message}</p>
          )}
        </div>

        {/* Email input */}
        <div className="space-y-1.5">
          <label htmlFor="contact-email" className="text-xs font-mono text-gray-300 block">
            Email Address <span className="text-rose-400">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            placeholder="john@example.com"
            disabled={isSubmitting}
            {...register("email")}
            className={`w-full px-4 py-2.5 rounded-xl bg-surface border text-sm text-white placeholder-gray-500 focus:outline-none transition-colors ${
              errors.email
                ? "border-rose-500 focus:border-rose-400"
                : "border-border-subtle focus:border-accent-blue"
            }`}
          />
          {errors.email && (
            <p className="text-[11px] text-rose-400 font-mono">{errors.email.message}</p>
          )}
        </div>

        {/* Message input */}
        <div className="space-y-1.5">
          <label htmlFor="contact-message" className="text-xs font-mono text-gray-300 block">
            Your Message <span className="text-rose-400">*</span>
          </label>
          <textarea
            id="contact-message"
            rows={4}
            placeholder="Tell me about your project, idea, or questions..."
            disabled={isSubmitting}
            {...register("message")}
            className={`w-full px-4 py-2.5 rounded-xl bg-surface border text-sm text-white placeholder-gray-500 focus:outline-none transition-colors resize-none ${
              errors.message
                ? "border-rose-500 focus:border-rose-400"
                : "border-border-subtle focus:border-accent-blue"
            }`}
          />
          {errors.message && (
            <p className="text-[11px] text-rose-400 font-mono">{errors.message.message}</p>
          )}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-accent-blue to-accent-violet text-white font-medium text-sm hover:opacity-95 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-accent-blue/20"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Transmitting Message...</span>
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
