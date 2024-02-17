import { useEffect } from "react";
import { useTheme } from "../contexts/themeContext";

function Contact() {
  const { theme } = useTheme();

  useEffect(() => {
    document.title = "Contact - Sean Finch • SoCal";
  }, []);

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
            <div className="mb-4">
              <h2 className="text-2xl font-bold mb-2 font-jost">Email</h2>
              <a
                href="mailto:contact@seanfinch.com"
                className="text-blue-500 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                contact@seanfinch.com
              </a>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2 font-jost">LinkedIn</h2>
              <a
                href="https://www.linkedin.com/in/sean-finch-21803927b/"
                className="text-blue-500 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit my LinkedIn profile
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
