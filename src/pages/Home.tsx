import { useEffect, type ReactNode } from "react";
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

  useEffect(() => {
    document.title = "Home - Sean Finch";
  }, []);

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
            Seeking New-Grad Cybersecurity Roles Starting Summer 2027
          </p>
          <p className="relative mb-1 mx-4 font-raleway font-bold text-muted-foreground">
            B.S. Cybersecurity | Music Minor
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
          {/* Windows Vista Aero terminal widget */}
          <div className="w-full flex justify-center px-4 mb-8">
            <div
              className="w-full max-w-xl font-monospace text-sm shadow-2xl shadow-black/70 overflow-hidden rounded-lg"
              style={{
                border: "1px solid rgba(80,110,200,0.55)",
                outline: "1px solid rgba(20,40,120,0.4)",
              }}
            >
              {/* Vista Aero title bar */}
              <div
                className="relative flex items-center justify-between px-2 py-1.5 overflow-hidden"
                style={{
                  background:
                    "linear-gradient(180deg,rgba(72,100,210,0.88) 0%,rgba(28,52,168,0.95) 45%,rgba(14,34,130,0.98) 100%)",
                }}
              >
                {/* glass gleam */}
                <div
                  className="absolute top-0 left-6 right-6 h-[45%] pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse at 50% -10%,rgba(160,195,255,0.38) 0%,transparent 70%)",
                  }}
                />
                <div className="flex items-center gap-1.5 overflow-hidden min-w-0 relative">
                  <div className="shrink-0 w-4 h-4 bg-[#0c0c0c] text-[6px] text-[#aaa] flex items-center justify-center leading-none select-none rounded-[1px]">
                    C:\
                  </div>
                  <span
                    className="text-white text-xs font-semibold truncate select-none tracking-wide"
                    style={{
                      fontFamily: "'Segoe UI',system-ui,sans-serif",
                      textShadow: "0 1px 2px rgba(0,0,0,0.7)",
                    }}
                  >
                    Command Prompt — C:\Users\seanf
                  </span>
                </div>
                <div className="flex items-center gap-[3px] shrink-0 ml-2 relative">
                  {(
                    [
                      {
                        label: "−",
                        bg: "linear-gradient(180deg,rgba(100,140,240,0.9) 0%,rgba(40,70,190,0.95) 100%)",
                        border: "rgba(30,60,170,0.8)",
                        w: "w-[20px]",
                      },
                      {
                        label: "□",
                        bg: "linear-gradient(180deg,rgba(100,140,240,0.9) 0%,rgba(40,70,190,0.95) 100%)",
                        border: "rgba(30,60,170,0.8)",
                        w: "w-[20px]",
                      },
                      {
                        label: "×",
                        bg: "linear-gradient(180deg,rgba(220,70,70,0.95) 0%,rgba(170,20,20,0.98) 100%)",
                        border: "rgba(130,10,10,0.8)",
                        w: "w-[24px]",
                      },
                    ] as const
                  ).map(({ label, bg, border, w }) => (
                    <span
                      key={label}
                      className={`${w} h-[16px] text-white text-[11px] font-bold flex items-center justify-center select-none rounded-[2px]`}
                      style={{
                        background: bg,
                        border: `1px solid ${border}`,
                        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.25)",
                      }}
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>
              {/* Vista menu bar */}
              <div
                className="flex items-center px-1 gap-0.5 text-[11px] select-none"
                style={{
                  background: "rgba(10,16,60,0.96)",
                  borderBottom: "1px solid rgba(50,70,160,0.4)",
                }}
              >
                {["File", "Edit", "View", "Favorites", "Help"].map((m) => (
                  <span
                    key={m}
                    className="px-2.5 py-0.5 text-[#c8d4f4] hover:bg-white/10 rounded-sm cursor-default transition-colors"
                  >
                    {m}
                  </span>
                ))}
              </div>
              {/* CMD body */}
              <div
                className="p-3 space-y-1 text-[12.5px] leading-relaxed"
                style={{ background: "#0c0c0c", color: "#cccccc" }}
              >
                <p style={{ color: "#888" }}>
                  Microsoft Windows [Version 6.0.6002]
                </p>
                <p className="mb-2" style={{ color: "#888" }}>
                  Copyright (c) 2006 Microsoft Corporation. All rights reserved.
                </p>
                <p>
                  <span style={{ color: "#8bb4f8" }}>
                    C:\Users\seanf<span style={{ color: "#6888cc" }}>&gt;</span>
                  </span>{" "}
                  <span style={{ color: "#fff" }}>whoami</span>
                </p>
                <p style={{ color: "#a8c8f0" }}>
                  sean_finch · systems engineer intern · student · homelabber
                </p>
                <p>
                  <span style={{ color: "#8bb4f8" }}>
                    C:\Users\seanf<span style={{ color: "#6888cc" }}>&gt;</span>
                  </span>{" "}
                  <span style={{ color: "#fff" }}>type</span>{" "}
                  <span style={{ color: "#98d898" }}>os-history.txt</span>
                </p>
                <div className="flex flex-wrap gap-x-3 gap-y-0.5 pl-0">
                  {(
                    [
                      { label: "Win XP", color: "#6fa8f8" },
                      { label: "Win 7", color: "#6fa8f8" },
                      { label: "Win 10/11", color: "#6fa8f8" },
                      { label: "Win Server 2012", color: "#6fa8f8" },
                      { label: "Win Server 2016", color: "#6fa8f8" },
                      { label: "Ubuntu", color: "#f0a060" },
                      { label: "Debian", color: "#f0a060" },
                      { label: "Linux Mint", color: "#f0a060" },
                      { label: "CentOS", color: "#f0a060" },
                      { label: "Fedora", color: "#f0a060" },
                      { label: "Proxmox VE", color: "#f0e060" },
                      { label: "TrueNAS SCALE", color: "#60d0f0" },
                      { label: "macOS", color: "#c090e8" },
                    ] as const
                  ).map(({ label, color }) => (
                    <span key={label} style={{ color }}>
                      {label}
                    </span>
                  ))}
                </div>
                <p>
                  <span style={{ color: "#8bb4f8" }}>
                    C:\Users\seanf<span style={{ color: "#6888cc" }}>&gt;</span>
                  </span>{" "}
                  <span style={{ color: "#fff" }}>ping</span>{" "}
                  <span style={{ color: "#98d898" }}>seanfinch.com</span>
                </p>
                <p style={{ color: "#a8c8f0" }}>Reply from 104.21.8.12: bytes=32 time=12ms TTL=55</p>
                <p style={{ color: "#a8c8f0" }}>Reply from 104.21.8.12: bytes=32 time=11ms TTL=55</p>
                <p><span style={{ color: "#98d898" }}>Packets: Sent=2, Received=2, Lost=0</span><span style={{ color: "#a8c8f0" }}> (0% loss)</span></p>
                <p>
                  <span style={{ color: "#8bb4f8" }}>
                    C:\Users\seanf<span style={{ color: "#6888cc" }}>&gt;</span>
                  </span>
                  <span
                    className="animate-cursor-blink ml-0.5"
                    style={{ color: "#fff" }}
                  >
                    █
                  </span>
                </p>
              </div>
            </div>
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
                  src="/pfp.webp"
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
