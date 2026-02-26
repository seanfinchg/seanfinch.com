import React, { useEffect } from "react";
import { useTheme } from "../contexts/themeContext";
import { experiences } from "../data/experiences";
import ExperienceCard from "../components/ExperienceCard";

const Experience: React.FC = () => {
  const { theme } = useTheme();

  useEffect(() => {
    document.title = "Experience - Sean Finch • SoCal";
  }, []);

  return (
    <div
      className={`flex flex-col items-center ${theme === "light" ? "bg-light-mode text-dark-mode" : "bg-dark-mode text-light-mode"} pt-16 p-4 font-roboto-slab`}
    >
      <h1 className="text-4xl font-bold mb-8 font-jost">Experience</h1>
      {[...experiences]
        .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
        .map((experience, index) => (
          <ExperienceCard
            key={index}
            {...experience}
            featured={experience.featured}
            badgeLabel={experience.featured ? "FEATURED ROLE" : undefined}
          />
        ))}
    </div>
  );
};

export default Experience;
