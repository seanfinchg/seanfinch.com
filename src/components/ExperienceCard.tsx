import React from "react";
import { useTheme } from "../contexts/themeContext";
import { ExperienceProps } from "../data/experiences";
import { getCardClasses, getFeaturedCardClasses } from "../utils/themeUtils";

interface ExperienceCardProps extends ExperienceProps {
  featured?: boolean;
  hideContent?: boolean;
  badgeLabel?: string;
}

const MONTH_MAP: Record<string, number> = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
  jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
};

const parseMonthYear = (s: string): Date => {
  const parts = s.trim().split(/\s+/);
  const month = MONTH_MAP[parts[0].toLowerCase().slice(0, 3)] ?? 0;
  return new Date(parseInt(parts[1]), month, 1);
};

const isCurrentlyActive = (dateRange: string): boolean => {
  const parts = dateRange.split(/\s*[–—]\s*/);
  if (parts.length < 2) return false;
  const [startStr, endStr] = parts;
  const now = new Date();
  const start = parseMonthYear(startStr);
  const isPresent = endStr.trim().toLowerCase() === "present";
  const endBase = isPresent ? now : parseMonthYear(endStr);
  const end = new Date(endBase.getFullYear(), endBase.getMonth() + 1, 0);
  return now >= start && now <= end;
};

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  title,
  company,
  logo,
  companyUrl,
  location,
  description,
  dateRange,
  featured = false,
  hideContent = false,
  badgeLabel,
}) => {
  const { theme } = useTheme();

  const isActive = isCurrentlyActive(dateRange);

  const cardContent = (
    <div className="w-full mb-4 font-raleway">
      <div className="flex items-center justify-between mb-1 gap-4">
        <a
          href={companyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          aria-label={`${company} website`}
        >
          {logo && (
            <img
              src={logo}
              alt={`${company} logo`}
              className="w-16 h-16 object-contain rounded"
            />
          )}
          <h3 className="text-2xl font-semibold font-jost">{company}</h3>
        </a>
      </div>
      <div className="flex items-start justify-between mb-1 gap-4">
        <h2 className="text-2xl font-bold font-jost">{title}</h2>
        <div className="flex items-center gap-2 shrink-0">
          {isActive && (
            <span className="flex items-center gap-1.5 text-xs font-monospace text-green-600 dark:text-green-400 whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-green-500 dark:bg-green-400 animate-pulse-dot inline-block" />
              Active
            </span>
          )}
          {hideContent && (
            <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded font-monospace text-sm font-bold transition-colors whitespace-nowrap">
              Details →
            </button>
          )}
        </div>
      </div>
      <p className="text-sm italic mb-3 font-monospace">
        {location} | {dateRange}
      </p>
      {!hideContent && (
        <ul className="list-disc pl-5 space-y-2 text-base leading-relaxed">
          {description.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );

  const hoverClasses =
    "transition-all duration-200 hover:-translate-y-1 hover:shadow-xl";

  const regularClasses = `w-full md:w-1/2 mb-8 p-4 rounded-lg shadow-lg border-2 ${getCardClasses(theme)} ${hoverClasses}`;

  const featuredClasses = `relative w-full md:w-1/2 mb-8 p-4 rounded-lg shadow-2xl border-4 ${getFeaturedCardClasses(theme)} font-raleway ${hoverClasses} cursor-pointer`;

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
