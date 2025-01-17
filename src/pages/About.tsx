import { useEffect } from "react";
import { useTheme } from "../contexts/themeContext";

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
                Hey there! I'm Sean Finch from sunny Orange County, California,
                currently pursuing a Bachelor of Science in Cybersecurity with a
                Minor in Music at Northeastern University. My passion lies in
                blending technical expertise with creative problem-solving to
                make a tangible impact.
              </p>
              <p className="mb-4">
                As a Cybersecurity Intern at CENIC, I utilized tools like
                Tenable.io, Qualys, Elastic, and SIEM to perform vulnerability
                management and analyze DDoS attacks. I also worked on identity
                and access management to enhance system security. My
                contributions included auditing security scans, documenting
                processes in Confluence to improve team collaboration, and
                capturing detailed metrics to measure and strengthen the
                organization's cybersecurity posture.
              </p>
              <p className="mb-4">
                In my homelab, I leverage Proxmox and Docker to manage backups
                and experiment with various platforms. This hands-on approach
                has sharpened my skills in virtualization, system
                administration, and infrastructure optimization. By continuously
                exploring new technologies, I aim to create scalable and
                future-proof systems for home use.
              </p>
              <p className="mb-4">
                Currently, I work in IT support for Northeastern University’s
                Mechanical and Industrial Engineering Department. In this role,
                I administer and maintain devices, configure software, and
                ensure reliable system performance to minimize disruptions for
                faculty and students. This experience has further honed my
                troubleshooting skills and reinforced the importance of
                efficient IT operations in an academic environment.
              </p>
              <p className="mb-4">
                Beyond the technical world, I'm a vocalist and outdoor
                enthusiast who enjoys singing, hiking, and photography. With a
                creative mindset and a dedication to continuous learning, I'm
                excited to tackle challenges and drive innovation in
                cybersecurity and IT.
              </p>
              <div>
                <h2 className="text-3xl font-bold mb-4">Technical Skills</h2>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>Operating Systems/Software:</strong> Tenable.IO,
                    Qualys, Elastic, Proxmox, CasaOS, GitHub, GitLab, Ubuntu
                    Server, Docker, Windows Server, TrueNAS SCALE
                  </li>
                  <li>
                    <strong>Programming Languages:</strong> Java, Kotlin,
                    TypeScript, JavaScript, HTML, Tailwind, CSS, Python, C++, C,
                    Assembly, Prisma
                  </li>
                  <li>
                    <strong>Cybersecurity Skills:</strong> SIEM, Incident
                    Response, Vulnerability Assessment, VPN, System
                    Administration, Virtualization, Threat Intelligence,
                    Identity and Access Management (IAM)
                  </li>
                  <li>
                    <strong>Other:</strong> Git, React.js, Node.js, 3-2-1
                    Backup, JUnit, Code Refactoring, Object-Oriented
                    Programming, Test-Driven Development
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
