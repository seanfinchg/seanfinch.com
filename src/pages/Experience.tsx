import React, { useEffect } from "react";
import { useTheme } from "../contexts/themeContext";

interface ExperienceProps {
  title: string;
  company: string;
  location: string;
  description: string[];
  dateRange: string;
  featured?: boolean;
}

const ExperienceCard: React.FC<ExperienceProps> = ({
  title,
  company,
  location,
  description,
  dateRange,
  featured = false,
}) => {
  const { theme } = useTheme();

  if (featured) {
    return (
      <div
        className={`w-full mb-8 p-6 border-4 ${
          theme === "light"
            ? "border-blue-500 bg-blue-50"
            : "border-blue-400 bg-blue-900/20"
        } rounded-lg text-${theme === "light" ? "dark-mode" : "light-mode"} m-4 font-raleway shadow-2xl relative`}
      >
        <div className="absolute -top-4 left-4 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold font-monospace">
          ⭐ UPCOMING ROLE
        </div>
        <h2 className="text-3xl font-bold mb-1 mt-2 font-jost">{title}</h2>
        <h3 className="text-2xl font-semibold mb-1 font-jost">{company}</h3>
        <p className="text-base italic mb-3 font-monospace">
          {location} | {dateRange}
        </p>
        <ul className="list-disc pl-5 space-y-2 text-lg">
          {description.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div
      className={`w-full md:w-3/4 mb-8 p-4 border-${theme === "light" ? "light-mode" : "dark-mode"} border-2 rounded-lg text-${theme === "light" ? "dark-mode" : "light-mode"} m-4 font-raleway shadow-lg`}
    >
      <h2 className="text-2xl font-bold mb-1 font-jost">{title}</h2>
      <h3 className="text-xl font-semibold mb-1 font-jost">{company}</h3>
      <p className="text-sm italic mb-2 font-monospace">
        {location} | {dateRange}
      </p>
      <ul className="list-disc pl-5 space-y-2">
        {description.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

const Experience: React.FC = () => {
  const { theme } = useTheme();

  useEffect(() => {
    document.title = "Experience - Sean Finch • SoCal";
  }, []);

  const experiences: ExperienceProps[] = [
    {
      title: "Systems Engineer Intern",
      company: "Neuralink",
      location: "Fremont, CA",
      description: [
        "Selected to fortify infrastructure across systems with custom cyber defenses, automated monitoring, and proactive mitigation",
        "Responsibilities include standardizing endpoint provisioning using IaC tools like Terraform, Docker, and Ansible",
      ],
      dateRange: "April 2026 – July 2026",
      featured: true,
    },
    {
      title: "IT Operations Co-op",
      company: "Audax Group",
      location: "Boston, MA",
      description: [
        "Advised stakeholders on cybersecurity strategy through NIST-aligned policies, risk analysis, and IAM best practices",
        "Documented new processes and delivered technical presentations on cybersecurity, infrastructure automation, and workflow optimization to senior leadership; presentations received high praise from leadership for improving security and efficiency",
        "Automated Windows Autopilot provisioning via PowerShell and Win32 applications, reducing imaging time by 20%",
        "Replaced manual internal ticketing creation with Freshservice Service Request forms, cutting intake time by 30%, enforcing structured onboarding/reimaging workflows, and improving auditing and KPI tracking",
      ],
      dateRange: "May 2025 – Present",
    },
    {
      title: "Mechanical and Industrial Engineering IT Support",
      company: "Northeastern University",
      location: "Boston, MA",
      description: [
        "Administered devices for the Mechanical and Industrial Engineering Department, enabling optimal performance",
        "Configured and maintained software on departmental devices, enhancing reliability and minimizing disruptions",
      ],
      dateRange: "September 2024 – April 2025",
    },
    {
      title: "Cybersecurity Intern",
      company: "CENIC",
      location: "La Mirada, CA",
      description: [
        "Audited security scans for vulnerabilities, automated remediation ticket creation, and strengthened system and device security",
        "Documented security processes and software usage in Confluence, enhancing team collaboration and compliance",
        "Captured and verified detailed DDoS metrics on the CalREN Network, bolstering threat detection and response",
        "Gathered KPI metrics to measure initiative effectiveness, demonstrating improvements in response times and overall posture",
      ],
      dateRange: "May 2024 – August 2024",
    },
    {
      title: "Team Commander",
      company: "AFA CyberPatriot",
      location: "Fullerton, CA",
      description: [
        "Led my team to secure intentionally flawed Windows and Linux VMs by resolving vulnerabilities and enforcing access policies",
        "Designed and taught a cybersecurity curriculum that propelled the team to a #1 California AJROTC ranking in 2021 and 2022",
      ],
      dateRange: "January 2020 – January 2023",
    },
  ];

  return (
    <div
      className={`flex flex-col items-center ${theme === "light" ? "bg-light-mode text-dark-mode" : "bg-dark-mode text-light-mode"} pt-16 p-4 font-roboto-slab`}
    >
      <h1 className="text-4xl font-bold mb-8 font-jost">Experience</h1>
      {experiences.map((experience, index) => (
        <ExperienceCard key={index} {...experience} />
      ))}
    </div>
  );
};

export default Experience;
