// components/WorkExperience.tsx
"use client";
import { Server } from "lucide-react";


const experiences = [
  {
    id: 1,
    company: "Mylapay",
    role: "Backend Developer Intern",
    duration: "April 2025 – June 2025",
    icon: <Server className=" w-8 h-8 text-white" />,
    description: [
      "Engineered scalable backend services using Node.js and Express.js tailored for the fintech domain.",
      "Integrated payment gateways, transaction processing, and reconciliation modules to ensure secure financial operations.",
      "Optimized APIs and microservices for high throughput and low latency, enabling seamless real-time transaction handling.",
      "Collaborated with cross-functional teams to maintain regulatory compliance, data integrity, and system reliability.",
    ],
  },
];

const handleClick = () => {
  window.location.href= "https://mylapay.com"
}



export default function WorkExperience() {
  return (
    <section className="bg-black overflow-y:visible py-20 min-h-screen">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl text-white  text-center font-bold mb-12 ">Work Experience</h2>
        <div className="relative  pl-6">
          {experiences.map((exp) => (
            <div key={exp.id} className="mb-10 relative">
           <span className="absolute -left-6 top-0 bottom-0 w-0.5 bg-blue-200 before:content-[''] before:absolute before:-left-1.5 before:top-0 before:w-4 before:h-4 before:bg-blue-600 before:rounded-full before:border-2 before:border-white before:shadow-lg before:z-10" />
              <div className="bg-[#1d1c20] p-6 rounded-lg border border-white/10 shadow-sm">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-2xl text-white font-semibold">{exp.role}</h3>
                  <span className="text-lg text-neutral-400">{exp.duration}</span>
                </div>
                <h4 className=" text-blue-400 font-medium text-lg mb-3 cursor-pointer"  onClick={handleClick} >{exp.company}</h4>
                <ul className="list-disc list-outside space-y-4 pl-4 text-neutral-300 text-xl leading-relaxed">
                  {exp.description.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
