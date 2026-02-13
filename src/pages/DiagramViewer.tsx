import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/themeContext";
import { projects } from "../data/projects";

const DiagramViewer: React.FC = () => {
  const { diagramName } = useParams<{
    diagramName: string;
  }>();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [loading, setLoading] = useState(true);

  // Find the Homelab project
  const project = projects.find((p) =>
    p.title.toLowerCase().includes("homelab"),
  );

  const diagram = project?.diagrams?.find((d) => d.name === diagramName);

  useEffect(() => {
    if (!project || !diagram) {
      navigate("/404");
    }
  }, [project, diagram, navigate]);

  useEffect(() => {
    setLoading(true);
  }, [theme]);

  if (!project || !diagram) {
    return null;
  }

  // Construct the URL to the diagram file hosted on your site
  const diagramUrl = `${window.location.origin}/diagrams/${diagram.file}`;

  // Encode the URL for diagrams.net viewer
  const encodedUrl = encodeURIComponent(diagramUrl);

  // diagrams.net viewer URL with your diagram and dark mode support
  const darkModeParam = theme === "dark" ? "&dark=1" : "";
  const viewerUrl = `https://viewer.diagrams.net/?tags=%7B%7D&highlight=0000ff&edit=_blank&layers=1&nav=1&title=${encodeURIComponent(
    diagram.file,
  )}&url=${encodedUrl}${darkModeParam}`;

  return (
    <div
      className={`min-h-screen ${
        theme === "light"
          ? "bg-light-mode text-dark-mode"
          : "bg-dark-mode text-light-mode"
      }`}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <button
            onClick={() => navigate("/projects/homelab")}
            className="text-blue-500 hover:text-blue-600 underline font-monospace mb-2"
          >
            ← Back to Homelab
          </button>
          <h1 className="text-4xl font-bold font-jost mb-2">{project.title}</h1>
          <h2 className="text-2xl font-semibold font-raleway text-gray-600 dark:text-gray-400">
            {diagram.label}
          </h2>
        </div>

        {/* Diagram iframe container */}
        <div
          className={`relative w-full rounded-lg border-2 ${
            theme === "light" ? "border-dark-mode" : "border-light-mode"
          }`}
          style={{ height: "calc(100vh - 250px)", minHeight: "600px" }}
        >
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-lg font-monospace">Loading diagram...</p>
            </div>
          )}
          <iframe
            key={theme}
            src={viewerUrl}
            className="w-full h-full rounded-lg"
            title={diagram.label}
            onLoad={() => setLoading(false)}
            style={{ border: "none" }}
          />
        </div>

        {/* Navigation to other diagrams if available */}
        {project.diagrams && project.diagrams.length > 1 && (
          <div className="mt-6">
            <h3 className="text-xl font-bold font-jost mb-3">
              Other Diagrams:
            </h3>
            <div className="flex flex-wrap gap-3">
              {project.diagrams
                .filter((d) => d.name !== diagramName)
                .map((d) => (
                  <button
                    key={d.name}
                    onClick={() => navigate(`/projects/homelab/${d.name}`)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-monospace transition-colors"
                  >
                    {d.label}
                  </button>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiagramViewer;
