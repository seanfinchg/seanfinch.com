import React, { useEffect } from "react";
import { useTheme } from "../contexts/themeContext";
import { experiences, ExperienceProps } from "../data/experiences";

const ExperienceCard: React.FC<ExperienceProps> = ({
  title,
  company,
  location,
  description,
  dateRange,
  featured = false,
}) => {
  const { theme } = useTheme();

  if (featured) {
    return (
      <div
        className={`w-full mb-8 p-6 border-4 ${
          theme === "light"
            ? "border-blue-500 bg-blue-50"
            : "border-blue-400 bg-blue-900/20"
        } rounded-lg text-${theme === "light" ? "dark-mode" : "light-mode"} m-4 font-raleway shadow-2xl relative`}
      >
        <div className="absolute -top-4 left-4 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold font-monospace">
          ⭐ UPCOMING ROLE
        </div>
        <h2 className="text-3xl font-bold mb-1 mt-2 font-jost">{title}</h2>
        <h3 className="text-2xl font-semibold mb-1 font-jost">{company}</h3>
        <p className="text-base italic mb-3 font-monospace">
          {location} | {dateRange}
        </p>
        <ul className="list-disc pl-5 space-y-2 text-lg">
          {description.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div
      className={`w-full md:w-3/4 mb-8 p-4 border-${theme === "light" ? "light-mode" : "dark-mode"} border-2 rounded-lg text-${theme === "light" ? "dark-mode" : "light-mode"} m-4 font-raleway shadow-lg`}
    >
      <h2 className="text-2xl font-bold mb-1 font-jost">{title}</h2>
      <h3 className="text-xl font-semibold mb-1 font-jost">{company}</h3>
      <p className="text-sm italic mb-2 font-monospace">
        {location} | {dateRange}
      </p>
      <ul className="list-disc pl-5 space-y-2">
        {description.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

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
      {experiences.map((experience, index) => (
        <ExperienceCard key={index} {...experience} />
      ))}
    </div>
  );
};

export default Experience;
