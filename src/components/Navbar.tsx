"use client"
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [quoteIndex, setQuoteIndex] = useState(-1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const quotes = ["Nice to meet you!", "Let's connect"];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleClick = () => {
    setQuoteIndex((prev) => {
      if (prev === quotes.length - 1) return -1; 
      return prev + 1;
    });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 w-full bg-[#FAF9F6] py-4 border-b-2 border-black z-50 text-black font-vietnam">
      <div className="max-w-6xl mx-auto relative flex items-center px-6">
        <Link href="/" className="hover:underline text-xl font-semibold absolute left-6">
          Ishita Babar
        </Link>
        {!isMobile && (
          <div className="mx-auto flex gap-8 text-lg font-medium">
            <Link href="/projects" className="hover:underline">Projects</Link>
            <Link href="/experience" className="hover:underline">Experience</Link>
            <Link href="/skills" className="hover:underline">Skills</Link>
            <Link href="/contact" className="hover:underline">Contact</Link>
          </div>
        )}
        {!isMobile && (
          <div className="absolute right-6 flex items-center cursor-pointer" onClick={handleClick}>
            {quoteIndex !== -1 && (
              <div className="absolute right-16 top-[-5px] bg-white border border-black rounded-md px-6 py-5 shadow text-sm w-50">
                {quotes[quoteIndex]}
                <div className="absolute -right-3 top-5 w-0 h-0 border-t-8 border-b-8 border-l-[12px] border-t-transparent border-b-transparent border-l-black"></div>
                <div className="absolute -right-2 top-5 w-0 h-0 border-t-7 border-b-7 border-l-[11px] border-t-transparent border-b-transparent border-l-white"></div>
              </div>
            )}
            <Image src="https://i.ibb.co/xqmwgfYK/dino.png" alt="Dino" width={70} height={70} />
          </div>
        )}
        {isMobile && (
          <button 
            onClick={toggleMenu}
            className="absolute right-6 z-50 flex flex-col justify-center items-center"
          >
            <span className={`bg-black block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
            <span className={`bg-black block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`bg-black block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
          </button>
        )}
        {isMobile && isMenuOpen && (
          <div className="fixed top-16 left-0 w-full bg-[#FAF9F6] border-b-2 border-black py-4 px-6 shadow-lg">
            <div className="flex flex-col gap-4 text-lg font-medium">
              <Link href="/projects" className="hover:underline" onClick={() => setIsMenuOpen(false)}>Projects</Link>
              <Link href="/experience" className="hover:underline" onClick={() => setIsMenuOpen(false)}>Experience</Link>
              <Link href="/skills" className="hover:underline" onClick={() => setIsMenuOpen(false)}>Skills</Link>
              <Link href="/contact" className="hover:underline" onClick={() => setIsMenuOpen(false)}>Contact</Link>
              <div className="mt-4 flex justify-center">
                <div className="cursor-pointer relative" onClick={handleClick}>
                  {quoteIndex !== -1 && (
                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white border border-black rounded-md px-6 py-5 shadow text-sm w-50">
                      {quotes[quoteIndex]}
                      <div className="absolute -bottom-3 left-1/2 w-0 h-0 border-l-8 border-r-8 border-t-[12px] border-l-transparent border-r-transparent border-t-black transform -translate-x-1/2"></div>
                      <div className="absolute -bottom-2 left-1/2 w-0 h-0 border-l-7 border-r-7 border-t-[11px] border-l-transparent border-r-transparent border-t-white transform -translate-x-1/2"></div>
                    </div>
                  )}
                  <Image 
                    src="https://i.ibb.co/xqmwgfYK/dino.png" 
                    alt="Dino" 
                    width={70} 
                    height={70} 
                    className="mx-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}