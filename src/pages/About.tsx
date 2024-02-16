import React, { useEffect } from "react";
import { useTheme } from "../contexts/themeContext";

function About() {
  const { theme } = useTheme();
  useEffect(() => {
    document.title = 'About - Sean Finch • SoCal';
  }, []);

  return <p>About page coming soon!</p>;
}

export default About;
