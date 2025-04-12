// src/data/experience.ts

export type Experience = {
    id: string;
    company: string;
    position: string;
    duration: string;
    website: string;
    technologies: string[];
    description: string;
  };
  
  export const experiences: Experience[] = [
    {
      id: "interact-now",
      company: "Interact Now",
      position: "Frontend Developer Intern",
      duration: "June 2024 - Dec 2024",
      website: "https://interactnow.in/",
      technologies: ["Next.Js", "Typescript", "Tailwind CSS", "Websocket"],
      description: "• Designed & Built Resource handling for organizations coordinated with backend developers for integration process\n• Upgraded the reviews section in terms of user experience & frontend design\n• Implemented several UI/UX fixes in numerous sections in the project"
    },
    {
      id: "bhai",
      company: "BHAI",
      position: "Software Developer Intern",
      duration: "June 2024 - August 2024",
      website: "https://www.bhai.tech/",
      technologies: ["Machine Learning", "Deep Learning"],
      description: "• Developed an AI-powered application that enables students to upload study materials and receive personalized audio summaries\n• Integrated an interactive feature where students can practice answering questions, with AI providing feedback on missing points"
    },
    {
      id: "cherry-media",
      company: "Cherry Media",
      position: "Content Writer",
      duration: "June 2023 - July 2023",
      website: "https://www.thecherrymedia.com/",
      technologies: ["Copy Writing", "Ghost Writing", "Content Writing"],
      description: "• Created compelling LinkedIn posts as a ghostwriter, significantly improving client analytics, increasing reach, and ensuring high-quality engagement\n• Managed Twitter and YouTube accounts, developing content strategies that enhanced audience interaction and visibility"
    }
  ];
  
  export const introText = `Hello! I'm Ishita Babar, a 2nd-year B.Tech student at Vellore Institute of Technology, Vellore, specializing in Computer Science with a focus on AI/ML. I'm a full-stack web developer with hands-on experience in machine learning and deep learning. I love building meaningful digital solutions—whether it's an elegant web app or an intelligent AI system, I’m passionate about writing code that creates real impact.`;