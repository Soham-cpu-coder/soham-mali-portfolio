export interface JourneyEntry {
  id: string;
  title: string;
  institution: string;
  location?: string;
  period: string;
  type: "education" | "internship" | "certification" | "workshop";
  description: string;
  highlights?: string[];
  link?: string;
}

export const journeyData: JourneyEntry[] = [
  {
    id: "degree-ce",
    title: "B.Tech in Computer Engineering",
    institution: "Pillai College of Engineering (Pillai University)",
    location: "Panvel, Maharashtra, India",
    period: "2023 – 2027",
    type: "education",
    description:
      "Pursuing Bachelor of Technology in Computer Engineering (Current CGPI: 6.25) with rigorous coursework in Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, Operating Systems, and Software Engineering.",
    highlights: [
      "Core programming in C++, Java, and Python with focus on algorithm efficiency and OOP modularity",
      "Hands-on database modeling, schema normalization, and full-stack software development",
      "Expected Graduation: 2027",
    ],
  },
  {
    id: "cert-gcloud",
    title: "Google Cloud Career Launchpad Program",
    institution: "Google Cloud",
    location: "Online",
    period: "2026",
    type: "certification",
    description:
      "Completed curriculum covering foundational cloud architecture, compute resources, storage solutions, and deployment workflows on Google Cloud Platform.",
    highlights: [
      "Explored core GCP services, infrastructure management, and cloud security basics",
    ],
  },
  {
    id: "cert-deepmind",
    title: "Google DeepMind AI Research Program",
    institution: "Google DeepMind",
    location: "Online",
    period: "2026",
    type: "certification",
    description:
      "Program covering machine learning paradigms, modern neural architectures, and responsible AI engineering fundamentals.",
    highlights: [
      "Deep dive into machine learning workflows, model evaluation metrics, and AI problem formulation",
    ],
  },
  {
    id: "intern-alegria",
    title: "Marketing Team Intern",
    institution: "Alegria – Festival of Joy",
    location: "Navi Mumbai, India",
    period: "2026",
    type: "internship",
    description:
      "Collaborated with a cross-functional marketing team to design and execute promotional campaigns for a large-scale college cultural festival.",
    highlights: [
      "Coordinated with peers to plan outreach strategies, driving increased event visibility and audience engagement",
      "Strengthened interpersonal communication, team collaboration, and campaign scheduling skills",
    ],
  },
];
