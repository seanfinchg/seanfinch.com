import React from "react";
import { useTheme } from "../contexts/themeContext";

const Footer: React.FC = () => {
  const { theme } = useTheme();

  const openLinkInNewTab = (url: string) => {
    window.open(url, "_blank");
  };

  const getLinkElement = (url: string, text: string) => (
    <span
      className="font-medium text-indigo-500 hover:text-indigo-600"
      onClick={() => openLinkInNewTab(url)}
    >
      {text}
    </span>
  );

  return (
    <footer
      className={`relative bottom-0 py-4 w-full text-center items-center ${theme === "light" ? "bg-light-mode text-dark-mode" : "bg-dark-mode text-light-mode"}`}
    >
      <p>
        {getLinkElement("https://seanfinch.com", "seanfinch.com")} • Website
        coded with help from{" "}
        {getLinkElement("https://asahoo.dev", "asahoo.dev")}
        <a href="https://www.buymeacoffee.com/seanfinch">
        <img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee!&emoji=☕&slug=seanfinch&button_colour=FF5F5F&font_colour=ffffff&font_family=Poppins&outline_colour=000000&coffee_colour=FFDD00" width="200" height="auto" /></a>
      </p>
    </footer>
  );
};

export default Footer;
