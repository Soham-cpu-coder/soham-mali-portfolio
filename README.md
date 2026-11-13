# Soham Mali &bull; Production Developer Portfolio

A dark futuristic, high-performance personal developer portfolio built with Next.js (App Router), React, TypeScript (`strict: true`), Tailwind CSS, Motion for React (`motion/react`), Lucide React, and React Hook Form + Zod.

---

## 1. Quick Start

### Prerequisites
- Node.js `20+` (see `.nvmrc`)
- npm or pnpm

### Install & Run
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 2. Deployment

### Build Command
```bash
npm run build
```
Output directory: `.next` (default Next.js output).

### Required & Optional Environment Variables

Configure these in the **Environment Variables** settings in your Vercel project dashboard:

| Variable | Required? | Example | Purpose |
| :--- | :--- | :--- | :--- |
| `RESEND_API_KEY` | Optional | `re_123456789` | API key from [resend.com](https://resend.com) to send contact form emails. (If omitted, form displays a graceful offline message). |
| `CONTACT_TO_EMAIL` | Required | `sohammali68@gmail.com` | Destination email where messages are delivered. |
| `CONTACT_FROM_EMAIL` | Required | `onboarding@resend.dev` | Sender address verified in Resend. |
| `NEXT_PUBLIC_SITE_URL` | Required | `https://sohammali.vercel.app` | Canonical site URL for metadata, Open Graph, and sitemap generation. |
| `GITHUB_TOKEN` | Optional | `ghp_abcdef...` | GitHub Personal Access Token to prevent public API rate-limiting during builds. |

### How to Deploy on Vercel
1. Push your repository to GitHub.
2. In [Vercel](https://vercel.com/new), select **Import Project** and choose your repository.
3. Keep the default build settings (Framework Preset: **Next.js**, Build Command: `npm run build`).
4. Under **Environment Variables**, paste the keys listed above.
5. Click **Deploy**.

---

## 3. Adding Your Content Guide

All personal content is decoupled from components inside [`/data`](./data):

- **Profile Photo:** Save your image to `public/images/profile.jpg`. If omitted, automatically displays a sleek "SM" monogram avatar.
- **Resume:** Place your PDF at `public/resume.pdf`.
- **Projects:** Edit `data/projects.ts`. You can copy the template at the bottom of the file to add new entries.
- **Skills:** Edit `data/skills.ts` to add or modify technical groups.
- **Journey / Education:** Edit `data/education.ts` to add new degrees, internships, or certifications.
- **Currently Exploring:** Edit `data/exploring.ts` for current learning tracks.
