import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/themeContext";
import { projects } from "../data/projects";

const HomelabDiagrams: React.FC = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  // Find the Homelab project
  const homelabProject = projects.find((p) =>
    p.title.toLowerCase().includes("homelab"),
  );

  if (!homelabProject || !homelabProject.diagrams) {
    navigate("/404");
    return null;
  }

  return (
    <div
      className={`min-h-screen ${
        theme === "light"
          ? "bg-light-mode text-dark-mode"
          : "bg-dark-mode text-light-mode"
      }`}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <button
            onClick={() => navigate("/projects")}
            className="text-blue-500 hover:text-blue-600 underline font-monospace mb-4"
          >
            ← Back to Projects
          </button>
          <h1 className="text-4xl font-bold font-jost mb-6">
            {homelabProject.title}
          </h1>
        </div>

        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {homelabProject.diagrams.map((diagram) => (
              <Link
                key={diagram.name}
                to={`/projects/homelab/${diagram.name}`}
                className={`p-6 rounded-lg border-2 transition-all hover:shadow-xl ${
                  theme === "light"
                    ? "border-dark-mode bg-white hover:border-blue-500"
                    : "border-light-mode bg-gray-800 hover:border-blue-400"
                }`}
              >
                <h3 className="text-2xl font-bold font-jost mb-2">
                  {diagram.label}
                </h3>
                <p className="text-sm font-monospace text-blue-500">
                  View interactive diagram →
                </p>
              </Link>
            ))}
          </div>
        </div>

        <div
          className={`p-4 rounded-lg ${
            theme === "light" ? "bg-gray-100" : "bg-gray-800"
          }`}
        >
          <p className="text-sm font-raleway">
            <strong>Note:</strong> These diagrams are interactive and hosted
            using diagrams.net viewer. You can zoom, pan, and click on elements
            for a detailed view of the infrastructure.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomelabDiagrams;
