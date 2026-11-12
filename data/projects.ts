export type ProjectCategory = "all" | "web" | "ai-ml" | "python" | "other";

export interface Project {
  slug: string;
  title: string;
  summary: string;
  description: string;
  problem: string;
  solution: string;
  features: string[];
  tech: string[];
  category: "web" | "ai-ml" | "python" | "other";
  image: string; // SVG or image file in /public/projects/<slug>/
  screenshots: string[];
  github?: string; // If empty "", button is hidden automatically
  demo?: string; // If empty "", button is hidden automatically
  featured: boolean;
  date: string;
  status: "Completed" | "In Progress" | "Prototype";
}

export const projectsData: Project[] = [
  {
    slug: "book-recommendation-system",
    title: "Book Recommendation System",
    summary:
      "Recommendation engine that suggests books to users based on ratings and reading history using collaborative filtering algorithms.",
    description:
      "An intelligent recommendation system developed in Python and backed by a MySQL database. It analyzes user rating matrices and historical reading behaviors using collaborative filtering techniques to deliver highly tailored book recommendations.",
    problem:
      "Readers encounter information overload when navigating large book catalogs, making discovery of titles matching their specific taste profiles inefficient without personalization.",
    solution:
      "Implemented a collaborative filtering algorithm that computes user-item similarity matrices combined with a structured MySQL database storing user ratings, genre preferences, and book metadata for fast querying.",
    features: [
      "Collaborative filtering algorithm for personalized preference matching",
      "User rating history matrix calculation and similarity scoring",
      "Normalized MySQL database schema storing user profiles and catalog metadata",
      "Interactive command-line and programmatic recommendation interfaces",
    ],
    tech: ["Python", "MySQL", "Collaborative Filtering", "Pandas"],
    category: "ai-ml",
    image: "/projects/book-recommendation-system/cover.svg",
    screenshots: [],
    // TODO: Paste your GitHub repository URL here when ready (e.g. "https://github.com/Soham-cpu-coder/book-recommendation")
    github: "",
    // TODO: Paste your live demo URL here when ready
    demo: "",
    featured: true,
    date: "2024",
    status: "Completed",
  },
  {
    slug: "the-ultimate-sport-store",
    title: "The Ultimate Sport Store",
    summary:
      "Full-featured e-commerce web application for browsing and purchasing sports equipment with a MySQL-backed database.",
    description:
      "A complete e-commerce web application built with HTML, CSS, JavaScript, and a MySQL database. It delivers an intuitive digital shopping experience including dynamic product catalog filtering, cart calculations, and checkout order capture.",
    problem:
      "Local sporting equipment sales often lack an accessible digital catalog for real-time stock browsing, cart state calculation, and centralized order record management.",
    solution:
      "Built a responsive client-side interface paired with a relational MySQL backend, implementing stateful cart management, price totals, and transaction records.",
    features: [
      "Structured product catalog organized by sports category",
      "Dynamic shopping cart with real-time subtotal and tax calculation",
      "Streamlined checkout flow for order placement",
      "Relational MySQL database schema handling inventory and order persistence",
    ],
    tech: ["HTML", "CSS", "JavaScript", "MySQL"],
    category: "web",
    image: "/projects/the-ultimate-sport-store/cover.svg",
    screenshots: [],
    // TODO: Paste your GitHub repository URL here when ready (e.g. "https://github.com/Soham-cpu-coder/sport-store")
    github: "",
    // TODO: Paste your live demo URL here when ready
    demo: "",
    featured: true,
    date: "2024",
    status: "Completed",
  },
  {
    slug: "hotel-management-system",
    title: "Hotel Management System",
    summary:
      "Desktop application to manage room bookings, guest records, and billing for a hotel using object-oriented principles and MySQL.",
    description:
      "A desktop software application engineered in Java using Object-Oriented Programming (OOP) paradigms and connected to a MySQL relational database. It streamlines hospitality operations by managing room allocations, guest registrations, and itemized billing.",
    problem:
      "Manual hospitality desk tracking leads to room double-booking risks, delayed check-out bill calculations, and disorganized guest records.",
    solution:
      "Applied object-oriented design patterns to architect decoupled modules for room inventory, reservation lifecycles, guest records, and automated invoicing with atomic MySQL updates.",
    features: [
      "Room booking and vacancy management with category-based tariffs",
      "Guest profile record tracking and check-in / check-out timestamps",
      "Automated bill generation with room stay and incidental charge itemization",
      "Object-oriented architecture with clean separation of model, view, and data access layers",
    ],
    tech: ["Java", "MySQL", "OOP"],
    category: "other",
    image: "/projects/hotel-management-system/cover.svg",
    screenshots: [],
    // TODO: Paste your GitHub repository URL here when ready (e.g. "https://github.com/Soham-cpu-coder/hotel-management")
    github: "",
    // TODO: Paste your live demo URL here when ready
    demo: "",
    featured: true,
    date: "2024",
    status: "Completed",
  },
  {
    slug: "ai-sentiment-analysis-agent",
    title: "AI-Powered Sentiment Analysis Agent",
    summary:
      "Intelligent text classification pipeline that ingests textual data, evaluates sentiment polarity, and extracts linguistic insights.",
    description:
      "A natural language processing system developed in Python to process, tokenize, and classify text sentiment. Built with custom feature extraction and scikit-learn classification models, this project demonstrates end-to-end NLP data preprocessing and inference.",
    problem:
      "Manually processing high-volume textual data like reviews, customer feedback, or social commentary is time-consuming and inconsistent without automated linguistic analysis.",
    solution:
      "Engineered a modular Python pipeline utilizing NLP techniques for text cleaning, stop-word removal, TF-IDF vectorization, and polarity scoring to deliver rapid, accurate sentiment classification.",
    features: [
      "Custom text preprocessing: tokenization, punctuation removal, and lowercasing",
      "Feature engineering with TF-IDF vectorizers for statistical language modeling",
      "Classification pipeline outputting positive, neutral, and negative sentiment distribution",
      "Modular Python codebase adaptable for varied textual input sources",
    ],
    tech: ["Python", "NLP", "Scikit-learn", "NumPy"],
    category: "ai-ml",
    image: "/projects/ai-sentiment-analysis-agent/cover.svg",
    screenshots: [],
    // TODO: Paste your GitHub repository URL here when ready
    github: "",
    // TODO: Paste your live demo URL here when ready
    demo: "",
    featured: false,
    date: "2024",
    status: "Completed",
  },
  {
    slug: "developer-portfolio",
    title: "Developer Portfolio & Interactive Terminal",
    summary:
      "High-performance personal portfolio built with Next.js 15, TypeScript, Tailwind CSS, and an interactive in-browser terminal.",
    description:
      "A custom-engineered portfolio crafted to present engineering capabilities to recruiters within 30 seconds. Features a dark futuristic aesthetic, in-browser command execution, server-side GitHub data fetching, and strict WCAG AA contrast.",
    problem:
      "Standard developer portfolios rely on predictable templates that fail to engage recruiters quickly or showcase technical depth across both web and systems thinking.",
    solution:
      "Built a tailored Next.js 15 App Router experience with an interactive terminal, single-source-of-truth data configuration, Zod-validated server actions, and responsive layout primitives.",
    features: [
      "Interactive CLI terminal supporting commands: help, about, skills, projects, contact, resume",
      "Single-source-of-truth TypeScript data architecture for zero-friction project updates",
      "Server-side GitHub API integration with fallback states and caching",
      "Accessible design with full prefers-reduced-motion support and keyboard navigation",
    ],
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Motion"],
    category: "web",
    image: "/projects/developer-portfolio/cover.svg",
    screenshots: [],
    // TODO: Paste your GitHub repository URL here when ready
    github: "",
    // TODO: Paste your live demo URL here when ready
    demo: "",
    featured: false,
    date: "2024",
    status: "Completed",
  },
];
