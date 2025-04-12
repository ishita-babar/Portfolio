"use client";
import { useEffect, useState, useRef, useMemo } from "react";
import CursorSpotlight from "@/components/Cursor";
import Navbar from "@/components/Navbar";

type Skill = {
  id: number;
  name: string;
  x: number;
  y: number;
  size: number;
  speed: number;
  direction: number;
  isHovered: boolean;
};

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [hoveredSkillId, setHoveredSkillId] = useState<number | null>(null);
  const animationRef = useRef<number | null>(null);
  const skillsRef = useRef<Skill[]>([]);
  // Add a counter to reduce state updates
  const frameCountRef = useRef(0);

  const skillNames = useMemo(() => [
    "C", "C++", "Python", "Java", "JavaScript",
    "React", "NextJS", "TypeScript", "Redux", "Axios", 
    "TailwindCSS", "SASS", "HTML", "CSS",
    "NodeJS", "ExpressJS", "MongoDB", "Mongoose", 
    "Prisma", "PostgreSQL", "Deep Learning", "Machine Learning"
  ], []);

  const getSkillSize = (name: string) => {
    const baseSize = 90;
    const longestWord = name.split(' ').reduce((max, word) => 
      word.length > max.length ? word : max, '');
    
    const sizePerChar = 8;
    const calculatedSize = Math.max(
      baseSize, 
      baseSize + (longestWord.length * sizePerChar)
    );
  
    const wordCount = name.split(' ').length;
    const multiWordBonus = wordCount > 1 ? (wordCount * 15) : 0;
  
    return calculatedSize + multiWordBonus + (Math.random() * 10);
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const updateDimensions = () => {
      if (!containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    };

    updateDimensions();

    const generateSkills = () => {
      const { width, height } = dimensions;
      if (width === 0 || height === 0) return;

      const newSkills = skillNames.map((name, index) => {
        const size = getSkillSize(name);
        return {
          id: index,
          name,
          x: Math.random() * (width - size),
          y: Math.random() * (height - size),
          size,
          // Reduce the base speed by half to make movements more gentle
          speed: (Math.random() * 0.25 + 0.25), 
          direction: Math.random() * Math.PI * 2, 
          isHovered: false
        };
      });

      setSkills(newSkills);
      skillsRef.current = newSkills;
    };

    window.addEventListener('resize', updateDimensions);
    generateSkills();

    return () => {
      window.removeEventListener('resize', updateDimensions);
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions.width, dimensions.height, skillNames, dimensions]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
    
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    skillsRef.current = skills;
  }, [skills]);

  useEffect(() => {
    if (!hoveredSkillId && hoveredSkillId !== 0) {
      setSkills(prevSkills => 
        prevSkills.map(skill => ({ ...skill, isHovered: false }))
      );
    } else {
      setSkills(prevSkills => 
        prevSkills.map(skill => 
          skill.id === hoveredSkillId ? { ...skill, isHovered: true } : { ...skill, isHovered: false }
        )
      );
    }
  }, [hoveredSkillId]);

  useEffect(() => {
    if (skillsRef.current.length === 0 || !containerRef.current) return;

    const animate = () => {
      // Only update state every 3 frames to reduce jitter
      frameCountRef.current = (frameCountRef.current + 1) % 3;
      
      const currentSkills = skillsRef.current;
      const hoveredSkill = hoveredSkillId !== null 
        ? currentSkills.find(s => s.id === hoveredSkillId)
        : null;

      const updatedSkills = currentSkills.map(skill => {
        let { x, y, direction } = skill;
        const { speed, size, isHovered } = skill;
        const { width, height } = dimensions;
        
        // Make hovering slow things down more dramatically
        const effectiveSpeed = isHovered ? speed * 0.2 : speed;

        // Apply smaller movements for smooth animation
        x += Math.cos(direction) * effectiveSpeed;
        y += Math.sin(direction) * effectiveSpeed;

        // Handle boundaries more gently
        if (x <= 0 || x >= width - size) {
          // Add a small random variation to direction change
          direction = Math.PI - direction + (Math.random() * 0.2 - 0.1);
          x = x <= 0 ? 0 : width - size;
        }
        if (y <= 0 || y >= height - size) {
          direction = -direction + (Math.random() * 0.2 - 0.1);
          y = y <= 0 ? 0 : height - size;
        }

        // Mouse repulsion with gentler force
        const dx = x + (size / 2) - mousePosition.x;
        const dy = y + (size / 2) - mousePosition.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          // Reduce repel strength from 3 to 1
          const repelStrength = 1 * (1 - distance / 150);
          const angle = Math.atan2(dy, dx);
          x += Math.cos(angle) * repelStrength;
          y += Math.sin(angle) * repelStrength;
        }

        // Adjust interaction with hovered skill
        if (hoveredSkill && skill.id !== hoveredSkill.id) {
          const dxHover = x + (size / 2) - (hoveredSkill.x + (hoveredSkill.size / 2));
          const dyHover = y + (size / 2) - (hoveredSkill.y + (hoveredSkill.size / 2));
          const distanceFromHover = Math.sqrt(dxHover * dxHover + dyHover * dyHover);

          if (distanceFromHover < 250) {
            // Reduce hover repel strength from 4 to 1.5
            const hoverRepelStrength = 1.5 * (1 - distanceFromHover / 250);
            const hoverAngle = Math.atan2(dyHover, dxHover);
            const isAboveHovered = y < hoveredSkill.y;
            // Reduce vertical multiplier from 1.5 to 1.2
            const verticalMultiplier = isAboveHovered ? 1.2 : 1;

            x += Math.cos(hoverAngle) * hoverRepelStrength * verticalMultiplier;
            y += Math.sin(hoverAngle) * hoverRepelStrength * verticalMultiplier;
          }
        }

        return { ...skill, x, y, direction };
      });

      skillsRef.current = updatedSkills;

      // Only update React state every few frames to prevent excessive re-renders
      if (frameCountRef.current === 0) {
        setSkills([...updatedSkills]);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions, mousePosition, hoveredSkillId]);

  const handleMouseEnter = (id: number) => {
    setHoveredSkillId(id);
  };

  const handleMouseLeave = () => {
    setHoveredSkillId(null);
  };

  return (
    <>
      <CursorSpotlight />
      <div
        ref={containerRef}
        className="relative h-screen w-full text-black font-vietnam bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: "url('https://i.ibb.co/dwL20gp5/Landing-page-bg-1.png')" }}
      >
        <Navbar />
        <div className="absolute top-10 left-10 z-10">
          <div className="text-4xl font-semibold mb-2 mt-6">Skills</div>
          <hr className="border-black w-full" />
        </div>

        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
          <a 
            href="https://drive.google.com/file/d/120-TF5szQXqN2068LKnKyq9QTS6edDbL/view?usp=sharing" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="px-10 py-3 bg-[#1D1D1D] text-[#FAF9F6] rounded-md font-medium text-xl hover:bg-opacity-100 transition-all shadow-lg flex items-center justify-center"
          >
            Resume
          </a>
        </div>

        {skills.map((skill) => (
          <div
            key={skill.id}
            className={`absolute flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm shadow-lg cursor-pointer transition-transform p-2 ${skill.isHovered ? 'z-10 scale-125 bg-white shadow-xl' : 'hover:scale-110'}`}
            style={{
              left: `${skill.x}px`,
              top: `${skill.y}px`,
              width: `${skill.size}px`,
              height: `${skill.size}px`,
              fontSize: `${Math.min(16, skill.size * 0.16)}px`,
              fontWeight: "600",
              textAlign: "center",
              overflow: "hidden",
              // Add more damping to transitions
              transition: "transform 0.3s ease-out, background-color 0.3s ease-out, z-index 0s, left 0.5s ease-out, top 0.5s ease-out"
            }}
            onMouseEnter={() => handleMouseEnter(skill.id)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="whitespace-pre-line">
              {skill.name.split(' ').join('\n')}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}