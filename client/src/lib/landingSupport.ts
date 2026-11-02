export type LandingSupport = {
  faq: [string, string][];
  relatedProducts: string[];
  relatedServices: string[];
};

/** Reviewed against the existing catalog; compatibility and arrangements are not guarantees. */
export const landingSupport: Record<string, LandingSupport> = {
  "security-alarm-systems": {
    faq: [
      [
        "What components can be included in a security alarm system?",
        "The range includes control panels, motion and door sensors, glass-break sensors, smoke, heat, gas-leak and water-leak sensors, sirens, panic buttons, and wireless devices. Selection depends on the property layout, entry points, occupancy, and monitoring requirements.",
      ],
      [
        "Can wired and wireless devices be used?",
        "The current portfolio includes wired and wireless options. The appropriate combination depends on the control equipment, site layout, and installation requirements.",
      ],
      [
        "What happens when an alarm is triggered?",
        "A compatible system can send signals into an agreed monitoring and escalation process. Verification, designated contacts, and any separately arranged response service determine the next step.",
      ],
    ],
    relatedProducts: ["cctv-systems", "fire-detection-systems"],
    relatedServices: [
      "24-7-monitoring",
      "armed-response",
      "preventive-maintenance",
    ],
  },
  "cctv-systems": {
    faq: [
      [
        "What types of CCTV products are available?",
        "The portfolio includes IP, PTZ, AI and thermal cameras, network video recorders, and video analytics. Each addresses a different viewing, recording, or event-review requirement.",
      ],
      [
        "How should I choose a CCTV setup for my site?",
        "Consider coverage areas, lighting, viewing distance, retention needs, and whether analytics or thermal visibility is relevant. A site assessment helps define practical camera locations.",
      ],
      [
        "How is footage recorded and reviewed?",
        "Compatible cameras and recorders can provide recording and search functions. Storage, retention, and access arrangements should be confirmed for the selected equipment and configuration.",
      ],
    ],
    relatedProducts: ["security-alarm-systems", "electric-fence-systems"],
    relatedServices: ["preventive-maintenance", "security-audits"],
  },
  "electric-fence-systems": {
    faq: [
      [
        "Which electric fencing components are available?",
        "The portfolio includes energizers, fence monitoring, audio and visual warning devices, and accessories such as insulators, posts, grounding kits, and warning signs.",
      ],
      [
        "How is an electric fence planned for a property?",
        "Planning considers boundary length, terrain, access points, existing security layers, and the preferred monitoring arrangement. A site review helps establish a practical configuration.",
      ],
      [
        "What does fence monitoring add?",
        "Monitoring is intended to identify intrusion attempts or tampering and support notification. The detection, warning, and escalation arrangement depends on the selected equipment and site configuration.",
      ],
    ],
    relatedProducts: ["cctv-systems", "gate-automation-systems"],
    relatedServices: [
      "24-7-monitoring",
      "preventive-maintenance",
      "security-audits",
    ],
  },
  "fire-detection-systems": {
    faq: [
      [
        "What makes up a fire detection system?",
        "Available products include smoke detectors, heat detectors, manual call points, control panels, and audible or visual notification devices. The building layout, occupancy, and environment guide selection.",
      ],
      [
        "How do I choose between smoke and heat detection?",
        "Selection should reflect the environmental conditions and risk being detected. A site review can help avoid inappropriate detector placement and identify suitable devices.",
      ],
      [
        "Can fire detection connect to monitoring?",
        "Integration may be possible with compatible equipment. Control-panel, signalling, wiring or wireless arrangements, and the final monitoring configuration must be confirmed for the installed system.",
      ],
    ],
    relatedProducts: ["security-alarm-systems", "cctv-systems"],
    relatedServices: [
      "24-7-monitoring",
      "preventive-maintenance",
      "security-audits",
    ],
  },
  "gate-automation-systems": {
    faq: [
      [
        "Which gate automation products are available?",
        "The range covers sliding-gate systems, swing-gate operators, vehicle barriers, and access control products. Selection depends on the entrance and traffic pattern.",
      ],
      [
        "How do I select an operator or barrier?",
        "Gate type, weight, opening frequency, power supply, safety requirements, and access-control needs should be reviewed before an operator is selected.",
      ],
      [
        "Can gates be coordinated with access control?",
        "The catalog includes card, biometric, mobile-credential, and visitor-management options. Interoperability and safety arrangements should be checked for the chosen configuration.",
      ],
    ],
    relatedProducts: ["security-alarm-systems", "cctv-systems"],
    relatedServices: ["preventive-maintenance", "security-audits"],
  },
  "home-automation-systems": {
    faq: [
      [
        "What can home automation control?",
        "The range covers lighting, curtains, smart locks, climate control, energy monitoring, scenes, and voice control. Available control methods depend on the compatible devices selected.",
      ],
      [
        "Can automation be planned alongside security?",
        "Automation can be considered alongside security and safety requirements. Actual interoperability depends on the devices, protocols, and configuration; not every product works with every system.",
      ],
      [
        "Can I introduce automation in stages?",
        "Start with the routines and spaces that matter most, then consider compatible controls, connectivity, and expansion. A phased approach can prioritize the requirements of your property.",
      ],
    ],
    relatedProducts: ["security-alarm-systems", "gate-automation-systems"],
    relatedServices: ["preventive-maintenance", "security-audits"],
  },
  "24-7-monitoring": {
    faq: [],
    relatedProducts: ["security-alarm-systems", "cctv-systems"],
    relatedServices: ["armed-response", "preventive-maintenance"],
  },
  "armed-response": {
    faq: [],
    relatedProducts: ["security-alarm-systems", "cctv-systems"],
    relatedServices: ["24-7-monitoring", "security-audits", "security-guards"],
  },
  "preventive-maintenance": {
    faq: [],
    relatedProducts: [
      "security-alarm-systems",
      "cctv-systems",
      "fire-detection-systems",
    ],
    relatedServices: ["security-audits", "24-7-monitoring"],
  },
  "security-audits": {
    faq: [],
    relatedProducts: [
      "security-alarm-systems",
      "cctv-systems",
      "gate-automation-systems",
    ],
    relatedServices: ["preventive-maintenance", "security-guards"],
  },
  "security-guards": {
    faq: [],
    relatedProducts: ["cctv-systems", "gate-automation-systems"],
    relatedServices: ["security-audits", "event-security"],
  },
  "security-escort-service": {
    faq: [],
    relatedProducts: ["cctv-systems", "gate-automation-systems"],
    relatedServices: ["security-audits", "security-guards"],
  },
  "event-security": {
    faq: [],
    relatedProducts: ["cctv-systems", "gate-automation-systems"],
    relatedServices: ["security-guards", "security-audits"],
  },
};

export const serviceDeliveryNotes: Record<
  string,
  { availability: string; benefits?: string[] }
> = {
  "24-7-monitoring": {
    availability:
      "Monitoring and escalation arrangements are confirmed for the compatible system and agreed service scope.",
    benefits: [
      "Ongoing signal monitoring",
      "Agreed alarm verification",
      "Defined escalation contacts",
      "Incident information and logs",
    ],
  },
  "armed-response": {
    availability:
      "Availability and response arrangements are confirmed for the site, access conditions, and applicable operating requirements.",
    benefits: [
      "Additional on-site response support",
      "Site-specific response planning",
      "Incident assessment",
      "Coordination through agreed escalation procedures",
    ],
  },
  "preventive-maintenance": {
    availability:
      "Visit frequency and maintenance scope are agreed around the equipment, site access, and operational priorities.",
    benefits: [
      "Identify avoidable faults",
      "Review equipment condition",
      "Support system reliability",
      "Document maintenance priorities",
    ],
  },
  "security-audits": {
    availability:
      "Assessment scope and completion timeline are confirmed after discussing the property and review objectives.",
  },
};
