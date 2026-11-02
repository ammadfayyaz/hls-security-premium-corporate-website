import { allServices, productCategories } from "@/lib/data";

export type ProductCategoryLanding = {
  slug: string;
  heading: string;
  description: string;
  keywords: string;
  intro: string;
  applications: string[];
  selection: string;
  image: string;
};

export const productCategoryLandings: Record<string, ProductCategoryLanding> = {
  "Security Alarm System": {
    slug: "security-alarm-systems",
    heading: "Security Alarm Systems in Pakistan",
    description:
      "Explore HLS security alarm systems, sensors, control panels, and emergency alert devices for residential, commercial, and enterprise protection.",
    keywords:
      "security alarm systems Pakistan, alarm sensors, control panels, intrusion detection",
    intro:
      "HLS security alarm systems bring together intelligent control panels, sensors, sirens, and panic devices to help detect intrusion risks early. Our team can help match the right combination to homes, offices, retail spaces, warehouses, and larger sites.",
    applications: [
      "Residential homes",
      "Corporate offices",
      "Retail and commercial premises",
      "Warehouses and multi-site facilities",
    ],
    selection:
      "Start with the property layout, entry points, occupancy pattern, and monitoring requirements. We can then help identify the appropriate mix of wired or wireless devices and control equipment.",
    image: "/images/products/product-control-panel_0dae52ff.jpg",
  },
  "CCTV Systems": {
    slug: "cctv-systems",
    heading: "CCTV Camera Systems in Pakistan",
    description:
      "Discover HLS CCTV camera systems including PTZ, AI, thermal, and video analytics solutions for visibility, verification, and site security.",
    keywords:
      "CCTV camera systems Pakistan, security cameras, PTZ cameras, AI surveillance",
    intro:
      "HLS CCTV solutions help teams see, verify, and review activity across important areas. From everyday surveillance to specialist PTZ, AI, thermal, and analytics applications, the portfolio supports homes, businesses, industrial sites, and critical facilities.",
    applications: [
      "Entrances and reception areas",
      "Retail and commercial sites",
      "Industrial perimeters",
      "Parking, warehouses, and critical areas",
    ],
    selection:
      "Consider the areas to be covered, lighting conditions, retention needs, viewing distance, and whether analytics or thermal visibility is relevant. A site assessment helps define practical camera locations.",
    image: "/images/products/product-ptz-camera_3d15e3b3.jpg",
  },
  "Electric Fence": {
    slug: "electric-fence-systems",
    heading: "Security Electric Fencing Solutions in Pakistan",
    description:
      "Explore monitored electric fencing, energizers, fence monitoring, warning systems, and perimeter accessories for layered site protection.",
    keywords:
      "electric fence systems Pakistan, perimeter security, fence monitoring, security energizers",
    intro:
      "HLS electric fencing solutions add a monitored perimeter layer around suitable properties and sites. Energizers, detection, warning devices, and accessories can be planned together to support deterrence and early notification.",
    applications: [
      "Residential compounds",
      "Industrial and warehouse perimeters",
      "Commercial sites",
      "Large estates and telecom locations",
    ],
    selection:
      "The right perimeter solution depends on boundary length, terrain, access points, existing security layers, and the preferred monitoring arrangement. Our team can help scope a practical design.",
    image: "/images/products/product-energizer_8348abe5.jpg",
  },
  "Fire Detection": {
    slug: "fire-detection-systems",
    heading: "Fire Detection and Alarm Systems in Pakistan",
    description:
      "Explore HLS fire detection and alarm products including smoke and heat detection, manual call points, control panels, and notification devices.",
    keywords:
      "fire detection systems Pakistan, fire alarm systems, smoke detectors, heat detectors",
    intro:
      "HLS fire detection products help identify smoke, heat, and manual alarm activation so occupants and responsible teams can be alerted quickly. The portfolio supports scalable installations across homes, offices, commercial properties, and larger facilities.",
    applications: [
      "Homes and apartments",
      "Offices and commercial buildings",
      "Schools and healthcare settings",
      "Warehouses and industrial facilities",
    ],
    selection:
      "Choose detection and notification devices according to the building layout, environmental conditions, occupancy, and integration requirements. A site review helps avoid unsuitable detector placement.",
    image: "/images/products/product-smoke-detector_1fb36b49.jpg",
  },
  "Gate Automation": {
    slug: "gate-automation-systems",
    heading: "Automatic Gate Motors and Gate Automation in Pakistan",
    description:
      "Explore HLS automatic sliding gates, swing gates, barrier systems, and access control products for managed vehicle and pedestrian entry.",
    keywords:
      "gate automation Pakistan, automatic gate motors, sliding gates, barrier systems",
    intro:
      "HLS gate automation products support controlled movement at residential, commercial, and industrial entrances. Sliding and swing operators, barriers, safety devices, and access control can be coordinated around the gate and traffic pattern.",
    applications: [
      "Residential entrances",
      "Corporate and commercial access points",
      "Parking facilities",
      "Industrial and logistics sites",
    ],
    selection:
      "Gate type, weight, opening frequency, available power, safety requirements, and access-control needs all influence the right solution. We recommend checking the existing gate before selecting an operator.",
    image: "/images/products/gate-automation.jpg",
  },
  "Home Automation": {
    slug: "home-automation-systems",
    heading: "Smart Home Automation Systems in Pakistan",
    description:
      "Explore HLS smart home automation products for lighting, curtains, locks, climate control, energy monitoring, scenes, and voice control.",
    keywords:
      "smart home automation Pakistan, smart locks, lighting control, home security integration",
    intro:
      "HLS smart home automation helps residents coordinate lighting, access, climate, energy, and everyday scenes from compatible controls. The right system can be planned alongside security and safety requirements for a more connected home.",
    applications: [
      "New residential projects",
      "Luxury homes and estates",
      "Apartments and villas",
      "Security and lifestyle retrofit projects",
    ],
    selection:
      "Begin with the routines and spaces that matter most, then consider compatible devices, control methods, connectivity, and future expansion. We can help prioritize a practical phased approach.",
    image: "/images/products/home-automation.jpg",
  },
};

export const serviceLandingContent: Record<
  string,
  {
    slug: string;
    heading: string;
    description: string;
    keywords: string;
    intro: string;
    suitableFor: string;
    faq: [string, string][];
    image: string;
  }
> = {
  "24/7 Monitoring": {
    slug: "24-7-monitoring",
    heading: "24/7 Security Alarm Monitoring Services",
    description:
      "Professional security alarm monitoring with verification, escalation, and incident information for homes, businesses, and enterprise sites.",
    keywords:
      "24/7 security alarm monitoring Pakistan, alarm verification, security monitoring",
    intro:
      "HLS monitoring services provide an ongoing point of attention for connected security systems. When an alarm signal is received, the monitoring process helps verify the event and coordinate the next step using the agreed contact and response arrangements.",
    suitableFor:
      "Homes, offices, retail locations, warehouses, and multi-site operations that need an active monitoring layer.",
    faq: [
      [
        "What does monitoring involve?",
        "Monitoring receives signals from compatible systems, follows the agreed verification process, and communicates relevant information to designated contacts or response arrangements.",
      ],
      [
        "Can monitoring be added to an existing system?",
        "Compatibility depends on the equipment and configuration. A review of the existing system can establish the practical options.",
      ],
    ],
    image: "/images/services/monitoring-center.jpg",
  },
  "Armed Response": {
    slug: "armed-response",
    heading: "Armed Security Response Services",
    description:
      "Coordinated armed response support for verified security incidents, with arrangements planned around the client site and operating requirements.",
    keywords:
      "armed security response Pakistan, alarm response, security incident response",
    intro:
      "HLS armed response support is designed to complement monitored security systems when an incident requires an on-site response. Arrangements are discussed with the client and should reflect the site, access conditions, escalation process, and applicable operating requirements.",
    suitableFor:
      "Residential, commercial, industrial, and enterprise clients seeking an additional response arrangement alongside monitored security.",
    faq: [
      [
        "How is armed response arranged?",
        "The service begins with a discussion of the site, monitoring setup, contacts, access, and response requirements. Availability and arrangements are confirmed during the engagement.",
      ],
      [
        "Is every alarm treated as a confirmed incident?",
        "The agreed verification and escalation process is used to help distinguish events and coordinate an appropriate next step.",
      ],
    ],
    image: "/images/services/armed-response.jpg",
  },
  "Preventive Maintenance": {
    slug: "preventive-maintenance",
    heading: "Preventive Maintenance for Security Systems",
    description:
      "Scheduled preventive maintenance for security systems to support reliability, reduce avoidable faults, and keep equipment working as intended.",
    keywords:
      "security system preventive maintenance Pakistan, alarm maintenance, CCTV maintenance",
    intro:
      "Preventive maintenance gives security system owners a structured way to inspect equipment, test key functions, identify wear, and keep records of recommended actions. It can be planned around the system type, site access, and operational priorities.",
    suitableFor:
      "Homes, offices, retail sites, warehouses, and organizations responsible for maintaining existing security equipment.",
    faq: [
      [
        "What is checked during preventive maintenance?",
        "The scope is tailored to the installed system and may include visual inspection, functional testing, device checks, and a maintenance report.",
      ],
      [
        "Can existing systems be reviewed?",
        "Yes. A review can establish the condition of equipment and identify practical maintenance priorities.",
      ],
    ],
    image: "/images/services/cctv-camera.jpg",
  },
  "Security Audits": {
    slug: "security-audits",
    heading: "Professional Security Audits and Risk Assessments",
    description:
      "Structured security audits and risk assessments to identify vulnerabilities, clarify priorities, and support practical improvement planning.",
    keywords:
      "security audits Pakistan, security risk assessment, site security assessment",
    intro:
      "HLS security audits examine the relationship between a site, its people, access points, assets, procedures, and current security measures. The outcome is a clearer view of vulnerabilities and practical priorities for improvement.",
    suitableFor:
      "Residential estates, commercial properties, industrial sites, offices, and organizations planning a security review.",
    faq: [
      [
        "What does a security audit cover?",
        "The scope is agreed around the property and objectives, and may include site conditions, access, existing systems, procedures, and identified risks.",
      ],
      [
        "Will an audit include a fixed solution?",
        "The audit produces findings and recommendations; any later solution should be selected according to the client’s priorities and site requirements.",
      ],
    ],
    image: "/images/services/cctv-camera.jpg",
  },
  "Security Guards": {
    slug: "security-guards",
    heading: "Professional Security Guard Services in Pakistan",
    description:
      "Professional on-site security guard services with deployment planning, access control, visitor management, supervision, and reporting arrangements.",
    keywords:
      "security guard services Pakistan, on-site security personnel, access control guards",
    intro:
      "HLS security guard services provide an on-site security presence planned around the property, operating hours, access points, visitor flow, and client requirements. The engagement can include deployment planning, briefings, supervision, and reporting arrangements.",
    suitableFor:
      "Residential communities, offices, retail properties, warehouses, construction-related sites, and corporate facilities.",
    faq: [
      [
        "How is a guard deployment planned?",
        "The process starts with a consultation and site assessment so the required coverage, duties, access points, and reporting expectations can be discussed.",
      ],
      [
        "Are guard duties the same at every site?",
        "No. Duties are tailored to the property, operating pattern, access arrangements, and agreed client requirements.",
      ],
    ],
    image: "/images/services/armed-response.jpg",
  },
  "Security Escort Service": {
    slug: "security-escort-service",
    heading: "Professional Security Escort Services",
    description:
      "Discreet security escort services for individuals and authorized movements, with risk-aware planning and arrangements tailored to the client.",
    keywords:
      "security escort services Pakistan, protective escort, secure movement planning",
    intro:
      "HLS security escort services support planned movements where the client requires additional security coordination. The service is discussed around the person or authorized movement, route, timing, risk considerations, and preferred level of discretion.",
    suitableFor:
      "Individuals, business representatives, visiting teams, and authorized movements that require a planned escort arrangement.",
    faq: [
      [
        "How far in advance should an escort be arranged?",
        "Scheduling depends on the movement, route, requirements, and availability. The arrangements are confirmed during booking.",
      ],
      [
        "Is route planning included?",
        "Risk-aware movement and route planning can be discussed as part of the service requirements.",
      ],
    ],
    image: "/images/services/armed-response.jpg",
  },
  "Event Security": {
    slug: "event-security",
    heading: "Event Security and Crowd Management Services",
    description:
      "Event security planning for access control, entry screening, crowd management, restricted areas, and incident coordination.",
    keywords:
      "event security Pakistan, crowd management, event access control, venue security",
    intro:
      "HLS event security services help organizers plan practical controls for guests, staff, entrances, credentials, restricted areas, and incident coordination. The scope is shaped around the venue, event format, attendance profile, and operational requirements.",
    suitableFor:
      "Corporate events, private functions, venues, launches, conferences, and gatherings that need structured security planning.",
    faq: [
      [
        "What can event security include?",
        "Depending on the event, the scope may include entry screening, credential checks, access control, crowd management, restricted-area protection, and incident coordination.",
      ],
      [
        "When should event security planning begin?",
        "Planning is best started early enough to assess the venue, event schedule, entry arrangements, and personnel requirements before the event.",
      ],
    ],
    image: "/images/services/cctv-camera.jpg",
  },
};

export const productCategoryRoutes = productCategories.map(category => ({
  ...category,
  landing: productCategoryLandings[category.name],
}));

export const serviceRoutes = allServices.map(service => ({
  ...service,
  landing: serviceLandingContent[service.title],
}));

export function getProductCategoryBySlug(slug: string) {
  return productCategoryRoutes.find(category => category.landing.slug === slug);
}

export function getServiceBySlug(slug: string) {
  return serviceRoutes.find(service => service.landing.slug === slug);
}
