export type TimelineItemType = "education" | "experience" | "certification";

export interface TimelineItem {
  id: string;
  type: TimelineItemType;
  title: string;
  institution: string;
  location?: string;
  startYear: number | string;
  endYear: number | string | "Present";
  description?: string;
  skills?: string[];
  link?: string;
}

export const timelineData: TimelineItem[] = [
  {
    id: "google-deepmind-ai",
    type: "certification",
    title: "Google DeepMind AI Research Program",
    institution: "Google DeepMind",
    startYear: 2026,
    endYear: 2026,
    description: "Specialized foundational research program focused on artificial intelligence paradigms, machine learning models, and modern neural architectures.",
    skills: ["Artificial Intelligence", "Machine Learning", "Research"],
  },
  {
    id: "google-cloud-launchpad",
    type: "certification",
    title: "Google Cloud Career Launchpad Program",
    institution: "Google Cloud",
    startYear: 2026,
    endYear: 2026,
    description: "Cloud computing fundamentals, infrastructure architecture, managed database workflows, and cloud application deployment patterns.",
    skills: ["Cloud Architecture", "GCP", "Infrastructure"],
  },
  {
    id: "alegria-marketing-intern",
    type: "experience",
    title: "Marketing Team Intern",
    institution: "Alegria - Festival of Joy",
    location: "Navi Mumbai, Maharashtra",
    startYear: 2026,
    endYear: 2026,
    description:
      "Collaborated with a cross-functional marketing team to design and execute promotional campaigns for a large-scale college festival. Coordinated with peers to plan outreach strategies, contributing to increased event visibility and audience engagement.",
    skills: ["Campaign Planning", "Cross-Functional Collaboration", "Outreach"],
  },
  {
    id: "pce-btech",
    type: "education",
    title: "B.Tech in Computer Engineering",
    institution: "Pillai University",
    location: "Panvel, Maharashtra",
    startYear: 2023,
    endYear: 2027,
    description:
      "Undergraduate curriculum in Computer Engineering with academic coursework covering Data Structures & Algorithms, Object-Oriented Programming (C++, Java), Database Management Systems (MySQL), and Operating Systems. CGPI: 6.25.",
    skills: ["Data Structures & Algorithms", "C++", "Java", "Python", "MySQL", "OOP", "Database Design"],
  },
];
