"use client";
import { Server, Code, Briefcase, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const experiences = [
   {
    id: 1,
    company: "Samunnati",
    role: "Full Stack Developer",
    duration: "Aug 2025 - Present",
    icon: Code,
    description: [
      "Developed full-stack web applications using React.js, Node.js, and NestJS, ensuring responsive and high-performance user experiences across devices.",
      "Designed and integrated RESTful APIs, implemented authentication and authorization (JWT), and structured scalable database models using MongoDB.",
      "Translated Figma designs into modular and reusable React components, optimizing rendering performance and ensuring seamless cross-platform responsiveness.",
      "Improved application efficiency through lazy loading, code splitting, and browser-level performance tuning for enhanced scalability and reliability.",
      "Collaborated using Git/GitHub under an Agile workflow and deployed production-ready applications on Microsoft Azure for enterprise-grade availability."
    ]
  },
  {
    id: 2,
    company: "Mylapay",
    role: "Backend Developer Intern",
    duration: "April 2025 – June 2025",
    icon: Server,
    description: [
      "Engineered scalable backend services using Node.js and Express.js tailored for the fintech domain.",
      "Integrated payment gateways, transaction processing, and reconciliation modules to ensure secure financial operations.",
      "Optimized APIs and microservices for high throughput and low latency, enabling seamless real-time transaction handling.",
      "Collaborated with cross-functional teams to maintain regulatory compliance, data integrity, and system reliability.",
    ],
  },
];

export default function WorkExperience() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleCompanyClick = (company: string) => {
    if (company === "Samunnati") {
      window.open("https://samunnati.com", "_blank");
    }
    else if (company="Mylapay"){
      window.open("https://mylapay.com", "_blank")
    }
  };

  const scrollToNext = () => {
    if (currentIndex < experiences.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const scrollToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const currentExp = experiences[currentIndex];
  const Icon = currentExp.icon;

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

        {/* Scroll Up Button */}
        <div className="flex justify-center mb-4">
          <button
            onClick={scrollToPrevious}
            disabled={currentIndex === 0}
            className={`p-3 rounded-full transition-all duration-300 ${
              currentIndex === 0
                ? "bg-slate-800/30 text-gray-600 cursor-not-allowed"
                : "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 hover:scale-110"
            }`}
          >
            <ChevronUp className="w-6 h-6" />
          </button>
        </div>

        {/* Experience Card */}
        <div className="relative overflow-hidden">
          <div
            className="transition-all duration-500 ease-in-out transform"
            style={{ opacity: 1 }}
          >
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 shadow-2xl">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl">
                    <Icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">
                      {currentExp.role}
                    </h2>
                    <button
                      onClick={() => handleCompanyClick(currentExp.company)}
                      className="text-blue-400 hover:text-blue-300 font-semibold text-lg transition-colors duration-200 cursor-pointer"
                    >
                      {currentExp.company}
                    </button>
                  </div>
                </div>
                <span className="inline-flex items-center px-4 py-2 bg-slate-700/50 rounded-full text-sm text-gray-300 font-medium whitespace-nowrap">
                  {currentExp.duration}
                </span>
              </div>

              {/* Description */}
              <ul className="space-y-3">
                {currentExp.description.map((point, i) => (
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

        {/* Scroll Down Button */}
        <div className="flex justify-center mt-4">
          <button
            onClick={scrollToNext}
            disabled={currentIndex === experiences.length - 1}
            className={`p-3 rounded-full transition-all duration-300 ${
              currentIndex === experiences.length - 1
                ? "bg-slate-800/30 text-gray-600 cursor-not-allowed"
                : "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 hover:scale-110"
            }`}
          >
            <ChevronDown className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {experiences.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? "w-8 h-2 bg-blue-500"
                  : "w-2 h-2 bg-slate-600 hover:bg-slate-500"
              }`}
            />
          ))} 
        </div>
      </div>
    </div>
  );
}
