import React, { useEffect } from "react";
import { useTheme } from "../contexts/themeContext";

function Projects() {
  const { theme } = useTheme();
  useEffect(() => {
    document.title = 'Projects - Sean Finch • SoCal';
  }, []);

  return <p>Projects: This is one of them! Projects page coming soon!</p>;
}

export default Projects;
