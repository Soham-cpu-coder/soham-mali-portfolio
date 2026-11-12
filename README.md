# Soham Mali — Personal Portfolio & Interactive CLI

A high-performance, dark-themed personal portfolio engineered with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Motion**. Designed specifically for recruiters and engineering hiring managers to understand technical capabilities within 30 seconds.

---

## ⚡ Current Configuration Status

- **GitHub Profile**: Connected to [`Soham-cpu-coder`](https://github.com/Soham-cpu-coder) (REST API auto-sync enabled).
- **Education**: **B.Tech in Computer Engineering** at **Pillai College of Engineering (Pillai University)**, Panvel (2023 – 2027, CGPI: 6.25).
- **Resume**: Loaded from uploaded PDF at `public/resume.pdf` (Navbar, Hero, and CLI commands now link directly to it).
- **Certifications**: Google Cloud Career Launchpad & Google DeepMind AI Research Program.
- **Projects**: Seeded with your verified projects (*Book Recommendation System*, *The Ultimate Sport Store*, *Hotel Management System*, *AI Sentiment Agent*, *Portfolio*).

---

## 📸 How to Upload Your Profile Photo Afterwards

1. Drop your image file (e.g., `avatar.jpg`, `avatar.png`) into:
   ```
   public/images/avatar.jpg
   ```
2. Open [`data/profile.ts`](data/profile.ts):
   ```typescript
   avatar: {
     placeholderText: "SM",
     imagePath: "/images/avatar.jpg", // Set path here
   },
   ```
3. Save the file. The About section will instantly display your photograph instead of the monogram placeholder.

---

## 🔗 How to Add GitHub Links & Demos to Projects Afterwards

Open [`data/projects.ts`](data/projects.ts). Each project contains dedicated `github` and `demo` fields:

```typescript
{
  slug: "book-recommendation-system",
  title: "Book Recommendation System",
  // ...
  // When you push the repository to GitHub, simply paste the link:
  github: "https://github.com/Soham-cpu-coder/book-recommendation",
  // When you have a deployed demo, paste the live URL:
  demo: "https://your-demo-url.vercel.app",
}
```

> **Strict Rule Enforced**: If `github` or `demo` is left empty (`""`), the corresponding button is **automatically hidden** on the project card, modal preview, and project detail page. There are never any broken links or 404 errors.

---

## 🚀 Quickstart & Local Setup

### 1. Install Dependencies

```bash
# Navigate to the project directory
cd soham-mali-portfolio

# Install dependencies
npm install
```

### 2. Configure Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
# Resend API Key (Sign up at https://resend.com for a free key)
RESEND_API_KEY=re_your_api_key_here

# Verified sender address
RESEND_FROM_EMAIL="Portfolio Contact <onboarding@resend.dev>"

# Optional: GitHub token to increase API rate limit
GITHUB_TOKEN=
```

> **Note**: If `RESEND_API_KEY` is not provided, the contact form will automatically display a 1-click `mailto` fallback without failing.

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production

```bash
npm run build
npm run start
```

---

## 🚢 Deploy to Vercel (1-Click)

1. Push your portfolio code to your GitHub account:
   ```bash
   git init
   git add .
   git commit -m "feat: complete Soham Mali personal portfolio"
   git branch -M main
   git remote add origin https://github.com/Soham-cpu-coder/soham-portfolio.git
   git push -u origin main
   ```
2. Visit [Vercel](https://vercel.com/) and click **Add New Project**.
3. Import the `soham-portfolio` repository.
4. Add your `RESEND_API_KEY` in Environment Variables (optional, for email delivery).
5. Click **Deploy**. Vercel will build and launch your live site with an SSL certificate.
