export type Project = {
    id: number;
    name: string;
    image: string;
    description: string;
    link: string;
    site: string;
    techStack: string[];
  };
  
  export const Project: Project[] = [
    {
      id: 1,
      name: "ForkThis",
      image: "https://i.ibb.co/jkKhmRzM/ForkThis.png",
      description: "An open-source hackathon platform where 250+ participants fixed curated bugs to contribute meaningfully.",
      link: "https://github.com/ishita-babar/forkthis24-frontend",
      site: "https://forkthis.csivit.com/",
      techStack: ["Next.js ", "Tailwind CSS", "Typescript"],
    },
    {
      id: 2,
      name: "CCS-2025",
      image: "https://i.ibb.co/1tr9yrhD/CCS.png",
      description: "A domain-based recruitment website with quizzes and tasks for junior selections.",
      link: "https://github.com/ishita-babar/ccs-2025",
      site: "https://interact.csivit.com/",
      techStack: ["Next.js", "Tailwind CSS", "Typescript"],
    },
    {
      id: 3,
      name: "LaserTag",
      image: "https://i.ibb.co/1GvRw07Y/LaserTag.png",
      description: "Event site with mailer integration, slot booking, QR generation, and real-time slot handling.",
      link: "https://github.com/ishita-babar/lasertag-frontend-2024",
      site: "https://lasertag.csivit.com/",
      techStack: ["Next.js", "Tailwind CSS", "Typescript"],
    },
    {
      id: 4,
      name: "Admin Inventory Dashboard",
      image: "https://i.ibb.co/nq3vkHk8/Screenshot-2025-07-26-at-11-38-59-AM.png",
      description: "A web app that that helps in forecasting inventory based on trends and sales data.",
      link: "https://github.com/ishita-babar/admin-inventory",
      site: "",
      techStack: ["Spring Boot", "Machine Learning", "Next.js", "Tailwind CSS", "Typescript"],
    },
    {
      id: 5,
      name: "Portfolio",
      image: "https://i.ibb.co/KcjXvR4m/Portfolio.png",
      description: " My personal website that visually extends my resume and showcases my work.",
      link: "https://github.com/ishita-babar/Portfolio",
      site: "",
      techStack: ["Next.js", "Tailwind CSS", "Typescript"],
    },
    {
      id: 6,
      name: "Horizon",
      image: "https://i.ibb.co/RGbfwtCr/Taskflow.png",
      description: "A one-stop productivity platform for tasks, budgeting, journaling, notes, and habit tracking.",
      link: "https://github.com/ishita-babar/horizon",
      site: "https://ishita-babar.github.io/horizon/",
      techStack: ["Reactjs", "CSS", "Javacript"],
    },
  ];
  