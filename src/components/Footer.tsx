import { useTheme } from "../contexts/themeContext";

const Footer: React.FC = () => {
  const { theme } = useTheme();
  const openLinkInNewTab = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <footer
      className={`relative bottom-0 py-4 w-full text-center ${theme === "light" ? "bg-light-mode text-dark-mode" : "bg-dark-mode text-light-mode"}`}
    >
      <p>
        <span
          className="font-medium text-indigo-500 hover:text-indigo-600"
          onClick={() => openLinkInNewTab("https://seanfinch.com")}
        >
          seanfinch.com
        </span>{" "}
        • Website coded with help from{" "}
        <span
          className="font-medium text-indigo-500 hover:text-indigo-600"
          onClick={() => openLinkInNewTab("https://asahoo.dev")}
        >
          asahoo.dev
        </span>
      </p>
      <p>
        <a
          className="font-medium text-indigo-500 hover:text-indigo-600"
          href="mailto:hello@seanfinch.com"
        >
          hello@seanfinch.com
        </a>
      </p>
    </footer>
  );
};

export default Footer;
