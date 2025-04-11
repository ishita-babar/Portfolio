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
      {/* Wrapper ensures all scroll effects are contained */}
      <div className="relative w-full bg-[#f9f9f9] text-black font-vietnam overflow-x-hidden">
        <Navbar />

        {/* Hero Section */}
        <section className="w-full h-screen flex flex-col justify-between px-12 py-24 overflow-hidden">
          <motion.h1
            className="text-9xl font-light leading-tight"
            style={{ x: ishitaX }}
          >
            👋 I’m Ishita Babar
          </motion.h1>

          <div className="flex justify-between items-start w-full mt-10">
            <p className="max-w-md text-2xl leading-relaxed">
            With a year of hands-on experience, I specialize in building scalable, user-focused web applications that merge clean 
            architecture with engaging interfaces.
            </p>
            <h2 className="text-7xl font-extrabold whitespace-nowrap mt-5">
              A Web Developer
            </h2>
          </div>

          <motion.p
          className="text-9xl font-light mt-20 mx-20"
          style={{ x: livesX }}
        >
          <span className="flex items-center gap-6">
            lives by code <Terminal className="w-[100px] h-[100px] mt-6" />
          </span>
        </motion.p>
        </section>

        {/* Sections */}
        <Projects />
        <Experience />
        <Skills />
        <Contacts />
      </div>
    </>
  );
}
