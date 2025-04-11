export type Project = {
    id: number;
    name: string;
    image: string;
    description: string;
    link: string;
    site: string;
  };
  
  export const dummyProjects: Project[] = [
    {
      id: 1,
      name: "ForkThis",
      image: "/ForkThis.png",
      description: "Engineered an interactive website to facilitate a seamless experience for participants in a Git and GitHub learning competition. Oversaw a website that served as the central hub for more than 100 participants during a 3-day event. Established a dynamic leaderboard to track and display participants’ progress and achievements",
      link: "https://github.com/ishita-babar/forkthis24-frontend",
      site: "https://forkthis.csivit.com/",
    },
    {
      id: 2,
      name: "CCS-2025",
      image: "/CCS.png",
      description: "An AI-powered blog writing tool using GPT.",
      link: "https://github.com/ishita-babar/ccs-2025",
      site: "https://interact.csivit.com/",
    },
    {
      id: 3,
      name: "LaserTag",
      image: "/LaserTag.png",
      description: "An AI-powered blog writing tool using GPT.",
      link: "https://github.com/ishita-babar/lasertag-frontend-2024",
      site: "https://lasertag.csivit.com/",
    },
    {
      id: 4,
      name: "DeepFake Detection",
      image: "/Deepfake.png",
      description: "An AI-powered blog writing tool using GPT.",
      link: "https://github.com/ishita-babar/deepfake-detection",
      site: "",
    },
    {
      id: 5,
      name: "Portfolio",
      image: "/Deepfake.png",
      description: "An AI-powered blog writing tool using GPT.",
      link: "https://github.com/ishita-babar/deepfake-detection",
      site: "",
    },

  ];
  