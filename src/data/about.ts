export interface SkillGroup {
  label: string;
  items: string[];
}

export interface LeadershipRole {
  role: string;
  period: string;
  active?: boolean;
}

export interface LeadershipEntry {
  name: string;
  url: string;
  badge: string;
  description: string;
  active?: boolean;
  roles: LeadershipRole[];
}

export const aboutSummary =
  "Security engineer, Northeastern CS student, homelabber, vocalist and street photographer from Orange County.";

export const aboutStatus = {
  education: "B.S. Computer Science · Music Minor · Anticipated May 2027",
  job: "Incoming Security Engineer · Palo Alto Networks",
};

export const aboutBio: string[] = [
  "I'm Sean Finch, from Orange County, California, studying for a B.S. in Computer Science with a Music Minor at Northeastern University. I graduate in May 2027 and return to Palo Alto Networks as a full-time Security Engineer in July 2027.",
  "During my 2026 internship at Palo Alto Networks, I built Application Control Posture Check, an internal DAST tool that cut compliance reviews from three hours to a five-minute automated scan across 16 GRC controls. I architected its RBAC system and shipped both ends of the risk dashboard data flow, giving the CISO and Board live visibility into security posture. Before that, I helped stand up Neuralink's first security function, leading a Defender XDR and Sentinel rollout across 500+ endpoints and resetting endpoint, identity, and cloud baselines, which earned executive buy-in for a dedicated security team. Earlier, I led endpoint security and vulnerability management at Audax Group and handled DDoS defense at CENIC for the CalREN network serving 20M+ students and educators across California.",
  "I learn by digging into how things actually work, and I'll say so when something is broken or risky. Outside of work, I run a production-grade homelab on TrueNAS SCALE, Proxmox, and Kubernetes, self-hosting 15+ services for 10+ users, with Wazuh for logging and alerting and OpenVAS for continuous scanning. It's where most of my systems administration knowledge started.",
  "I'm also a vocalist, street photographer, and outdoor enthusiast, and I lead two student organizations, listed below.",
];

export const skillGroups: SkillGroup[] = [
  {
    label: "Security",
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
  {
    label: "Operating Systems",
    items: [
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
    ],
  },
];

export const interests: string[] = [
  "Street Photography",
  "Car Culture",
  "Mountain Biking",
  "Backpacking",
  "Choral Singing",
  "Weight Training",
  "Video Games",
  "Romanian Culture",
];

export const leadership: LeadershipEntry[] = [
  {
    name: "Alpha Phi Omega",
    url: "https://www.northeasternapo.com/",
    badge: "President",
    active: true,
    description:
      "National co-ed service fraternity. Leading the 130+ member Alpha Theta Eta chapter at Northeastern.",
    roles: [
      {
        role: "Service Committee Member",
        period: "Fall 2025 – Spring 2026",
      },
      { role: "Standards Chair", period: "Spring 2026" },
      { role: "President", period: "Spring 2026 →", active: true },
    ],
  },
  {
    name: "NU Choral Society",
    url: "https://www.nuchorus.org/",
    badge: "Past President",
    description:
      "80+ member choir across three ensembles. Launched Choir Cup, an inter-ensemble competition now a permanent tradition, and grew out-of-rehearsal events from ~2 to 20+ per semester.",
    roles: [
      { role: "Vice President", period: "Spring 2025" },
      { role: "President", period: "Fall 2025 – Spring 2026" },
    ],
  },
];
