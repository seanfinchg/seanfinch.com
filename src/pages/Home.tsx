import { type ReactNode } from "react";
import { usePageMeta } from "../hooks/usePageMeta";
import { useTheme } from "../contexts/themeContext";
import { useNavigate } from "react-router-dom";
import {
  FaGithub,
  // FaInstagram,
  // FaReddit,
  FaLinkedin,
  // FaSpotify,
  // FaYoutube,
} from "react-icons/fa";
import { experiences } from "../data/experiences";
import { getCurrentExperience, hasActiveExperience } from "../utils/experienceUtils";
import { projects } from "../data/projects";
import ExperienceCard from "../components/ExperienceCard";
import ProjectCard from "../components/ProjectCard";
import SocialMediaButton from "../components/SocialMediaButton";
import { getThemeClasses } from "../utils/themeUtils";

interface SocialMediaLink {
  url: string;
  icon: ReactNode;
}

const socialMediaLinks: SocialMediaLink[] = [
  { url: "https://github.com/seanfinchg", icon: <FaGithub size={30} /> },
  {
    url: "https://www.linkedin.com/in/sean-finch-g",
    icon: <FaLinkedin size={30} />,
  },
];

const Home: React.FC = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const currentRole = getCurrentExperience();
  const isActive = hasActiveExperience();

  usePageMeta(
    "Home",
    "Incoming Security Engineer at Palo Alto Networks, previously Neuralink. B.S. Computer Science at Northeastern University (Class of 2027) — security engineering, homelab, music, and photography.",
  );

  return (
    <div className={`flex justify-center ${getThemeClasses(theme)}`}>
      <div className="w-full">
        <div className="relative flex flex-col items-center text-center pt-20 pb-8 px-4 overflow-hidden">
          <div
            className="absolute inset-0 dot-grid-bg text-gray-200 dark:text-gray-700 opacity-50 pointer-events-none"
            aria-hidden="true"
          />
          <p className="relative animate-fade-up mb-4 text-6xl md:text-7xl font-jost font-extrabold bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent animate-gradient">
            Sean Finch
          </p>
          {currentRole && (
            <div
              className={`relative animate-fade-up mb-5 flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-monospace ${
                isActive
                  ? "border-green-400/40 bg-green-500/10 text-green-600 dark:text-green-400"
                  : "border-sky-400/40 bg-sky-500/10 text-sky-600 dark:text-sky-400"
              }`}
            >
              {isActive && (
                <span className="w-2 h-2 rounded-full bg-green-500 dark:bg-green-400 animate-pulse-dot inline-block" />
              )}
              {isActive ? "Currently at" : "Most recently at"} {currentRole.company} · {currentRole.title}
            </div>
          )}
          <p className="relative mb-2 mx-4 text-base font-raleway font-bold">
            Incoming Security Engineer at Palo Alto Networks · July 2027
          </p>
          <p className="relative mb-1 mx-4 font-raleway font-bold text-muted-foreground">
            B.S. Computer Science | Music Minor
          </p>
          <p className="relative mb-1 mx-4 font-raleway font-bold text-muted-foreground">
            Northeastern University | Class of 2027
          </p>
          <p className="relative mb-6 mx-4 font-raleway font-bold text-muted-foreground">
            Student · Homelabber · Musician · Photographer
          </p>
        </div>
        <div>
          <div className="flex justify-center flex-wrap">
            {socialMediaLinks.map((link, index) => (
              <SocialMediaButton key={index} url={link.url}>
                {link.icon}
              </SocialMediaButton>
            ))}
          </div>
          <div className="my-2.5 flex justify-center items-center flex-wrap">
            <SocialMediaButton url="/resume.pdf">Resume</SocialMediaButton>
            {/* <a href="https://www.buymeacoffee.com/seanfinch">
              <img
                src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee!&emoji=☕&slug=seanfinch&button_colour=FF5F5F&font_colour=ffffff&font_family=Poppins&outline_colour=000000&coffee_colour=FFDD00"
                width="200"
                height="auto"
              />
            </a> */}
            {/* <SocialMediaButton url="/music/music_resume.pdf">
              Music Resume
            </SocialMediaButton> */}
          </div>
          {/* About Me card */}
          <div className="w-full flex justify-center px-4 mb-10">
            <div
              onClick={() => { void navigate("/about"); window.scrollTo(0, 0); }}
              className={`group w-full max-w-xl overflow-hidden rounded-2xl border cursor-pointer
                transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl
                ${theme === "light"
                  ? "border-slate-200 bg-white/60 hover:border-sky-300 hover:shadow-sky-100/70"
                  : "border-white/10 bg-white/[0.05] hover:border-sky-500/40 hover:shadow-sky-900/30"}`}
            >
              {/* accent bar */}
              <div className="h-[3px] w-full bg-gradient-to-r from-sky-400 via-indigo-500 to-transparent" />

              <div className="flex items-center gap-5 p-6">
                <img
                  src="/pfp-176.webp"
                  srcSet="/pfp-88.webp 88w, /pfp-176.webp 176w, /pfp-264.webp 264w"
                  sizes="88px"
                  width={88}
                  height={88}
                  decoding="async"
                  alt="Sean Finch"
                  className="w-[88px] h-[88px] rounded-full object-cover shrink-0
                    ring-2 ring-sky-400/40 group-hover:ring-sky-400/80
                    shadow-lg transition-all duration-200"
                />
                <div className="flex-1 min-w-0 text-left">
                  <p className="font-monospace text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-1">
                    About Me
                  </p>
                  <p className="font-jost font-extrabold text-lg leading-tight mb-2">
                    Sean Finch
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-2.5">
                    {["Cybersecurity", "Music", "Homelab", "Photography"].map((tag) => (
                      <span
                        key={tag}
                        className={`text-[10px] font-monospace px-2 py-0.5 rounded-full border
                          ${theme === "light"
                            ? "border-slate-200 bg-slate-100 text-slate-600"
                            : "border-white/10 bg-white/5 text-slate-400"}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="shrink-0 font-monospace text-xs text-sky-500 dark:text-sky-400 group-hover:translate-x-1 transition-transform duration-200">
                  View →
                </span>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col items-center px-4">
            <div className="relative mb-6">
              <h2 className="text-3xl font-bold font-jost">
                Featured Experiences
              </h2>
              <div className="absolute -bottom-1 left-0 h-0.5 w-full bg-gradient-to-r from-sky-400 to-transparent" />
            </div>
            {experiences
              .filter((e) => e.featured)
              .map((exp, i) => (
                <div
                  key={i}
                  className="w-full flex justify-center cursor-pointer"
                  onClick={() => {
                    void navigate("/experience");
                    window.scrollTo(0, 0);
                  }}
                >
                  <ExperienceCard
                    {...exp}
                    featured
                    hideContent
                    badgeLabel="FEATURED ROLE"
                  />
                </div>
              ))}
            <div className="relative mb-6 mt-4">
              <h2 className="text-3xl font-bold font-jost">
                Featured Projects
              </h2>
              <div className="absolute -bottom-1 left-0 h-0.5 w-full bg-gradient-to-r from-green-500 to-transparent" />
            </div>
            {projects
              .filter((p) => p.featured)
              .map((proj, i) => (
                <div
                  key={i}
                  className="w-full flex justify-center cursor-pointer"
                  onClick={() => {
                    void navigate("/projects");
                    window.scrollTo(0, 0);
                  }}
                >
                  <ProjectCard
                    {...proj}
                    featured
                    hideContent
                    badgeLabel="FEATURED PROJECT"
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
