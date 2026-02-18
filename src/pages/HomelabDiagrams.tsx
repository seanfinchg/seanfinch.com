import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/themeContext";
import { projects } from "../data/projects";

const HomelabDiagrams: React.FC = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [selectedDiagram, setSelectedDiagram] = useState("storage");
  const [loading, setLoading] = useState(true);

  // Find the Homelab project
  const homelabProject = projects.find((p) =>
    p.title.toLowerCase().includes("homelab"),
  );

  if (!homelabProject || !homelabProject.diagrams) {
    navigate("/404");
    return null;
  }

  const currentDiagram = homelabProject.diagrams.find(
    (d) => d.name === selectedDiagram,
  );

  useEffect(() => {
    setLoading(true);
  }, [theme, selectedDiagram]);

  if (!currentDiagram) {
    return null;
  }

  // Construct the URL to the diagram file
  const diagramUrl = `${window.location.origin}/diagrams/${currentDiagram.file}`;
  const encodedUrl = encodeURIComponent(diagramUrl);
  const darkModeParam = theme === "dark" ? "&dark=1" : "";
  const viewerUrl = `https://viewer.diagrams.net/?tags=%7B%7D&highlight=0000ff&edit=_blank&layers=1&nav=1&title=${encodeURIComponent(
    currentDiagram.file,
  )}&url=${encodedUrl}${darkModeParam}`;

  return (
    <>
      <style>{`
        .homelab-container {
          height: calc(100vh - 5rem);
        }
        @media (min-width: 768px) {
          .homelab-container {
            height: calc(100vh - 3rem);
          }
        }
      `}</style>
      <div
        className={`homelab-container flex flex-col ${
          theme === "light"
            ? "bg-light-mode text-dark-mode"
            : "bg-dark-mode text-light-mode"
        }`}
      >
        <div className="container mx-auto px-4 md:px-4 pt-6 pb-2 md:pt-4 md:pb-1.5 flex-shrink-0">
          <div className="mb-2 md:mb-1">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-1">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate("/projects")}
                  className="text-blue-500 hover:text-blue-600 font-monospace text-lg md:text-base transition-all"
                  title="Back to Projects"
                >
                  ←
                </button>
                <h1 className="text-3xl md:text-2xl font-bold font-jost">
                  {homelabProject.title}
                </h1>
              </div>
              {/* Diagram Selector - Dropdown on Mobile, Buttons on Desktop */}
              <div className="md:hidden">
                <select
                  value={selectedDiagram}
                  onChange={(e) =>
                    e.target.value !== "networking" &&
                    setSelectedDiagram(e.target.value)
                  }
                  className={`w-full px-4 py-2.5 rounded-lg font-monospace text-base font-semibold border-2 transition-all shadow-sm ${
                    theme === "light"
                      ? "bg-blue-500 border-blue-500 text-white hover:bg-blue-600"
                      : "bg-blue-600 border-blue-600 text-white hover:bg-blue-700"
                  }`}
                  style={{
                    WebkitAppearance: "none",
                    MozAppearance: "none",
                    appearance: "none",
                    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 0.7rem center",
                    backgroundSize: "1.2rem",
                    paddingRight: "2.5rem",
                  }}
                >
                  {homelabProject.diagrams.map((diagram) => (
                    <option
                      key={diagram.name}
                      value={diagram.name}
                      disabled={diagram.name === "networking"}
                      className="bg-white dark:bg-gray-800 text-dark-mode dark:text-light-mode"
                    >
                      {diagram.label}
                      {diagram.name === "networking" ? " (Coming Soon)" : ""}
                    </option>
                  ))}
                </select>
              </div>
              <div className="hidden md:flex flex-wrap gap-2">
                {homelabProject.diagrams.map((diagram) => (
                  <button
                    key={diagram.name}
                    onClick={() =>
                      diagram.name !== "networking" &&
                      setSelectedDiagram(diagram.name)
                    }
                    disabled={diagram.name === "networking"}
                    className={`px-5 py-2 rounded-lg font-monospace text-sm transition-all ${
                      diagram.name === "networking"
                        ? "bg-gray-400 text-gray-600 cursor-not-allowed opacity-50"
                        : selectedDiagram === diagram.name
                          ? theme === "light"
                            ? "bg-blue-500 text-white shadow-lg font-bold underline decoration-2 underline-offset-4"
                            : "bg-blue-600 text-white shadow-lg font-bold underline decoration-2 underline-offset-4"
                          : theme === "light"
                            ? "bg-gray-200 text-dark-mode hover:bg-gray-300 font-semibold"
                            : "bg-gray-700 text-light-mode hover:bg-gray-600 font-semibold"
                    }`}
                  >
                    {diagram.label}
                    {diagram.name === "networking" && (
                      <span className="ml-1.5 text-xs">(Coming Soon)</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Diagram Viewer */}
        <div className="w-full md:container md:mx-auto px-0 md:px-4 pb-1 md:pb-2 flex-1 min-h-0">
          <div
            className={`h-full md:rounded-lg overflow-hidden border-2 ${
              theme === "light" ? "border-gray-400" : "border-gray-500"
            }`}
          >
            {loading && (
              <div className="flex items-center justify-center h-full bg-gray-100 dark:bg-gray-800">
                <p className="text-xl font-raleway">Loading diagram...</p>
              </div>
            )}
            <iframe
              src={viewerUrl}
              className="w-full h-full"
              onLoad={() => setLoading(false)}
              title={currentDiagram.label}
              style={{ border: "none" }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomelabDiagrams;
