import { z } from "zod";
import { profile } from "@/data/profile";

/**
 * Returns a standard WhatsApp click-to-chat URL with pre-filled message
 */
export function whatsappLink(
  number: string = profile.whatsapp.number,
  defaultMessage: string = profile.whatsapp.defaultMessage
): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(defaultMessage)}`;
}

/**
 * Returns a mailto link with the configured profile email
 */
export function mailtoLink(email: string = profile.email): string {
  return `mailto:${email}`;
}

/**
 * Safe external link attributes for security and SEO
 */
export const externalLinkProps = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;

/**
 * Shared Contact Form validation schema (client & server)
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name cannot exceed 100 characters")
    .trim(),
  email: z
    .string()
    .email("Please enter a valid email address")
    .max(150, "Email cannot exceed 150 characters")
    .trim(),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(3000, "Message cannot exceed 3000 characters")
    .trim(),
  website: z.string().max(0, "Bot detected").optional().or(z.literal("")),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
