import { useEffect } from "react";
import { useTheme } from "../contexts/themeContext";
import SocialMediaButton from "../components/SocialMediaButton";
import { getThemeClasses } from "../utils/themeUtils";

const skillGroups = [
  {
    label: "Cybersecurity",
    color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
    items: [
      "Tenable Nessus",
      "Qualys",
      "OpenVAS",
      "CrowdStrike Falcon",
      "Suricata",
      "Zeek",
      "Elastic SIEM",
      "Kibana",
      "Wazuh",
      "Wireshark",
      "Burp Suite",
      "Ghidra",
      "Metasploit",
      "MITRE ATT&CK",
      "CIS Benchmarks",
      "NIST CSF",
    ],
  },
  {
    label: "Technologies",
    color: "bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300",
    items: [
      "Intune",
      "Entra ID",
      "Active Directory",
      "Git",
      "Tailscale",
      "Zscaler",
      "Linux",
      "Proxmox",
      "TrueNAS SCALE",
      "Kubernetes",
      "Docker",
      "Nginx",
      "Caddy",
      "JUnit",
      "React.js",
      "Node.js",
      "Express.js",
    ],
  },
  {
    label: "Languages",
    color:
      "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300",
    items: [
      "Python",
      "Java",
      "Kotlin",
      "TypeScript",
      "JavaScript",
      "HTML",
      "CSS",
      "Bash",
      "PowerShell",
      "C/C++",
      "x86 Assembly",
      "SQL",
    ],
  },
];

const apoRoles = [
  {
    role: "Service Committee Member",
    period: "Fall 2025 – Spring 2026",
    active: false,
  },
  { role: "Standards Chair", period: "Spring 2026", active: false },
  { role: "President", period: "Fall 2026 →", active: true },
];

const nucsRoles = [
  { role: "Vice President", period: "Spring 2025", active: false },
  { role: "President", period: "Fall 2025 – Spring 2026", active: false },
];

const About: React.FC = () => {
  const { theme } = useTheme();

  useEffect(() => {
    document.title = "About - Sean Finch • SoCal";
  }, []);

  return (
    <div className={`flex justify-center ${getThemeClasses(theme)}`}>
      <div className="w-full mx-4 md:mx-0">
        <div className="flex flex-col items-center text-center mt-16">
          <h1 className="text-4xl font-bold mb-6 font-jost">About Me</h1>
          <div className="flex justify-center flex-wrap mb-6">
            <SocialMediaButton url="/resume.pdf" className="mb-4 md:mb-0">
              Resume
            </SocialMediaButton>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center md:space-x-8 md:items-start px-4">
            <img
              src="/SeanPortrait.jpg"
              alt="Sean Finch Portrait"
              className="w-3/4 md:w-80 h-full md:h-auto object-cover mb-8 md:mb-0 rounded-xl shadow-lg"
            />
            <div
              className={`w-full md:w-1/2 mb-8 p-5 border-2 rounded-lg font-raleway shadow-lg text-left
                ${theme === "light" ? "border-ultra-light-mode" : "border-ultra-dark-mode"}`}
            >
              <p className="mb-4">
                I'm Sean Finch, from Orange County, California, and am pursuing
                a B.S. in Cybersecurity with a Music Minor at Northeastern
                University. I blend technical expertise with creative
                problem-solving to make a tangible impact in cybersecurity and
                IT.
              </p>
              <p className="mb-4">
                I'm currently a Systems Engineer Intern at Neuralink, where I'm
                helping build core security operations capabilities from the
                ground up. Current focus areas include endpoint security, access
                control for managed devices, Linux MDM adoption, Defender XDR
                rollout, early SIEM implementation, and creating a structured
                internal security knowledge base.
              </p>
              <p className="mb-4">
                Previously, I worked as an IT Operations Co-op (Security
                Operations) at Audax Group and as a Cybersecurity Intern at
                CENIC, supporting vulnerability management, endpoint hardening,
                and network defense workflows. I'm also an incoming Enterprise
                Security Engineer Intern at Palo Alto Networks.
              </p>
              <p className="mb-4">
                In my homelab, I run a virtualized environment with TrueNAS
                SCALE, experimenting with platforms and honing my skills in
                system administration and infrastructure optimization.
              </p>
              <p className="mb-4">
                Beyond tech, I'm deeply involved in music and service
                leadership. I served as Vice President of Northeastern
                University Choral Society (NUCS) in Spring 2025 and served as
                President from Fall 2025 through Spring 2026. In Alpha Phi
                Omega, I served on the Service Committee (Fall 2025 - Spring
                2026), served as Standards Chair (Spring 2026), and will serve
                as President in Fall 2026. I'm also a vocalist and outdoor
                enthusiast.
              </p>

              <div className="mt-4">
                <h2 className="text-2xl font-bold mb-4 font-jost">
                  Technical Skills
                </h2>
                <div className="space-y-4">
                  {skillGroups.map(({ label, color, items }) => (
                    <div key={label}>
                      <p className="text-xs font-bold font-monospace uppercase tracking-wider mb-2 text-muted-foreground">
                        {label}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {items.map((item) => (
                          <span
                            key={item}
                            className={`inline-block px-2.5 py-1 rounded text-xs font-monospace font-semibold
                              transition-opacity duration-150 hover:opacity-75 ${color}`}
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* OS / Homelab strip */}
          <div className="w-full max-w-3xl mx-auto px-4 mb-2">
            <div
              className={`flex flex-wrap items-center gap-2 justify-center py-4 border-y
              ${theme === "light" ? "border-neutral-200" : "border-neutral-800"}`}
            >
              <span className="text-[10px] font-monospace text-muted-foreground uppercase tracking-widest w-full text-center mb-1">
                sys env
              </span>
              {[
                "Win XP",
                "Win 7",
                "Win 10/11",
                "Win Server 2012",
                "Win Server 2016",
                "Ubuntu",
                "Debian",
                "Linux Mint",
                "CentOS",
                "Fedora",
                "Proxmox VE",
                "TrueNAS SCALE",
                "macOS",
              ].map((os) => (
                <span
                  key={os}
                  className={`px-2 py-0.5 text-[11px] font-monospace rounded border transition-colors duration-150
                    ${
                      theme === "light"
                        ? "bg-neutral-100 border-neutral-300 text-neutral-600 hover:bg-neutral-200 hover:border-neutral-400"
                        : "bg-neutral-800 border-neutral-600 text-neutral-300 hover:bg-neutral-700 hover:border-neutral-500"
                    }`}
                >
                  {os}
                </span>
              ))}
            </div>
          </div>

          {/* Leadership — vertical timeline */}
          <div className="w-full max-w-2xl mx-auto px-4 mt-8 mb-16 text-left">
            <div className="relative mb-8">
              <h2 className="text-3xl font-bold font-jost">Leadership</h2>
              <div className="absolute -bottom-1 left-0 h-0.5 w-24 bg-gradient-to-r from-blue-500 to-transparent" />
            </div>
            <div className="relative">
              <div className="absolute left-[1.1rem] top-3 bottom-3 w-px bg-gradient-to-b from-blue-500/70 via-purple-400/50 to-transparent" />

              {/* APO */}
              <div className="relative pl-14 mb-10">
                <div className="absolute left-2 top-1 w-6 h-6 rounded-full bg-blue-600 border-2 border-blue-400/50 flex items-center justify-center text-white text-[11px] font-bold z-10 shadow-md">
                  A
                </div>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                  <h3 className="text-xl font-bold font-jost">
                    Alpha Phi Omega
                  </h3>
                  <span className="text-[11px] font-monospace px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30">
                    Incoming President
                  </span>
                </div>
                <p className="text-sm font-raleway text-muted-foreground mb-3">
                  National co-ed service fraternity — chapter leadership at
                  Northeastern.
                </p>
                <div className="space-y-2">
                  {apoRoles.map(({ role, period, active }) => (
                    <div key={role} className="flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground shrink-0">↳</span>
                      <span
                        className={`font-monospace ${active ? "font-semibold" : "text-muted-foreground"}`}
                      >
                        {role}
                      </span>
                      <span className="ml-auto text-xs font-monospace text-muted-foreground flex items-center gap-1.5 shrink-0">
                        {active && (
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse-dot inline-block" />
                        )}
                        {period}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* NUCS */}
              <div className="relative pl-14">
                <div className="absolute left-2 top-1 w-6 h-6 rounded-full bg-purple-600 border-2 border-purple-400/50 flex items-center justify-center text-white text-[11px] font-bold z-10 shadow-md">
                  N
                </div>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                  <h3 className="text-xl font-bold font-jost">
                    NU Choral Society
                  </h3>
                  <span className="text-[11px] font-monospace px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/30">
                    Past President
                  </span>
                </div>
                <p className="text-sm font-raleway text-muted-foreground mb-3">
                  Northeastern University Choral Society — vocal performance and
                  leadership.
                </p>
                <div className="space-y-2">
                  {nucsRoles.map(({ role, period }) => (
                    <div key={role} className="flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground shrink-0">↳</span>
                      <span className="font-monospace text-muted-foreground">
                        {role}
                      </span>
                      <span className="ml-auto text-xs font-monospace text-muted-foreground shrink-0">
                        {period}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
