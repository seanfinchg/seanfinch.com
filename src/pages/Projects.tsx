import { useEffect } from "react";

function Projects() {
  useEffect(() => {
    document.title = 'Projects - Sean Finch • SoCal';
  }, []);

  return <p>Projects: This is one of them! Projects page coming soon!</p>;
}

export default Projects;
