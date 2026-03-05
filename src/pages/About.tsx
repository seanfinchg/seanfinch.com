import { useEffect } from "react";
import { useTheme } from "../contexts/themeContext";
import SocialMediaButton from "../components/SocialMediaButton";
import { getThemeClasses } from "../utils/themeUtils";

function About() {
  const { theme } = useTheme();

  useEffect(() => {
    document.title = "About - Sean Finch • SoCal";
  }, []);

  return (
    <div className={`flex justify-center ${getThemeClasses(theme)}`}>
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
                    <strong>Cybersecurity:</strong> Tenable Nessus, Qualys,
                    OpenVAS, CrowdStrike Falcon, Suricata, Zeek, Elastic SIEM
                    Stack, Kibana, Wazuh, Wireshark, Burp Suite, Ghidra,
                    Metasploit, MITRE ATT&CK, CIS Benchmarks, NIST Cybersecurity
                    Framework
                  </li>
                  <li>
                    <strong>Technologies:</strong> Intune, Entra ID, Active
                    Directory, Git, Tailscale, Zscaler, Linux, Proxmox, TrueNAS
                    SCALE, Kubernetes, Docker, Nginx, Caddy, JUnit, React.js,
                    Node.js, Express.js
                  </li>
                  <li>
                    <strong>Languages:</strong> Python, Java, Kotlin,
                    TypeScript, JavaScript, HTML, CSS, Bash, Powershell, C/C++,
                    x86 Assembly, SQL
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
