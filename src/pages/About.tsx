import { usePageMeta } from "../hooks/usePageMeta";
import { useTheme } from "../contexts/themeContext";
import SocialMediaButton from "../components/SocialMediaButton";
import { getThemeClasses } from "../utils/themeUtils";
import { FaExternalLinkAlt } from "react-icons/fa";

const skillGroups = [
  {
    label: "Security",
    color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
    items: [
      "Microsoft Defender XDR",
      "Microsoft Sentinel",
      "Tenable Nessus",
      "Qualys",
      "OpenVAS",
      "CrowdStrike Falcon",
      "Elastic SIEM",
      "Kibana",
      "Wazuh",
      "Suricata",
      "Zeek",
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
    label: "Identity & Infrastructure",
    color: "bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300",
    items: [
      "Okta",
      "Entra ID",
      "Active Directory",
      "Intune",
      "Terraform",
      "GCP / BigQuery",
      "Kubernetes",
      "Docker",
      "Nginx",
      "Caddy",
      "Zscaler",
      "Tailscale",
      "Proxmox",
      "TrueNAS SCALE",
      "Linux",
      "Git",
    ],
  },
  {
    label: "Languages & Development",
    color:
      "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300",
    items: [
      "Python",
      "Go",
      "Java",
      "Kotlin",
      "TypeScript",
      "JavaScript",
      "React.js",
      "Node.js",
      "Express.js",
      "Django",
      "REST APIs",
      "PowerShell",
      "Bash",
      "SQL",
      "C/C++",
      "x86 Assembly",
      "HTML/CSS",
    ],
  },
];

const interests = [
  "Street Photography",
  "Car Culture",
  "Mountain Biking",
  "Backpacking",
  "Choral Singing",
  "Weight Training",
  "Video Games",
  "Romanian Culture",
];

const apoRoles = [
  {
    role: "Service Committee Member",
    period: "Fall 2025 – Spring 2026",
    active: false,
  },
  { role: "Standards Chair", period: "Spring 2026", active: false },
  { role: "President", period: "Spring 2026 →", active: true },
];

const nucsRoles = [
  { role: "Vice President", period: "Spring 2025", active: false },
  { role: "President", period: "Fall 2025 – Spring 2026", active: false },
];

const About: React.FC = () => {
  const { theme } = useTheme();

  usePageMeta(
    "About",
    "About Sean Finch — Security Engineer Intern at Palo Alto Networks, previously Neuralink. Cybersecurity student, homelabber, musician, and photographer at Northeastern University.",
  );

  return (
    <div className={`flex justify-center ${getThemeClasses(theme)}`}>
      <div className="w-full mx-4 md:mx-0">
        <div className="flex flex-col items-center text-center mt-16">
          <h1 className="text-4xl font-bold mb-4 font-jost">About Me</h1>
          <div className="flex flex-wrap justify-center gap-2 mb-5">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-400/40 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-sm font-monospace">
              B.S. Cybersecurity · Music Minor · Anticipated May 2027
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-400/40 bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-monospace">
              <span className="w-2 h-2 rounded-full bg-green-500 dark:bg-green-400 animate-pulse-dot inline-block" />
              Open to new-grad security roles
            </span>
          </div>
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
              className={`w-full md:w-1/2 mb-8 p-5 border rounded-xl font-raleway shadow-lg text-left backdrop-blur-sm
                ${
                  theme === "light"
                    ? "border-slate-200 bg-white/50"
                    : "border-white/10 bg-white/[0.04]"
                }`}
            >
              <p className="mb-4">
                I'm Sean Finch — from Orange County, California, and pursuing a
                B.S. in Cybersecurity with a Music Minor at Northeastern
                University. I'm graduating in May 2027 and{" "}
                <span className="font-bold">
                  actively seeking new-grad cybersecurity roles
                </span>
                .
              </p>
              <p className="mb-4">
                I'm a Security Engineer Intern at Palo Alto Networks, where I
                built Application Control Posture Check — an internal DAST tool
                that cut compliance reviews from three hours to a five-minute
                automated scan across 16 GRC controls. I architected its RBAC
                system and shipped both ends of the risk dashboard data flow,
                giving the CISO and Board live visibility into security posture
                and control drift.
              </p>
              <p className="mb-4">
                Before that, at Neuralink, I helped stand up the company's first
                security function — leading a Defender XDR and Sentinel rollout
                across 500+ endpoints and overhauling endpoint, identity, and
                cloud baselines during a period of rapid growth, work that
                earned executive buy-in for a dedicated security team. Earlier I
                led endpoint security and vulnerability management at Audax
                Group, and handled DDoS defense at CENIC for the CalREN network
                serving 20M+ students and educators across California.
              </p>
              <p className="mb-4">
                I learn fast because I dig into how something actually works
                instead of relying on the playbook, and I'll say when something
                is broken or risky even when that isn't the popular answer.
                That's let me move across security engineering, SecOps,
                vulnerability management, and identity without losing speed.
              </p>
              <p className="mb-4">
                Outside of work, I run a production-grade homelab on TrueNAS
                SCALE, Proxmox, and Kubernetes — self-hosting 15+ services for
                10+ users, with Wazuh for logging and alerting and OpenVAS for
                continuous scanning. It's where most of what I know about
                systems administration started.
              </p>
              <p className="mb-4">
                I'm also deeply involved in music and service leadership. I'm
                President of Alpha Phi Omega, a 130+ member co-ed community
                service fraternity, and I'm past President of the Northeastern
                University Choral Society, an 80+ member choir across three
                ensembles. Beyond that I'm a vocalist, street photographer, and
                outdoor enthusiast.
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

          {/* Interests strip */}
          <div className="w-full max-w-3xl mx-auto px-4 mb-2">
            <div
              className={`flex flex-wrap items-center gap-2 justify-center py-4 border-b
              ${theme === "light" ? "border-neutral-200" : "border-neutral-800"}`}
            >
              <span className="text-[10px] font-monospace text-muted-foreground uppercase tracking-widest w-full text-center mb-1">
                off the clock
              </span>
              {interests.map((interest) => (
                <span
                  key={interest}
                  className={`px-2 py-0.5 text-[11px] font-monospace rounded border transition-colors duration-150
                    ${
                      theme === "light"
                        ? "bg-neutral-100 border-neutral-300 text-neutral-600 hover:bg-neutral-200 hover:border-neutral-400"
                        : "bg-neutral-800 border-neutral-600 text-neutral-300 hover:bg-neutral-700 hover:border-neutral-500"
                    }`}
                >
                  {interest}
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
                  <a
                    href="https://www.northeasternapo.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-xl font-bold font-jost hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                  >
                    Alpha Phi Omega
                    <FaExternalLinkAlt
                      size={11}
                      className="opacity-40 group-hover:opacity-80 transition-opacity"
                    />
                  </a>
                  <span className="text-[11px] font-monospace px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30">
                    President
                  </span>
                </div>
                <p className="text-sm font-raleway text-muted-foreground mb-3">
                  National co-ed service fraternity — leading the 130+ member
                  Alpha Theta Eta chapter at Northeastern.
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
                  <a
                    href="https://www.nuchorus.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-xl font-bold font-jost hover:text-purple-500 dark:hover:text-purple-400 transition-colors"
                  >
                    NU Choral Society
                    <FaExternalLinkAlt
                      size={11}
                      className="opacity-40 group-hover:opacity-80 transition-opacity"
                    />
                  </a>
                  <span className="text-[11px] font-monospace px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/30">
                    Past President
                  </span>
                </div>
                <p className="text-sm font-raleway text-muted-foreground mb-3">
                  80+ member choir across three ensembles — launched Choir Cup,
                  an inter-ensemble competition now a permanent tradition, and
                  grew out-of-rehearsal events from ~2 to 20+ per semester.
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
