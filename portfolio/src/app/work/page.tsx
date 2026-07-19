"use client";

const experiences = [
  {
    company: "Foyer Technology",
    companyUrl: "https://foyertech.com",
    role: "Full Stack Developer",
    duration: "Jul 2026 — Present",
    current: true,
    description: [
      "Contributing to the design and development of web applications using modern JavaScript technologies.",
      "Collaborating with cross-functional teams to build and maintain responsive front-end interfaces and backend services.",
      "Working across the full development lifecycle, from planning through testing and deployment.",
      "Participating in Agile workflows, code reviews, and version control practices.",
    ],
  },
  {
    company: "RR IT Solutions",
    companyUrl: "https://www.rritsolutions.com",
    role: "Full Stack Developer",
    duration: "May 2024 — Jul 2026",
    current: false,
    description: [
      "Developed full-stack web applications using React.js, Node.js, and NestJS, ensuring responsive, high-performance experiences across devices.",
      "Designed and integrated RESTful APIs; implemented JWT authentication and authorization; structured scalable MongoDB data models.",
      "Translated Figma designs into modular, reusable React components with optimized rendering performance.",
      "Improved application efficiency through lazy loading, code splitting, and browser-level performance tuning.",
      "Deployed production-ready applications on Microsoft Azure within an Agile, Git-based workflow.",
    ],
  },
];

export default function WorkExperience() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex justify-center px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-2xl w-full">
        <div className="mb-12">
          <h1 className="text-2xl font-semibold text-white mb-12">Work History</h1>
        </div>

        <div>
          {experiences.map((exp, i) => (
            <div
              key={i}
              className="grid gap-5"
              style={{ gridTemplateColumns: "20px 1fr" }}
            >
              <div className="flex flex-col items-center">
                <div
                  className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                    exp.current ? "bg-blue-400" : "bg-gray-600"
                  }`}
                />
                {i !== experiences.length - 1 && (
                  <div className="w-px flex-1 bg-gray-800 mt-1.5" />
                )}
              </div>

              <div className={i === experiences.length - 1 ? "pb-0" : "pb-10"}>
                <div className="flex items-baseline justify-between flex-wrap gap-x-3 gap-y-1 mb-0.5">
                  <h3 className="text-white font-medium text-base">
                    {exp.role}
                  </h3>
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {exp.duration}
                  </span>
                </div>

                <div className="mb-3 flex items-center gap-2">
                  {exp.companyUrl ? (
                    <a
                      href={exp.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-300 font-medium hover:text-white transition-colors"
                    >
                      {exp.company}
                    </a>
                  ) : (
                    <span className="text-sm text-gray-300 font-medium">
                      {exp.company}
                    </span>
                  )}
                  {exp.current && (
                    <span className="text-[11px] text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">
                      Current
                    </span>
                  )}
                </div>

                <ul className="space-y-2">
                  {exp.description.map((point, j) => (
                    <li
                      key={j}
                      className="text-sm text-gray-400 leading-relaxed pl-4 relative"
                    >
                      <span className="absolute left-0">—</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
