"use client";
import { useEffect, useState, useRef } from "react";
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

  const skillNames = [
    "C", "C++", "Python", "Java", "JavaScript",
    "React", "NextJS", "TypeScript", "Redux", "Axios", 
    "TailwindCSS", "SASS", "HTML", "CSS",
    "NodeJS", "ExpressJS", "MongoDB", "Mongoose", 
    "Prisma", "PostgreSQL", "Deep Learning", "Machine Learning"
  ];

  // Calculate appropriate size based on text length
  const getSkillSize = (name: string) => {
    // Base size for short names
    const baseSize = 90;
    // Additional pixels per character for the longest word
    const longestWord = name.split(' ').reduce((max, word) => 
      word.length > max.length ? word : max, '');
    
    const sizePerChar = 8;
    // Calculate based on text length with a minimum size
    const calculatedSize = Math.max(
      baseSize, 
      baseSize + (longestWord.length * sizePerChar)
    );
    
    // Add more space for multi-word skills
    const wordCount = name.split(' ').length;
    const multiWordBonus = wordCount > 1 ? (wordCount * 15) : 0;
    
    // Add some randomness but keep within reasonable bounds
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
          speed: Math.random() * 0.5 + 0.5, // Slightly increased base speed
          direction: Math.random() * Math.PI * 2, // Random direction in radians
          isHovered: false
        };
      });
      
      setSkills(newSkills);
    };

    window.addEventListener('resize', updateDimensions);
    generateSkills();

    return () => {
      window.removeEventListener('resize', updateDimensions);
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions.width, dimensions.height]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (skills.length === 0 || !containerRef.current) return;
    
    const animate = () => {
      setSkills(prevSkills => {
        // Find hovered skill
        const hoveredSkill = hoveredSkillId !== null 
          ? prevSkills.find(s => s.id === hoveredSkillId)
          : null;
          
        return prevSkills.map(skill => {
          let { x, y, direction, speed, size, isHovered } = skill;
          const { width, height } = dimensions;
          
          // Apply speed boost to animation
          const effectiveSpeed = isHovered ? speed * 0.5 : speed * 1.2;
          
          // Natural floating movement
          x += Math.cos(direction) * effectiveSpeed;
          y += Math.sin(direction) * effectiveSpeed;
          
          // Boundary check with adjusted size
          if (x <= 0 || x >= width - size) {
            direction = Math.PI - direction;
            x = x <= 0 ? 0 : width - size;
          }
          if (y <= 0 || y >= height - size) {
            direction = -direction;
            y = y <= 0 ? 0 : height - size;
          }
          
          // Cursor interaction - repel when cursor is close
          const dx = x + (size / 2) - mousePosition.x;
          const dy = y + (size / 2) - mousePosition.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            // Repel strength inversely proportional to distance
            const repelStrength = 3 * (1 - distance / 150);
            const angle = Math.atan2(dy, dx);
            x += Math.cos(angle) * repelStrength;
            y += Math.sin(angle) * repelStrength;
          }
          
          // If there's a hovered bubble, make other bubbles move away from it
          if (hoveredSkill && skill.id !== hoveredSkill.id) {
            const dxHover = x + (size / 2) - (hoveredSkill.x + (hoveredSkill.size / 2));
            const dyHover = y + (size / 2) - (hoveredSkill.y + (hoveredSkill.size / 2));
            const distanceFromHover = Math.sqrt(dxHover * dxHover + dyHover * dyHover);
            
            // Higher repel radius when hovered (250px)
            if (distanceFromHover < 250) {
              // Stronger repel effect
              const hoverRepelStrength = 4 * (1 - distanceFromHover / 250);
              const hoverAngle = Math.atan2(dyHover, dxHover);
              
              // Apply stronger repel for bubbles above the hovered one
              const isAboveHovered = y < hoveredSkill.y;
              const verticalMultiplier = isAboveHovered ? 1.5 : 1;
              
              x += Math.cos(hoverAngle) * hoverRepelStrength * verticalMultiplier;
              y += Math.sin(hoverAngle) * hoverRepelStrength * verticalMultiplier;
            }
          }
          
          return { ...skill, x, y, direction };
        });
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [skills.length, mousePosition, dimensions, hoveredSkillId]);

  const handleMouseEnter = (id: number) => {
    setHoveredSkillId(id);
    setSkills(prevSkills => 
      prevSkills.map(skill => 
        skill.id === id ? { ...skill, isHovered: true } : skill
      )
    );
  };

  const handleMouseLeave = () => {
    setHoveredSkillId(null);
    setSkills(prevSkills => 
      prevSkills.map(skill => ({ ...skill, isHovered: false }))
    );
  };

  return (
    <>
      <CursorSpotlight />
      <div
        ref={containerRef}
        className="relative h-screen w-full  text-black font-vietnam bg-cover bg-center overflow-hidden"
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
              transition: "transform 0.3s, background-color 0.3s, z-index 0s"
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