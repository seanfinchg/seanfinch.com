import { useEffect } from "react";

function About() {
  useEffect(() => {
    document.title = "About - Sean Finch • SoCal";
  }, []);

  return <p>About page coming soon!</p>;
}

export default About;
