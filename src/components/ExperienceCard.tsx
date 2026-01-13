import React from "react";
import { useTheme } from "../contexts/themeContext";
import { ExperienceProps } from "../data/experiences";
import FeaturedCard from "./FeaturedCard";

interface ExperienceCardProps extends ExperienceProps {
  featured?: boolean;
  hideContent?: boolean;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  title,
  company,
  location,
  description,
  dateRange,
  featured = false,
  hideContent = false,
}) => {
  const { theme } = useTheme();

  const cardContent = (
    <div className="w-full mb-4 font-raleway">
      <h2 className="text-2xl font-bold mb-1 font-jost">{title}</h2>
      <h3 className="text-xl font-semibold mb-1 font-jost">{company}</h3>
      <p className="text-sm italic mb-2 font-monospace">
        {location} | {dateRange}
      </p>
      {!hideContent && (
        <ul className="list-disc pl-5 space-y-2">
          {description.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );

  const baseClasses = `w-full md:w-3/4 mb-8 p-4 rounded-lg shadow-lg border-2 ${
    theme === "light"
      ? "border-light-mode text-dark-mode bg-white"
      : "border-dark-mode text-light-mode bg-gray-900"
  }`;

  return featured ? (
    <FeaturedCard type="experience" label={title} className={baseClasses}>
      {cardContent}
    </FeaturedCard>
  ) : (
    <div className={baseClasses}>{cardContent}</div>
  );
};

export default ExperienceCard;
