"use client";
import Navbar from "../components/Navbar";
import CursorSpotlight from "../components/Cursor";
import { motion, useScroll, useTransform } from "framer-motion";
import Projects from "./projects/page";
import Experience from "./experience/page";
import Skills from "./skills/page";
import Contacts from "./contact/page";
import { Terminal } from 'lucide-react';

export default function Home() {
  const { scrollY } = useScroll();
  const ishitaX = useTransform(scrollY, [0, 500], ["0%", "30%"]);
  const livesX = useTransform(scrollY, [0, 500], ["0%", "-30%"]);

  return (
    <>
      <CursorSpotlight />
      <div className="relative w-full bg-[#f9f9f9] text-black font-vietnam overflow-x-hidden"
      style={{ backgroundImage: "url('https://i.ibb.co/dwL20gp5/Landing-page-bg-1.png')" }}
      >
        <Navbar />
        <section className="w-full h-screen flex flex-col justify-between px-6 sm:px-12 py-24 pt-16 sm:pt-24 md:py-24 overflow-hidden">
          <motion.h1
            className="text-5xl sm:text-7xl md:text-9xl font-light leading-tight mt-16 sm:mt-0"
            style={{ x: ishitaX }}
          >
            * I&apos;m Ishita Babar
          </motion.h1>

          <div className="flex flex-col md:flex-row justify-between items-start w-full mt-10">
            <p className="max-w-md text-xl sm:text-2xl leading-relaxed">
              With a year of hands-on experience, I specialize in building scalable, user-focused web applications that merge clean 
              architecture with engaging interfaces.
            </p>
            <h2 className="text-4xl md:text-7xl font-extrabold mt-6 md:mt-5">
              A Web Developer
            </h2>
          </div>
          <motion.div
            className="text-4xl sm:text-5xl md:text-9xl font-light mt-10 sm:mt-20 w-full overflow-visible"
            style={{ x: livesX }}
          >
            <span className="flex flex-wrap items-center gap-3 md:gap-6">
              <span className="whitespace-nowrap">lives by</span> 
              <span className="flex items-center whitespace-nowrap">
                code <Terminal className="w-10 h-10 md:w-24 md:h-24 lg:w-[100px] lg:h-[100px] ml-2 mt-2 md:mt-6" />
              </span>
            </span>
          </motion.div>
        </section>
        <Projects />
        <Experience />
        <Skills />
        <Contacts />
      </div>
    </>
  );
}