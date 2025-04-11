"use client";
import { useState } from "react";
import CursorSpotlight from "@/components/Cursor";
import Navbar from "@/components/Navbar";
import { dummyProjects, Project } from "@/data/Project";


export default function Projects() {
  const [hovering, setHovering] = useState(false);
  const [modalProject, setModalProject] = useState<Project | null>(null); 

  const openModal = (project: Project) => setModalProject(project);
  const closeModal = () => setModalProject(null);

  return (
    <>
      <CursorSpotlight size={hovering ? 150 : 20} text={hovering ? "Know More" : ""} />
      <div
        className="relative min-h-screen bg-cover bg-center text-black font-vietnam px-6 pt-24 overflow-hidden"
        style={{
          backgroundImage: "url('https://i.ibb.co/dwL20gp5/Landing-page-bg-1.png')",
        }}
      >
        <Navbar />
        <div className="text-4xl font-semibold mb-2">Projects</div>
        <hr className="border-black mb-10" />

        <div className="grid md:grid-cols-2 gap-8">
          {dummyProjects.map((project) => (
            <div
              key={project.id}
              className="cursor-none group"
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
              onClick={() => openModal(project)}
            >
              <img
                src={project.image}
                alt={project.name}
                className="rounded-xl shadow-lg"
              />
              <h2 className="text-xl font-semibold mt-4">{project.name}</h2>
            </div>
          ))}
        </div>

        {modalProject && (
          <div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-[99999]"
            onClick={closeModal}
          >
            <div
              className="bg-[#FAF9F6] text-black w-11/12 md:w-3/4 lg:w-2/3 h-[80%] rounded-2xl flex overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={modalProject.image}
                className="w-1/2 object-cover h-full"
                alt={modalProject.name}
              />
              <div className="p-6 w-1/2 flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-4">{modalProject.name}</h2>
                  <p className="mb-6">{modalProject.description}</p>
                </div>
                <a
                  href={modalProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View Project →
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
