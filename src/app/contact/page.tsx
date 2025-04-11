"use client";
import { useEffect, useRef } from "react";
import CursorSpotlight from "@/components/Cursor";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowUpRight, Mail, Phone, Github, Linkedin } from "lucide-react";

export default function Contacts() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;
    
    const container = containerRef.current;
    const textElement = textRef.current;
    
    if (!container || !textElement) return;

    // Clone the text element to create a seamless loop
    const textClone = textElement.cloneNode(true) as HTMLDivElement;
    container.appendChild(textClone);

    // Calculate animation duration based on text width
    const textWidth = textElement.offsetWidth;
    const animationDuration = textWidth / 50; // Adjust speed here

    // Apply styles for animation
    container.style.cssText = `
      display: flex;
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
    `;

    // Set up animation for both elements
    [textElement, textClone].forEach((el, i) => {
      el.style.cssText = `
        flex-shrink: 0;
        width: max-content;
        animation: marquee ${animationDuration}s linear infinite;
        animation-delay: ${i * (animationDuration / 2)}s;
      `;
    });

    // Add keyframes animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes marquee {
        0% { transform: translateX(0); }
        100% { transform: translateX(-100%); }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleGmailClick = () => {
    window.location.href = "mailto:ishitababar30@gmail.com?subject=Let's%20collaborate&body=Hi%20Ishita,";
  };

  const handleGithubClick = () => {
    window.open("https://github.com/ishita-babar", "_blank");
  };

  const handleLinkedinClick = () => {
    window.open("https://www.linkedin.com/in/ishita-babar-4aa009278/", "_blank");
  };

  return (
    <>
      <CursorSpotlight />
      <div
        className="relative min-h-screen text-[#FAF9F6] font-vietnam bg-cover bg-center w-full overflow-hidden"
        style={{ backgroundImage: "url('https://i.ibb.co/HLTt4CBM/Contact-page.png')" }}
      >
        
        {/* Header - full width */}
        <div className="w-full px-6 md:px-16 pt-16">
          <div className="text-4xl font-semibold mb-2">Contacts</div>
          <hr className="border-[#FAF9F6] mb-10 w-full" />
        </div>

        {/* Moving text banner - full width */}
        <div className="w-full my-20 overflow-hidden">
          <div ref={containerRef} className="w-full">
            <div ref={textRef} className="text-[#FAF9F6] text-7xl md:text-8xl font-bold px-4">
              LET'S WORK TOGETHER &nbsp;&nbsp;&nbsp; LET'S WORK TOGETHER &nbsp;&nbsp;&nbsp; LET'S WORK TOGETHER &nbsp;&nbsp;&nbsp; LET'S WORK TOGETHER &nbsp;&nbsp;&nbsp;
            </div>
          </div>
        </div>

        {/* Main content - full width with padding */}
        <div className="w-full px-6 md:px-16 my-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left side */}
            <div className="text-[#FAF9F6]">
              <h2 className="text-2xl md:text-3xl font-semibold mb-8">
                I'm not hard to find.<br />
                Let's create something truly spectacular.
              </h2>
              <p className="text-lg opacity-80 max-w-md">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
            </div>

            {/* Right side - Contact links */}
            <div className="flex flex-col space-y-8">
              <div 
                onClick={handleGmailClick}
                className="flex items-center group text-[#FAF9F6] hover:text-white cursor-pointer"
              >
                <div className="mr-4">
                  <Mail size={24} />
                </div>
                <div className="flex-1">
                  <div className="text-xl font-medium">Gmail</div>
                </div>
                <ArrowUpRight 
                  size={24} 
                  className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" 
                />
              </div>
              <div 
                onClick={handleGithubClick}
                className="flex items-center group text-[#FAF9F6] hover:text-white cursor-pointer"
              >
                <div className="mr-4">
                  <Github size={24} />
                </div>
                <div className="flex-1">
                  <div className="text-xl font-medium">GitHub</div>
                </div>
                <ArrowUpRight 
                  size={24} 
                  className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" 
                />
              </div>

              <div 
                onClick={handleLinkedinClick}
                className="flex items-center group text-[#FAF9F6] hover:text-white cursor-pointer"
              >
                <div className="mr-4">
                  <Linkedin size={24} />
                </div>
                <div className="flex-1">
                  <div className="text-xl font-medium">LinkedIn</div>
                </div>
                <ArrowUpRight 
                  size={24} 
                  className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" 
                />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 w-full">
           <Footer />
        </div>
      </div>
    </>
  );
}