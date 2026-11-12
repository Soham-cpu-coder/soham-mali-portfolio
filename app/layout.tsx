import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  metadataBase: new URL("https://soham-mali-portfolio.vercel.app"),
  title: `${profile.name} | ${profile.role}`,
  description: profile.tagline,
  authors: [{ name: profile.name, url: profile.linkedin }],
  creator: profile.name,
  keywords: [
    "Soham Mali",
    "Full Stack Developer",
    "Computer Engineering",
    "AI/ML",
    "Machine Learning",
    "Python",
    "Next.js",
    "React",
    "TypeScript",
    "Portfolio",
    "Internship",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://soham-mali-portfolio.vercel.app",
    title: `${profile.name} | ${profile.role}`,
    description: profile.tagline,
    siteName: `${profile.name} Portfolio`,
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: `${profile.name} - Developer Portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} | ${profile.role}`,
    description: profile.tagline,
    images: ["/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#08090D",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-[#08090D] text-slate-100 antialiased selection:bg-blue-600/30 selection:text-white">
        <Navbar />
        {children}
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
