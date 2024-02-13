import "../index.css";

const Footer: React.FC = () => {
  const openLinkInNewTab = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <footer className="fixed bottom-0 mb-4 w-full text-center text-white">
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
