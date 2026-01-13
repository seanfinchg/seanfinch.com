import React from "react";
import { useTheme } from "../contexts/themeContext";
import { ExperienceProps } from "../data/experiences";

interface ExperienceCardProps extends ExperienceProps {
  featured?: boolean;
  hideContent?: boolean;
  badgeLabel?: string;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  title,
  company,
  location,
  description,
  dateRange,
  featured = false,
  hideContent = false,
  badgeLabel,
}) => {
  const { theme } = useTheme();

  const cardContent = (
    <div className="w-full mb-4 font-raleway">
      <div className="flex items-start justify-between mb-1 gap-4">
        <h3 className="text-2xl font-semibold font-jost">{company}</h3>
        {hideContent && (
          <button className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded font-monospace text-base font-bold transition-colors whitespace-nowrap">
            Click for details
          </button>
        )}
      </div>
      <div className="flex items-start justify-between mb-1 gap-4">
        <h2 className="text-2xl font-bold font-jost">{title}</h2>
      </div>
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

  const regularClasses = `w-full md:w-1/2 mb-8 p-4 rounded-lg shadow-lg border-2 ${
    theme === "light"
      ? "border-dark-mode text-dark-mode bg-light-mode"
      : "border-light-mode text-light-mode bg-dark-mode"
  }`;

  const featuredClasses = `relative w-full md:w-1/2 mb-8 p-4 rounded-lg shadow-2xl border-4 ${
    theme === "light"
      ? "border-blue-500 bg-blue-50 text-dark-mode font-raleway"
      : "border-blue-400 bg-blue-900/20 text-light-mode font-raleway"
  }`;

  const wrapperClasses = featured ? featuredClasses : regularClasses;

  return (
    <div className={wrapperClasses}>
      {featured && (
        <div className="absolute -top-4 left-4 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold font-monospace">
          ⭐ {badgeLabel || title}
        </div>
      )}
      <div className={featured ? "pt-4" : ""}>{cardContent}</div>
    </div>
  );
};

export default ExperienceCard;
