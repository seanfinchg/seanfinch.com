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
      "Advised stakeholders on cybersecurity strategy through NIST-aligned policies, risk analysis, and IAM best practices",
      "Documented new processes and delivered technical presentations on cybersecurity, infrastructure automation, and workflow optimization to senior leadership; presentations received high praise from leadership for improving security and efficiency",
      "Automated Windows Autopilot provisioning via PowerShell and Win32 applications, reducing imaging time by 20%",
      "Replaced manual internal ticketing creation with Freshservice Service Request forms, cutting intake time by 30%, enforcing structured onboarding/reimaging workflows, and improving auditing and KPI tracking",
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
      "Automated cybersecurity audits using Python, translating scan data into actionable findings and reducing review time by 50%",
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
