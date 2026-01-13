import { useEffect } from "react";
import { useTheme } from "../contexts/themeContext";

interface SocialMediaButtonProps {
  url: string;
  children: React.ReactNode;
  className?: string;
}

const SocialMediaButton: React.FC<SocialMediaButtonProps> = ({
  url,
  children,
  className = "",
}) => {
  const { theme } = useTheme();
  const buttonClass = `flex justify-center mx-2 my-1 px-4 py-2 text-base font-jost font-medium border border-transparent rounded-lg hover:border-indigo-600 cursor-pointer transition-colors duration-200 ${
    theme === "light"
      ? "bg-ultra-light-mode text-ultra-dark-mode"
      : "bg-ultra-dark-mode text-light-mode"
  } ${className}`;

  const openLinkInNewTab = () => {
    window.open(url, "_blank");
  };

  return (
    <button className={buttonClass} onClick={openLinkInNewTab}>
      {children}
    </button>
  );
};

function About() {
  const { theme } = useTheme();

  useEffect(() => {
    document.title = "About - Sean Finch • SoCal";
  }, []);

  return (
    <div
      className={`flex justify-center ${theme === "light" ? "bg-light-mode text-ultra-dark-mode" : "bg-dark-mode text-light-mode"}`}
    >
      <div className="w-full mx-4 md:mx-0">
        <div className="flex flex-col items-center text-center mt-16">
          <h1 className="text-4xl font-bold mb-8 font-jost">About Me</h1>
          <div className="flex justify-center flex-wrap">
            <SocialMediaButton url="/resume.pdf" className="mb-4 md:mb-0">
              Resume
            </SocialMediaButton>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center md:space-x-8 md:items-center">
            <img
              src="/SeanPortrait.jpg"
              alt="Sean Finch Portrait"
              className="w-3/4 md:w-96 h-full md:h-120 object-cover mb-8 md:mb-0 rounded-xl"
            />
            <div
              className={`w-full md:w-1/2 mb-8 p-4 border-${theme === "light" ? "border-ultra-light-mode" : "border-ultra-dark-mode"} border-2 rounded-lg text-${theme === "light" ? "text-ultra-light-mode" : "text-ultra-dark-mode"} m-4 font-raleway shadow-lg`}
            >
              <p className="mb-4">
                I'm Sean Finch, from Orange County, California, and am pursuing
                a B.S. in Cybersecurity with a Music Minor at Northeastern
                University. I blend technical expertise with creative
                problem-solving to make a tangible impact in cybersecurity and
                IT.
              </p>
              <p className="mb-4">
                I'm currently working part-time as an IT Operations Co-op at
                Audax Group, where I advise on cybersecurity strategy, automate
                infrastructure provisioning, and optimize workflows. Previously,
                I interned at CENIC, performing vulnerability management with
                Tenable, Qualys, and SIEM tools while analyzing DDoS attacks and
                strengthening IAM practices.
              </p>
              <p className="mb-4">
                In my homelab, I run a virtualized environment with TrueNAS
                SCALE, experimenting with platforms and honing my skills in
                system administration and infrastructure optimization.
              </p>
              <p className="mb-4">
                Beyond tech, I'm deeply involved in music and service
                leadership. I served as Vice President of Northeastern
                University Choral Society (NUCS) in Spring 2025 and currently
                serve as President (Fall 2025 - Spring 2026). In Alpha Phi
                Omega, I currently serve on the Service Committee (Fall 2025 -
                Spring 2026) and as Standards Chair (Spring 2026). I'm also a
                vocalist and outdoor enthusiast.
              </p>
              <div>
                <h2 className="text-3xl font-bold mb-4">Technical Skills</h2>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>Operating Systems/Software:</strong> Intune, Entra
                    ID, Active Directory, Tenable, Qualys, Crowdstrike, Software
                    RAIDZ1, Elasticsearch, Kibana, Git, Linux, Proxmox, TrueNAS
                    SCALE, Tailscale, Nginx, Caddy, Docker, Wireshark, JUnit,
                    React.js, Node.js, Express.js, Tailwind, Prisma, Swing
                  </li>
                  <li>
                    <strong>Cybersecurity:</strong> SIEM, Risk Management and
                    Assessment, Identity and Access Management, Threat
                    Intelligence, Incident Response, System Administration,
                    Virtualization, NIST Cybersecurity Framework, MITRE ATT&CK,
                    Penetration Testing, Cryptography, Zero Trust
                  </li>
                  <li>
                    <strong>Languages:</strong> Java, Kotlin, TypeScript,
                    JavaScript, HTML, CSS, Python, C/C++, x86 Assembly, SQL
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
