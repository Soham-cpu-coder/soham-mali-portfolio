export type ProjectCategory = "Web" | "AI-ML" | "Systems";

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  shortDescription: string;
  longDescription?: string;
  stack: string[];
  features?: string[];
  image?: string;          // e.g. "/images/projects/book-recommender.png"
  githubUrl?: string;
  liveUrl?: string;
  demoVideoUrl?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: "book-recommendation-system",
    title: "Book Recommendation System",
    category: "AI-ML",
    shortDescription:
      "Collaborative and content-based recommendation engine delivering personalized reading suggestions.",
    longDescription:
      "Built with Python, Scikit-learn, Pandas, and NumPy. Utilizes collaborative filtering and cosine similarity metrics to analyze reader preferences and item metadata, providing accurate recommendations with low latency.",
    stack: ["Python", "Scikit-learn", "Pandas", "NumPy"],
    features: [
      "Collaborative filtering matrix factorization",
      "Content-based similarity analysis with TF-IDF / Cosine Similarity",
      "Interactive command-line and web evaluation interface",
    ],
    image: undefined, // TODO: add "/images/projects/book-recommender.png"
    githubUrl: undefined, // TODO: add "https://github.com/Soham-cpu-coder/book-recommendation-system"
    liveUrl: undefined, // TODO: add live deployment URL
    demoVideoUrl: undefined, // TODO: add demo video URL
    featured: true,
  },
  {
    id: "the-ultimate-sport-store",
    title: "The Ultimate Sport Store",
    category: "Web",
    shortDescription:
      "E-commerce platform for sporting gear featuring product catalogs, cart management, and seamless checkout.",
    longDescription:
      "A full-stack sports apparel and equipment store built with a focus on performant navigation, responsive catalog browsing, inventory tracking, and persistent state management.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind", "MySQL"],
    features: [
      "Dynamic catalog browsing and category filtering",
      "Shopping cart state persistence and order summary",
      "Relational product schema and inventory management with MySQL",
    ],
    image: undefined, // TODO: add "/images/projects/sport-store.png"
    githubUrl: undefined, // TODO: add "https://github.com/Soham-cpu-coder/the-ultimate-sport-store"
    liveUrl: undefined, // TODO: add live deployment URL
    demoVideoUrl: undefined, // TODO: add demo video URL
    featured: true,
  },
  {
    id: "hotel-management-system",
    title: "Hotel Management System",
    category: "Systems",
    shortDescription:
      "Desk management and room allocation system for hotel operations, booking records, and billing.",
    longDescription:
      "A desktop and backend administrative system handling room bookings, guest records, room status allocation, and invoice generation with transactional integrity.",
    stack: ["C++", "MySQL", "Python"],
    features: [
      "Room allocation tracking and vacancy management",
      "Guest reservation lifecycle and check-in/checkout handling",
      "Automated bill calculation and transaction record persistence in MySQL",
    ],
    image: undefined, // TODO: add "/images/projects/hotel-management.png"
    githubUrl: undefined, // TODO: add "https://github.com/Soham-cpu-coder/hotel-management-system"
    liveUrl: undefined, // TODO: add live deployment URL
    demoVideoUrl: undefined, // TODO: add demo video URL
    featured: false,
  },
];

/*
// ============================================================================
// TEMPLATE FOR ADDING NEW PROJECTS
// Copy this block, uncomment it, fill in your details, and append to the array:
// ============================================================================
{
  id: "project-slug",
  title: "Project Title",
  category: "Web", // "Web" | "AI-ML" | "Systems"
  shortDescription: "One sentence overview of what the project does.",
  longDescription: "Detailed description explaining architecture, technical challenges, and results.",
  stack: ["Next.js", "TypeScript", "Tailwind"],
  features: [
    "Key capability or architectural accomplishment",
    "Performance optimization or algorithm used",
  ],
  image: "/images/projects/your-screenshot.png", // or undefined
  githubUrl: "https://github.com/Soham-cpu-coder/your-repo", // or undefined
  liveUrl: "https://your-project.vercel.app", // or undefined
  demoVideoUrl: "https://youtube.com/watch?v=...", // or undefined
  featured: false,
},
*/
