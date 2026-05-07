export interface ExperienceProps {
  title: string;
  company: string;
  location: string;
  description: string[];
  logo?: string;
  companyUrl: string;
  dateRange: string;
  featured?: boolean;
}

import paloLogo from "../assets/palo-alto-networks.jpeg";
import neuralinkLogo from "../assets/neuralink.jpeg";
import audaxLogo from "../assets/audax-group.jpeg";
import northeasternLogo from "../assets/northeastern-university.jpeg";
import cenicLogo from "../assets/cenic.jpeg";
import cyberpatriotLogo from "../assets/cyberpatriot.jpeg";

export const experiences: ExperienceProps[] = [
  {
    title: "Incoming Enterprise Security Engineer Intern",
    company: "Palo Alto Networks",
    location: "Santa Clara, CA",
    description: [
      "Develop detection content and alerts for endpoint and cloud telemetry (Cortex XDR / Prisma Cloud) to reduce mean time to detection.",
      "Instrument and iterate on telemetry pipelines: ingest, normalize, and enrich logs for security analytics and hunting.",
      "Automate triage and response workflows with Python and SOAR playbooks; build tooling to accelerate incident investigation.",
    ],
    dateRange: "June 2026 – September 2026",
    featured: true,
    logo: paloLogo,
    companyUrl: "https://www.paloaltonetworks.com/",
  },
  {
    title: "Systems Engineer Intern",
    company: "Neuralink",
    location: "Fremont, CA",
    description: [
      "Drove access lockdowns for unmanaged devices and made device registration mandatory for secure access",
      "Built Linux MDM enrollment from the ground up to extend centralized control and hardening beyond Windows and Mac endpoints",
      "Introduced Defender XDR and kicked off SIEM implementation to build telemetry, alerting, and incident-response foundations",
      "Rebuilt internal security docs into a structured knowledge base with runbooks and operational guides",
    ],
    dateRange: "April 2026 – June 2026",
    featured: true,
    logo: neuralinkLogo,
    companyUrl: "https://neuralink.com/",
  },
  {
    title: "IT Operations Co-op — Security Operations",
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
    featured: false,
    logo: audaxLogo,
    companyUrl: "https://www.audaxgroup.com/",
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
    logo: northeasternLogo,
    companyUrl: "https://www.northeastern.edu/",
  },
  {
    title: "Cybersecurity Intern",
    company: "CENIC",
    location: "La Mirada, CA",
    description: [
      "Conducted ~5 DDoS analyses per week on the CalREN network, safeguarding connectivity for 20,000,000+ students and educators across 12,000 California K–20 schools including the California State University and University of California systems",
      "Operated Tenable Nessus and Qualys vulnerability detection systems, using Python to automate scans and cut review time 50%",
      "Documented security processes and gathered KPI metrics, demonstrating improvements in response times and overall posture",
    ],
    dateRange: "May 2024 – August 2024",
    logo: cenicLogo,
    companyUrl: "https://cenic.org/",
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
    logo: cyberpatriotLogo,
    companyUrl: "https://www.uscyberpatriot.org/",
  },
];
