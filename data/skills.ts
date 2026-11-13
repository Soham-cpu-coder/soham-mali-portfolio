export interface SkillItem {
  name: string;
  level?: "Beginner" | "Intermediate" | "Advanced" | "Proficient";
}

export interface SkillGroup {
  category: "Frontend" | "Backend" | "Databases" | "Languages" | "AI/ML" | "Tools";
  description: string;
  skills: SkillItem[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: "Languages",
    description: "Core languages used for systems, scripting, and web backends.",
    skills: [
      { name: "TypeScript", level: "Proficient" },
      { name: "JavaScript", level: "Proficient" },
      { name: "Python", level: "Proficient" },
      { name: "C++", level: "Intermediate" },
    ],
  },
  {
    category: "Frontend",
    description: "Modern, responsive, accessible web interfaces and design systems.",
    skills: [
      { name: "Next.js", level: "Proficient" },
      { name: "React", level: "Proficient" },
      { name: "Tailwind", level: "Proficient" },
    ],
  },
  {
    category: "Backend",
    description: "REST APIs, server-side architecture, and microservices.",
    skills: [
      { name: "Next.js", level: "Proficient" },
      { name: "Python", level: "Proficient" },
    ],
  },
  {
    category: "Databases",
    description: "Relational and document storage, indexing, and schemas.",
    skills: [
      { name: "MySQL", level: "Proficient" },
      { name: "MongoDB", level: "Intermediate" },
    ],
  },
  {
    category: "AI/ML",
    description: "Machine learning workflows, recommendation systems, and data pipelines.",
    skills: [
      { name: "Scikit-learn", level: "Intermediate" },
      { name: "Pandas", level: "Proficient" },
      { name: "NumPy", level: "Proficient" },
    ],
  },
  {
    category: "Tools",
    description: "Developer tooling, containerization, and modern deployment platforms.",
    skills: [
      { name: "Git/GitHub", level: "Proficient" },
      { name: "Docker", level: "Intermediate" },
      { name: "Vercel", level: "Proficient" },
    ],
  },
];
