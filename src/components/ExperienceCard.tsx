import React from "react";
import { useTheme } from "../contexts/themeContext";
import { ExperienceProps } from "../data/experiences";
import FeaturedCard from "./FeaturedCard";

const ExperienceCard: React.FC<ExperienceProps & { featured?: boolean }> = ({
  title,
  company,
  location,
  description,
  dateRange,
  featured = false,
}) => {
  const { theme } = useTheme();

  const cardContent = (
    <div className="w-full md:w-3/4 mb-8 p-4 font-raleway">
      <h2 className="text-2xl font-bold mb-1 font-jost">{title}</h2>
      <h3 className="text-xl font-semibold mb-1 font-jost">{company}</h3>
      <p className="text-sm italic mb-2 font-monospace">
        {location} | {dateRange}
      </p>
      <ul className="list-disc pl-5 space-y-2">
        {description.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );

  return featured ? (
    <FeaturedCard type="experience" label="UPCOMING ROLE">
      {cardContent}
    </FeaturedCard>
  ) : (
    <div
      className={`border-2 rounded-lg shadow-lg ${
        theme === "light"
          ? "border-light-mode text-dark-mode"
          : "border-dark-mode text-light-mode"
      }`}
    >
      {cardContent}
    </div>
  );
};

export default ExperienceCard;
