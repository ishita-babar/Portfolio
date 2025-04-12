"use client";
import CursorSpotlight from "@/components/Cursor";
import Navbar from "@/components/Navbar";
import { Project } from "@/data/Project";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import Image from "next/image";

export default function Projects() {
  return (
    <>
      <CursorSpotlight />
      <div
        className="relative min-h-screen bg-cover bg-center text-black font-vietnam px-6 pt-24"
        style={{
          backgroundImage: "url('https://i.ibb.co/dwL20gp5/Landing-page-bg-1.png')",
        }}
      >
        <Navbar />
        <div className="text-4xl font-semibold mb-2 text-black">Projects</div>
        <hr className="border-black mb-10" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {Project.map((project) => (
            <div key={project.id} className="perspective group cursor-none">
              <div className="relative w-full aspect-[4/3] transition-transform duration-500 transform-style preserve-3d group-hover:rotate-y-180 rounded-xl shadow-md">
                <div className="absolute w-full h-full backface-hidden overflow-hidden rounded-xl">
                  <Image
                    src={project.image}
                    alt={project.name}
                    width={500}
                    height={500}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <div className="absolute w-full h-full bg-[#1D1D1D] text-[#FAF9F6] rounded-xl p-4 transform rotate-y-180 backface-hidden flex flex-col justify-between">
                  <div className="flex justify-end gap-3">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#FAF9F6] hover:text-gray-300 text-xl"
                      >
                        <FaGithub />
                      </a>
                    )}
                    {project.site && (
                      <a
                        href={project.site}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#FAF9F6] hover:text-gray-300 text-xl"
                      >
                        <FaExternalLinkAlt />
                      </a>
                    )}
                  </div>
                  <div className="flex flex-col justify-center text-center flex-1">
                    <h2 className="text-lg font-bold mb-2">{project.name}</h2>
                    <p className="text-sm mb-2">{project.description}</p>
                    <div className="flex flex-wrap justify-center gap-2 mt-2">
                      {project.techStack.map((tech, index) => (
                        <span
                          key={index}
                          className="bg-[#FAF9F6] text-[#1D1D1D] px-2 py-1 rounded-full text-xs font-semibold border border-[#FAF9F6]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
