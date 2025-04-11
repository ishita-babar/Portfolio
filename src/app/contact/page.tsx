"use client";
import { useEffect, useRef } from "react";
import CursorSpotlight from "@/components/Cursor";
import Footer from "@/components/Footer";
import { ArrowUpRight, Mail, Github, Linkedin } from "lucide-react";

export default function Contacts() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const container = containerRef.current;
    const textElement = textRef.current;

    if (!container || !textElement) return;

    const textClone = textElement.cloneNode(true) as HTMLDivElement;
    container.appendChild(textClone);

    textElement.classList.add("marquee-text");
    textClone.classList.add("marquee-text");

    const style = document.createElement("style");
    style.textContent = `
      .marquee-wrapper {
        display: flex;
        overflow: hidden;
        white-space: nowrap;
      }

      .marquee-text {
        display: inline-block;
        padding-right: 4rem;
        animation: marqueeScroll 20s linear infinite;
      }

      @keyframes marqueeScroll {
        0% { transform: translateX(0); }
        100% { transform: translateX(-100%); }
      }
    `;
    document.head.appendChild(style);
    container.classList.add("marquee-wrapper");

    return () => {
      document.head.removeChild(style);
      container.removeChild(textClone);
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
        className="relative min-h-screen text-[#FAF9F6] font-vietnam bg-cover bg-center w-full"
        style={{ backgroundImage: "url('https://i.ibb.co/HLTt4CBM/Contact-page.png')" }}
      >
        <div className="w-full px-6 md:px-16 pt-16">
          <div className="text-4xl font-semibold mb-2">Contacts</div>
          <hr className="border-[#FAF9F6] mb-10 w-full" />
        </div>

        <div className="w-full my-20 overflow-hidden">
          <div ref={containerRef}>
            <div ref={textRef} className="text-[#FAF9F6] text-7xl md:text-8xl font-bold px-4">
              LET'S WORK TOGETHER &nbsp;&nbsp;&nbsp; LET'S WORK TOGETHER &nbsp;&nbsp;&nbsp;
            </div>
          </div>
        </div>
        <div className="w-full px-6 md:px-16 my-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="text-[#FAF9F6]">
              <h2 className="text-2xl md:text-3xl font-semibold mb-8">
                I'm not hard to find.<br />
                Let's create something truly spectacular.
              </h2>
              <p className="text-lg opacity-80 max-w-md">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
            </div>
            <div className="flex flex-col space-y-8 mx-50">
            <div className="flex items-center justify-start gap-x-4 group cursor-pointer hover:text-white text-[#FAF9F6]">
              <Mail size={24} />
              <div className="text-xl font-lg">Gmail</div>
              <ArrowUpRight size={24} className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>
            <div className="flex items-center justify-start gap-x-4 group cursor-pointer hover:text-white text-[#FAF9F6]">
            <Github size={24} />
            <div className="text-xl font-lg">GitHub</div>
            <ArrowUpRight size={24} className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </div>

          <div className="flex items-center justify-start gap-x-4 group cursor-pointer hover:text-white text-[#FAF9F6]">
            <Linkedin size={24} />
            <div className="text-xl font-lg">LinkedIn</div>
            <ArrowUpRight size={24} className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
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
