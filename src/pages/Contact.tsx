import { useEffect } from "react";
import { useTheme } from "../contexts/themeContext";
import { FaLinkedin, FaEnvelope } from "react-icons/fa";

function Contact() {
  const { theme } = useTheme();

  useEffect(() => {
    document.title = "Contact - Sean Finch • SoCal";
  }, []);

  const openLinkInNewTab = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div
      className={`flex justify-center ${theme === "light" ? "bg-light-mode text-ultra-dark-mode" : "bg-dark-mode text-light-mode"}`}
    >
      <div className="w-full mx-4 md:mx-0">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl font-bold mb-8 font-jost">Contact Me</h1>
          <p className="mb-4">
            I'd love to hear from you! Here's how you can reach me:
          </p>
          <div
            className={`w-full md:w-1/2 mb-8 p-4 border-${theme === "light" ? "border-ultra-light-mode" : "border-ultra-dark-mode"} border-2 rounded-lg text-${theme === "light" ? "text-ultra-light-mode" : "text-ultra-dark-mode"} m-4 font-raleway shadow-lg`}
          >
            <div className="mb-4 flex flex-col items-center">
              <h2 className="text-2xl font-bold mb-2 font-jost">Email</h2>
              <button
                onClick={() => openLinkInNewTab("mailto:contact@seanfinch.com")}
                className={`flex items-center justify-center mx-2 my-1 px-4 py-2 text-base font-jost font-medium border border-transparent rounded-lg hover:border-indigo-600 cursor-pointer transition-colors duration-200 ${
                  theme === "light"
                    ? "bg-ultra-light-mode text-ultra-dark-mode"
                    : "bg-ultra-dark-mode text-light-mode"
                }`}
              >
                <FaEnvelope size={25} className="mr-2" />
                contact@seanfinch.com
              </button>
            </div>
            <div className="flex flex-col items-center">
              <h2 className="text-2xl font-bold mb-2 font-jost">LinkedIn</h2>
              <button
                onClick={() =>
                  openLinkInNewTab("https://www.linkedin.com/in/sean-finch-g")
                }
                className={`flex items-center justify-center mx-2 my-1 px-4 py-2 text-base font-jost font-medium border border-transparent rounded-lg cursor-pointer transition-colors duration-200 ${
                  theme === "light"
                    ? "bg-linkedin text-light-mode hover:border-ultra-dark-mode"
                    : "bg-linkedin text-light-mode hover:border-ultra-light-mode"
                }`}
              >
                <FaLinkedin size={25} className="mr-2" />
                LinkedIn
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
