export interface Profile {
  name: string;
  role: string;
  tagline: string;
  location: string;
  email: string;
  whatsapp: {
    display: string;
    number: string;
    defaultMessage: string;
  };
  socials: {
    linkedin: string;
    github: string;
  };
  githubUsername: string;
  photo: string;
  resumePath: string;
  stack: readonly string[];
}

export const profile = {
  name: "Soham Mali",
  role: "Full Stack Developer",
  tagline: "I build fast, intelligent web products.",
  location: "India",
  email: "sohammali68@gmail.com",
  whatsapp: {
    display: "+91 9820272618",
    number: "919820272618",
    defaultMessage: "Hi Soham, I came across your portfolio and would like to connect.",
  },
  socials: {
    linkedin: "https://www.linkedin.com/in/soham-mali-745a8740b/",
    github: "https://github.com/Soham-cpu-coder",
  },
  githubUsername: "Soham-cpu-coder",
  photo: "/images/profile.jpg", // I will upload later
  resumePath: "/resume.pdf", // I will place my resume here
  stack: ["Next.js", "React", "TypeScript", "Python", "C++", "MySQL", "AI/ML"],
} as const;
