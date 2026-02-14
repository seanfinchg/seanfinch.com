export interface ExperienceProps {
  title: string;
  company: string;
  location: string;
  description: string[];
  dateRange: string;
  featured?: boolean;
}

export const experiences: ExperienceProps[] = [
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
      "Executed vulnerability scans with Tenable Nessus, triaged findings, and remediated vulnerabilities, reducing exposure by 40%",
      "Vetted requested applications by analyzing permissions, network behavior, and security posture, blocking high-risk software",
      "Hardened 700+ endpoints via configuration baselines in Entra ID aligned to CIS Benchmarks, boosting compliance by 35%",
      "Documented and delivered security architecture and automation briefings to senior leadership to support risk-informed decisions",
      "Automated Windows Autopilot provisioning via PowerShell and Intune Win32 applications, reducing imaging time by 20%",
    ],
    dateRange: "May 2025 – April 2026",
  },
  {
    title: "Mechanical and Industrial Engineering IT Support",
    company: "Northeastern University",
    location: "Boston, MA",
    description: [
      "Administered and supported departmental endpoints, ensuring reliable performance for faculty, staff, and instructional use",
      "Deployed, configured, and maintained academic and engineering software, reducing downtime and user-impacting issues",
    ],
    dateRange: "September 2024 – April 2025",
  },
  {
    title: "Cybersecurity Intern",
    company: "CENIC",
    location: "La Mirada, CA",
    description: [
      "Operated enterprise vulnerability management detection and response platforms including Tenable Nessus and Qualys, leveraging Python to automate scan prioritization and reduce manual review time by 50%",
      "Analyzed backbone network telemetry to validate DDoS events on the CalREN Network and support incident response actions",
      "Gathered KPI metrics to measure initiative effectiveness, demonstrating improvements in response times and overall posture",
      "Documented security processes and software usage in Confluence, enhancing team collaboration and compliance",
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
