"use client";
import { Server, Briefcase } from "lucide-react";

const experience = {
  company: "RR IT Solutions",
  role: "Full Stack Developer",
  duration: "May 2024 – Present",
  icon: Server,
  description: [
    "Developed full-stack web applications using React.js, Node.js, and NestJS, ensuring responsive and high-performance user experiences across all devices.",
    "Designed and integrated RESTful APIs, implemented authentication and authorization using JWT, and structured scalable database models with MongoDB.",
    "Translated Figma designs into modular and reusable React components, optimized rendering performance, and ensured seamless cross-platform responsiveness.",
    "Improved application efficiency through lazy loading, code splitting, and browser-level performance tuning for enhanced scalability and reliability.",
    "Collaborated using Git/GitHub within Agile workflows and deployed production-ready applications on Microsoft Azure for enterprise-grade availability.",
  ],
};

export default function WorkExperience() {
  const Icon = experience.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl w-full">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-2 bg-blue-500/10 rounded-lg mb-4">
            <Briefcase className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Work Experience
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        {/* Experience Card */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 shadow-2xl">
          
          {/* Card Header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl">
                <Icon className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">
                  {experience.role}
                </h2>
                <a
                  href="https://www.rritsolutions.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 font-semibold text-lg transition-colors duration-200"
                >
                  {experience.company}
                </a>
              </div>
            </div>
            <span className="inline-flex items-center px-4 py-2 bg-slate-700/50 rounded-full text-sm text-gray-300 font-medium whitespace-nowrap">
              {experience.duration}
            </span>
          </div>

          {/* Description */}
          <ul className="space-y-3">
            {experience.description.map((point, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-gray-300 leading-relaxed"
              >
                <span className="mt-2 w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0"></span>
                <span className="flex-1">{point}</span>
              </li>
            ))}
          </ul>
        </div>
       </div>
      </div>
  );
}
