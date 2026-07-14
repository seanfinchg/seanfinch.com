import React, { useEffect } from "react";
import { useTheme } from "../contexts/themeContext";
import { FaLinkedin, FaEnvelope } from "react-icons/fa";
import { getThemeClasses } from "../utils/themeUtils";

const Contact: React.FC = () => {
  const { theme } = useTheme();

  useEffect(() => {
    document.title = "Contact - Sean Finch";
  }, []);

  // Assembled at click time — never a plain harvestable string in the DOM
  const openEmail = (): void => {
    const addr = ["contact", "seanfinch", "com"].join("@").replace("@seanfinch@", "@seanfinch.");
    window.location.href = "mailto:" + addr;
  };
  const openLinkedIn = (): void => {
    window.open("https://www." + "linkedin" + ".com/in/" + "sean-finch-g", "_blank");
  };

  const cardBase = `flex-1 group flex flex-col items-center p-8 rounded-2xl border backdrop-blur-sm
    cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl`;

  const cardLight =
    "border-slate-200 bg-white/50 hover:border-sky-300 hover:shadow-sky-100/60";
  const cardDark =
    "border-white/10 bg-white/[0.04] hover:border-sky-500/40 hover:shadow-sky-900/20";

  return (
    <div className={`flex justify-center ${getThemeClasses(theme)}`}>
      <div className="w-full max-w-lg mx-auto px-6">
        <div className="flex flex-col items-center text-center mt-20 pb-24">
          <p className="font-monospace text-xs tracking-[0.4em] uppercase text-muted-foreground mb-4">
            Get in touch
          </p>
          <h1 className="text-5xl font-extrabold mb-4 font-jost">Contact</h1>
          <p className="mb-12 text-muted-foreground font-raleway max-w-xs">
            Reach me directly — I check both regularly.
          </p>

          <div className="w-full flex flex-col sm:flex-row gap-4">
            <button
              onClick={openEmail}
              className={`${cardBase} ${theme === "light" ? cardLight : cardDark}`}
            >
              <FaEnvelope
                size={28}
                className="mb-4 text-sky-500 group-hover:scale-110 transition-transform duration-200"
              />
              <span className="font-monospace text-[10px] font-bold tracking-[0.3em] uppercase text-muted-foreground mb-2">
                Email
              </span>
              <span className="font-monospace text-sm text-center leading-relaxed">
                contact [at] seanfinch [dot] com
              </span>
            </button>

            <button
              onClick={openLinkedIn}
              className={`${cardBase} ${theme === "light" ? cardLight : cardDark}`}
            >
              <FaLinkedin
                size={28}
                className="mb-4 text-[#0077b5] group-hover:scale-110 transition-transform duration-200"
              />
              <span className="font-monospace text-[10px] font-bold tracking-[0.3em] uppercase text-muted-foreground mb-2">
                LinkedIn
              </span>
              <span className="font-monospace text-sm text-center leading-relaxed">
                linkedin [dot] com/in/sean-finch-g
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
