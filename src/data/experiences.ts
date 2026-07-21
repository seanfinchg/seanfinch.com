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
    title: "Security Engineer Intern",
    company: "Palo Alto Networks",
    location: "Santa Clara, CA",
    description: [
      "Owned end-to-end design and implementation of Application Control Posture Check, a first-of-its-kind internal DAST compliance tool, cutting manual review from 3 hrs to 5 min; presented the model at a local OWASP chapter",
      "Engineered a modular, strictly-typed Python engine with pluggable auto-discovered rules, swappable identity providers (Okta, Idira) via a vendor-agnostic factory, and typed REST/SQL/DNS clients behind Pydantic boundaries, running daily GRC checks",
      "Automated 16 GRC controls across 10+ apps: SSO, privileged access, service accounts, X.509, DMARC (ISO 27001/NIST CSF)",
      "Exposed structured findings through a REST API to the risk dashboard, surfacing posture/control-drift to the CISO and Board",
      "Owned the risk dashboard's RBAC end-to-end (least-privilege); audited and remediated 10+ flaws including SQL injection",
    ],
    dateRange: "June 2026 – September 2026",
    featured: true,
    logo: paloLogo,
    companyUrl: "https://www.paloaltonetworks.com/",
  },
  {
    title: "Systems Engineer Intern (Security Operations)",
    company: "Neuralink",
    location: "Fremont, CA",
    description: [
      "Overhauled endpoint, identity, and cloud security during rapid growth, earning executive buy-in for a dedicated security team",
      "Tested and deployed Microsoft Defender XDR and Sentinel (SIEM) across 500+ endpoints for alerting and incident response",
      "Managed the Intune MDM fleet across macOS and Windows, aligning device baselines to CIS Benchmarks and enforcing Conditional Access lockdowns, registration, and OS update rings that moved 20%+ of devices off outdated versions",
      "Automated provisioning with 10+ Terraform modules (IaC) and attribute-based Entra dynamic groups, auto-assigning 500+ users",
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
