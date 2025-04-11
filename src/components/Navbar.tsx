"use client"
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const [quoteIndex, setQuoteIndex] = useState(-1);
  const quotes = ["Hi, my name is Dino!", "Nice to meet you"];

  const handleClick = () => {
    setQuoteIndex((prev) => {
      if (prev === quotes.length - 1) return -1; 
      return prev + 1;
    });
  };

  return (
    <nav className="fixed top-0 w-full bg-[#FAF9F6] py-4 border-b-2 border-black z-50 text-black font-vietnam">
      <div className="max-w-6xl mx-auto relative flex items-center px-6">
        <Link href="/" className="hover:underline text-xl font-semibold absolute left-6">
          Ishita Babar
        </Link>

        <div className="mx-auto flex gap-8 text-lg font-medium">
          <Link href="/projects" className="hover:underline">Projects</Link>
          <Link href="/experience" className="hover:underline">Experience</Link>
          <Link href="/skills" className="hover:underline">Skills</Link>
          <Link href="/contact" className="hover:underline">Contact</Link>
        </div>

        <div className="absolute right-6 flex items-center cursor-pointer" onClick={handleClick}>
          {quoteIndex !== -1 && (
            <div className="absolute right-16 top-[-5px] bg-white border border-black rounded-md px-6 py-5 shadow text-sm w-50">
              {quotes[quoteIndex]}
              <div className="absolute -right-3 top-5 w-0 h-0 border-t-8 border-b-8 border-l-[12px] border-t-transparent border-b-transparent border-l-black"></div>
              <div className="absolute -right-2 top-5 w-0 h-0 border-t-7 border-b-7 border-l-[11px] border-t-transparent border-b-transparent border-l-white"></div>
            </div>
          )}

          <Image src="/dino.png" alt="Dino" width={70} height={70} />
        </div>
      </div>
    </nav>
  );
}
