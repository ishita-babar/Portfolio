"use client";
import { useState } from "react";
import CursorSpotlight from "../../components/Cursor";
import Navbar from "../../components/Navbar";
import { experiences, introText } from "@/data/Experience";
import { ChevronDown, ChevronUp, Globe } from "lucide-react";

export default function Experience() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <>
      <CursorSpotlight />
      <div
        className="relative min-h-screen text-black font-vietnam bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: "url('https://i.ibb.co/dwL20gp5/Landing-page-bg-1.png')" }}
      >
        <Navbar />
        
        <div className="w-full px-4 md:px-8 py-16">
          <div className="text-4xl font-semibold mb-2">Experience</div>
          <hr className="border-black w-full mb-10" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="pr-0 md:pr-8">
              <h2 className="text-2xl font-medium mb-6">My Professional Journey</h2>
              <p className="text-lg leading-relaxed">{introText}</p>
              
              <div className="mt-10 hidden md:block">
                <h3 className="text-xl font-medium mb-4">What I Bring</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/70 backdrop-blur-sm p-4 rounded-lg shadow-sm">
                    <div className="font-bold mb-2">Technical Excellence</div>
                    <p>Combining cutting-edge tools with clean code practices for optimal solutions.</p>
                  </div>
                  <div className="bg-white/70 backdrop-blur-sm p-4 rounded-lg shadow-sm">
                    <div className="font-bold mb-2">User-Focused</div>
                    <p>Creating intuitive experiences that prioritize user needs and engagement.</p>
                  </div>
                  <div className="bg-white/70 backdrop-blur-sm p-4 rounded-lg shadow-sm">
                    <div className="font-bold mb-2">Innovation</div>
                    <p>Constantly exploring new approaches to solve challenging problems.</p>
                  </div>
                  <div className="bg-white/70 backdrop-blur-sm p-4 rounded-lg shadow-sm">
                    <div className="font-bold mb-2">Collaboration</div>
                    <p>Working effectively across teams to deliver cohesive, impactful projects.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-10 md:mt-0">
              <div className="space-y-6">
                {experiences.map((exp) => (
                  <div key={exp.id} className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md overflow-hidden">
                    <div 
                      className="p-4 cursor-pointer flex justify-between items-start transition-colors hover:bg-gray-50"
                      onClick={() => toggleExpand(exp.id)}
                    >
                      <div className="flex-1">
                        <h3 className="font-bold text-xl">{exp.company}</h3>
                        <p className="text-gray-700">{exp.duration}</p>
                        <p className="font-medium">{exp.position}</p>
                      </div>
                      <div className="ml-4 mt-1">
                        {expandedId === exp.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </div>
                    </div>
                    
                    <hr className="border-[#D0C9C3]" />
                    
                    {expandedId === exp.id && (
                      <div className="p-4 bg-gray-50/70">
                        <div className="flex items-center mb-3">
                          <Globe size={16} className="mr-2" />
                          <a 
                            href={exp.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {exp.website.replace(/^https?:\/\/(www\.)?/, '')}
                          </a>
                        </div>
                        
                        <div className="mb-3 flex flex-wrap gap-2">
                          {exp.technologies.map((tech, index) => (
                            <span 
                              key={index} 
                              className="bg-gray-200 text-gray-800 px-2 py-1 rounded-md text-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        
                        <div className="whitespace-pre-line text-gray-700">
                          {exp.description}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}