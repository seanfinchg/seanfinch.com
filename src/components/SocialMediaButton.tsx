import React from "react";
import { useTheme } from "../contexts/themeContext";
import { getUltraThemeClasses } from "../utils/themeUtils";

interface SocialMediaButtonProps {
  url: string;
  children: React.ReactNode;
  className?: string;
}

const SocialMediaButton: React.FC<SocialMediaButtonProps> = ({
  url,
  children,
  className = "",
}) => {
  const { theme } = useTheme();
  const buttonClass = `flex justify-center mx-2 my-1 px-4 py-2 text-base font-jost font-medium border border-transparent rounded-lg hover:border-indigo-600 cursor-pointer transition-colors duration-200 ${getUltraThemeClasses(
    theme,
  )} ${className}`;

  const openLinkInNewTab = () => {
    window.open(url, "_blank");
  };

  return (
    <button className={buttonClass} onClick={openLinkInNewTab}>
      {children}
    </button>
  );
};

export default SocialMediaButton;
