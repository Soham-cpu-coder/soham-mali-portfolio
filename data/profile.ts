export interface Profile {
  name: string;
  role: string;
  rotatingRoles: string[];
  tagline: string;
  location: string;
  email: string;
  linkedin: string;
  whatsapp: {
    number: string; // Set to empty string "" to hide WhatsApp completely
    enabled: boolean;
    prefilledMessage: string;
  };
  github: {
    username: string;
    url: string;
  };
  resume: {
    url: string;
    isAvailable: boolean;
  };
  openToInternships: boolean;
  avatar: {
    placeholderText: string;
    imagePath?: string; // Drop your photo at public/images/avatar.jpg to show it automatically
  };
  about: {
    shortBio: string;
    currentFocus: string;
    goals: string;
  };
  skills: {
    category: string;
    description: string;
    items: string[];
  }[];
  currentlyExploring: {
    title: string;
    description: string;
    tags: string[];
  }[];
}

export const profile: Profile = {
  name: "Soham Mali",
  role: "Computer Engineering Student & Full Stack Developer",
  rotatingRoles: [
    "Computer Engineering Student",
    "Full Stack Developer",
    "Software Engineering Intern Aspirant",
    "AI/ML Enthusiast",
  ],
  tagline:
    "Computer Engineering student with hands-on experience in C++, Java, Python, and modern web development, building scalable software and data-driven systems.",
  location: "Kalyan, Maharashtra, India",
  email: "sohammali68@gmail.com",
  linkedin: "https://www.linkedin.com/in/soham-mali-745a8740b/",
  whatsapp: {
    number: "919820272618",
    enabled: true, // Toggle false to hide WhatsApp floating button and contact card
    prefilledMessage:
      "Hi Soham, I reviewed your portfolio and resume and would like to discuss an internship opportunity.",
  },
  github: {
    username: "Soham-cpu-coder",
    url: "https://github.com/Soham-cpu-coder",
  },
  resume: {
    url: "/resume.pdf",
    isAvailable: true, // Resume uploaded at /public/resume.pdf
  },
  openToInternships: true,
  avatar: {
    placeholderText: "SM",
    // To display your photo: place your photo file at public/images/avatar.jpg and set imagePath to "/images/avatar.jpg"
    imagePath: "",
  },
  about: {
    shortBio:
      "I am a Computer Engineering undergraduate at Pillai College of Engineering (Batch of 2023–2027) based in Kalyan, Maharashtra. I bring hands-on experience in C++, Java, Python, relational database modeling with MySQL, and responsive full-stack web applications.",
    currentFocus:
      "Deepening practical knowledge in Data Structures & Algorithms, modern Next.js/React architecture, distributed database design, and applied machine learning pipelines.",
    goals:
      "Seeking a Software Developer / Software Engineering Intern role to apply analytical problem-solving skills and contribute to collaborative engineering teams building scalable, production-ready software.",
  },
  skills: [
    {
      category: "Programming Languages",
      description: "Core object-oriented and algorithmic development",
      items: ["C++", "Java", "Python", "JavaScript", "TypeScript"],
    },
    {
      category: "Web Technologies",
      description: "Frontend architecture and responsive web engineering",
      items: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind CSS"],
    },
    {
      category: "Backend & Databases",
      description: "Server route handlers, relational persistence, and schema design",
      items: ["MySQL", "Next.js Route Handlers", "REST APIs", "Python"],
    },
    {
      category: "Core Concepts & Tools",
      description: "Foundational engineering principles and collaboration toolchain",
      items: [
        "Data Structures & Algorithms",
        "OOP",
        "Database Design",
        "Git",
        "GitHub",
        "VS Code",
      ],
    },
    {
      category: "AI / ML Foundations",
      description: "Data analysis, collaborative filtering, and text intelligence",
      items: ["NumPy", "Pandas", "Scikit-learn", "NLP", "Collaborative Filtering"],
    },
    {
      category: "Cloud & Research Programs",
      description: "Industry-aligned foundational programs",
      items: [
        "Google Cloud Career Launchpad",
        "Google DeepMind AI Research Program",
        "Docker",
        "Vercel",
      ],
    },
  ],
  currentlyExploring: [
    {
      title: "Full-Stack Architecture & Cloud",
      description:
        "Building resilient serverless backends, end-to-end typed contracts, and zero-bundle-size React Server Components.",
      tags: ["Next.js 15", "TypeScript", "REST APIs", "Google Cloud"],
    },
    {
      title: "Algorithms & Systems Optimization",
      description:
        "Solving complex computational challenges, optimizing time/space complexity, and object-oriented modular design.",
      tags: ["C++", "Java", "DSA", "OOP"],
    },
    {
      title: "Recommendation & Predictive Systems",
      description:
        "Developing collaborative filtering engines, exploratory data analysis, and integrating model inferences with web applications.",
      tags: ["Python", "Collaborative Filtering", "Scikit-learn", "MySQL"],
    },
    {
      title: "Database Modeling & Query Performance",
      description:
        "Deepening understanding of relational schema normalization, transactional integrity, and indexing in MySQL.",
      tags: ["MySQL", "Schema Design", "ACID", "Query Tuning"],
    },
  ],
};
