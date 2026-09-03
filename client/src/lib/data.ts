/**
 * HLS Security — Site Data
 * Centralized content for services, products, solutions, and site structure
 */

export const primaryServices = [
  {
    title: "Intruder Alarm Systems",
    description: "Advanced intrusion detection with intelligent sensors, control panels, and instant alerts to deter threats before they escalate.",
    icon: "bell",
    features: ["Wireless & wired sensors", "Smart control panels", "Real-time alerts", "Panic buttons"],
  },
  {
    title: "24/7 Alarm Monitoring",
    description: "Professional monitoring center staffed around the clock to verify alarms and dispatch response within seconds.",
    icon: "monitor",
    features: ["Live operator verification", "Instant alarm dispatch", "Video verification", "Priority escalation"],
  },
  {
    title: "Armed Response Services",
    description: "Rapid armed response teams dispatched to your location immediately upon alarm verification for real threats.",
    icon: "shield",
    features: ["Average 8-min response", "Licensed armed officers", "GPS-tracked vehicles", "Coordination with authorities"],
  },
];

export const secondaryServices = [
  { title: "CCTV Surveillance", description: "IP, PTZ, AI, and thermal camera systems with cloud storage and remote access.", icon: "camera" },
  { title: "Electric Fence Systems", description: "Perimeter deterrence and detection with monitored energizers and warning systems.", icon: "zap" },
  { title: "Fire Detection & Alarms", description: "Smoke, heat detectors and manual call points integrated with monitoring.", icon: "flame" },
  { title: "Gate Automation", description: "Sliding, swing, and barrier gate systems with access control integration.", icon: "gate" },
  { title: "Home Automation", description: "Lighting, climate, smart locks, and scenes controlled from your phone or voice.", icon: "home" },
  { title: "Smart Security Solutions", description: "Integrated intelligent security with AI analytics and remote management.", icon: "cpu" },
];

export const allServices = [
  { title: "Intruder Alarm Installation", overview: "Professional design and installation of complete intruder alarm systems tailored to your property.", benefits: ["Custom system design", "Certified engineers", "Minimal disruption", "Full training included"], process: ["Site survey", "Risk assessment", "System design", "Professional installation", "Commissioning & training"], responseTime: "Installation within 5–7 business days", cta: "Request Installation" },
  { title: "24/7 Monitoring", overview: "Round-the-clock professional monitoring with immediate alarm verification and response dispatch.", benefits: ["Always-on protection", "Instant verification", "Priority dispatch", "Detailed incident logs"], process: ["Alarm triggered", "Signal received", "Operator verification", "Response dispatched", "Incident report"], responseTime: "Signal received in under 30 seconds", cta: "Activate Monitoring" },
  { title: "Armed Response", overview: "Licensed armed response teams dispatched to your location upon verified alarm activation.", benefits: ["Rapid deployment", "Licensed officers", "Threat neutralization", "Authority coordination"], process: ["Alarm verified", "Nearest unit dispatched", "Arrival & assessment", "Threat resolution", "Incident report"], responseTime: "Average arrival within 8 minutes", cta: "Activate Armed Response" },
  { title: "Preventive Maintenance", overview: "Scheduled maintenance visits to ensure all security systems operate at peak performance.", benefits: ["Reduced false alarms", "Extended equipment life", "System reliability", "Compliance assurance"], process: ["Schedule visit", "Full system inspection", "Component testing", "Calibration & updates", "Maintenance report"], responseTime: "Quarterly visits included", cta: "Schedule Maintenance" },
  { title: "Annual Maintenance Contracts", overview: "Comprehensive AMC plans covering all your security systems with priority support.", benefits: ["Unlimited service calls", "Priority response", "Parts discount", "Annual health check"], process: ["Contract setup", "System audit", "Maintenance schedule", "Priority support queue", "Annual review"], responseTime: "Same-day service call response", cta: "Get AMC Quote" },
  { title: "Remote Monitoring", overview: "Cloud-based remote monitoring allowing you to view cameras and manage systems from anywhere.", benefits: ["Mobile app access", "Live video feeds", "Remote arming/disarming", "Push notifications"], process: ["Cloud setup", "App configuration", "User training", "Remote access enabled", "Ongoing support"], responseTime: "Real-time remote access", cta: "Setup Remote Access" },
  { title: "Emergency Repairs", overview: "24/7 emergency repair service for critical system failures and malfunctions.", benefits: ["24/7 availability", "Rapid dispatch", "Certified technicians", "Temporary security measures"], process: ["Emergency call", "Technician dispatch", "Diagnosis & repair", "System restoration", "Follow-up report"], responseTime: "Technician dispatched within 2 hours", cta: "Call Emergency Repair" },
  { title: "Security Audits", overview: "Comprehensive security assessments identifying vulnerabilities and recommending improvements.", benefits: ["Risk identification", "Compliance review", "Actionable recommendations", "Priority remediation plan"], process: ["Initial consultation", "On-site assessment", "Vulnerability analysis", "Report & recommendations", "Remediation planning"], responseTime: "Audit completed within 5 business days", cta: "Book Security Audit" },
  { title: "System Upgrades", overview: "Upgrade existing security systems with the latest technology and enhanced capabilities.", benefits: ["Latest technology", "Improved reliability", "Enhanced features", "Future-proof investment"], process: ["System evaluation", "Upgrade planning", "Component replacement", "Integration & testing", "User training"], responseTime: "Upgrade completed within 3–5 business days", cta: "Plan System Upgrade" },
];

export const productCategories = [
  {
    name: "Intruder Alarm Systems",
    icon: "bell",
    products: [
      { name: "Control Panels", description: "Intelligent control panels managing all alarm sensors and zones with programmable logic.", image: "/images/products/product-control-panel_0dae52ff.jpg", features: ["Up to 96 zones", "Wireless & wired support", "Remote programming", "Event logging"], specs: { "Power": "12V DC", "Backup": "7Ah battery", "Zones": "Up to 96", "Connectivity": "WiFi, GSM, IP" } },
      { name: "Motion Detectors", description: "PIR and dual-tech motion sensors with pet immunity and anti-mask technology.", image: "/images/products/product-motion-detector_fe0fcfcb.jpg", features: ["Pet immunity up to 40kg", "Anti-mask detection", "Dual technology", "12m range"], specs: { "Range": "12 meters", "Detection": "PIR + Microwave", "Pet Immunity": "Up to 40kg", "Power": "3V lithium" } },
      { name: "Door Sensors", description: "Magnetic contact sensors for doors and windows with tamper protection.", image: "/images/products/product-door-sensor_4f1e4276.jpg", features: ["Reed switch technology", "Tamper protection", "Wired or wireless", "Surface or flush mount"], specs: { "Gap": "Up to 50mm", "Type": "Reed switch", "Tamper": "Yes", "Power": "3V or wired" } },
      { name: "Glass Break Sensors", description: "Acoustic glass break detectors recognizing breaking glass patterns across frequencies.", image: "/images/products/product-glass-break-sensor_a327eaac.jpg", features: ["6m detection range", "Audio analysis", "Multi-pane detection", "False alarm filtering"], specs: { "Range": "6 meters", "Detection": "Acoustic", "Frequencies": "Low + High", "Power": "3V lithium" } },
      { name: "Outdoor Sensors", description: "Weather-resistant perimeter sensors for outdoor intrusion detection.", image: "/images/products/product-outdoor-sensor_0fd13f57.jpg", features: ["IP65 rated", "Anti-mask", "Pet immunity", "40m range"], specs: { "Range": "Up to 40m", "Rating": "IP65", "Detection": "Dual-tech", "Power": "9V or wired" } },
      { name: "Keypads", description: "Backlit keypads for system control with proximity tag and app integration.", image: "/images/products/product-keypad_29fa51ad.jpg", features: ["Backlit display", "Proximity tags", "App control", "Panic keys"], specs: { "Display": "Backlit LCD", "Tags": "Proximity", "Keys": "Panic + Fire", "Power": "12V DC" } },
      { name: "Sirens", description: "High-output indoor and outdoor sirens with strobe lights for visual deterrence.", image: "/images/products/product-siren_2a1ad663.jpg", features: ["118dB output", "Strobe light", "Tamper protected", "Weather resistant"], specs: { "Output": "118dB", "Strobe": "Yes", "Tamper": "Yes", "Rating": "IP54" } },
      { name: "Panic Buttons", description: "Wireless panic buttons for instant emergency alerts and response dispatch.", image: "/images/products/product-panic-button_a371132c.jpg", features: ["Wireless", "Wearable options", "Long battery life", "Silent alarm mode"], specs: { "Type": "Wireless", "Battery": "3 years", "Range": "100m", "Mounting": "Wall or wearable" } },
      { name: "Wireless Devices", description: "Complete range of wireless alarm components for flexible, cable-free installation.", image: "/images/products/product-wireless-device_1fcd3988.jpg", features: ["Two-way communication", "Encryption", "10-year battery", "Signal supervision"], specs: { "Frequency": "868MHz", "Encryption": "AES-128", "Battery": "Up to 10 years", "Supervision": "Continuous" } },
    ],
  },
  {
    name: "CCTV Systems",
    icon: "camera",
    products: [
      { name: "IP Cameras", description: "High-definition IP cameras with advanced analytics and remote viewing capabilities.", image: "/images/products/product-ip-camera_a9ff88c6.jpg", features: ["Up to 8MP resolution", "Wide dynamic range", "Night vision", "Remote access"], specs: { "Resolution": "Up to 8MP", "Lens": "2.8–12mm", "Night Vision": "Up to 50m", "Compression": "H.265+" } },
      { name: "PTZ Cameras", description: "Pan-tilt-zoom cameras with 360° coverage and auto-tracking functionality.", image: "/images/products/product-ptz-camera_3d15e3b3.jpg", features: ["360° pan", "25x optical zoom", "Auto-tracking", "Preset positions"], specs: { "Pan": "360°", "Tilt": "90°", "Zoom": "25x optical", "Presets": "Up to 300" } },
      { name: "NVR", description: "Network video recorders with large storage capacity and intelligent search.", image: "/images/products/product-nvr_bc9902c1.jpg", features: ["Up to 64 channels", "RAID storage", "Smart search", "Cloud backup"], specs: { "Channels": "Up to 64", "Storage": "Up to 80TB", "RAID": "0, 1, 5, 6", "Compression": "H.265+" } },
      { name: "AI Cameras", description: "AI-powered cameras with facial recognition, object detection, and behavior analysis.", image: "/images/products/product-ai-camera_9546acdf.jpg", features: ["Facial recognition", "Object detection", "Line crossing", "Intrusion detection"], specs: { "AI": "Deep learning", "Faces": "Up to 100,000", "Accuracy": "99.5%", "Processing": "Edge AI" } },
      { name: "Thermal Cameras", description: "Thermal imaging cameras for perimeter protection in all lighting conditions.", image: "/images/products/product-thermal-camera_1677d4af.jpg", features: ["See in total darkness", "Temperature measurement", "Fire detection", "Long range"], specs: { "Resolution": "384×288", "Range": "Up to 300m", "Sensitivity": "<40mK", "Detection": "Human, vehicle, fire" } },
      { name: "Video Analytics", description: "Advanced video analytics software for intelligent event detection and search.", image: "/images/products/product-video-analytics_5581bbdb.jpg", features: ["Motion detection", "Object left", "Crowd detection", "License plate recognition"], specs: { "Analytics": "20+ rules", "LPR": "Yes", "Integration": "ONVIF", "Platform": "Cloud or on-premise" } },
    ],
  },
  {
    name: "Electric Fence",
    icon: "zap",
    products: [
      { name: "Energizers", description: "High-voltage energizers delivering safe but effective deterrent pulses to perimeter fences.", image: "/images/products/product-energizer_8348abe5.jpg", features: ["10,000V pulse", "Zone monitoring", "Low power mode", "Battery backup"], specs: { "Voltage": "Up to 10,000V", "Zones": "Up to 10", "Backup": "12V battery", "Compliance": "IEC 60335" } },
      { name: "Fence Monitoring", description: "Real-time fence monitoring systems detecting intrusion attempts and tampering.", image: "/images/products/product-fence-monitor_e30aa0a1.jpg", features: ["Cut detection", "Climb detection", "Tamper alarm", "Zone mapping"], specs: { "Detection": "Cut, climb, tamper", "Zones": "Up to 10", "Response": "<1 second", "Interface": "TCP/IP" } },
      { name: "Warning Systems", description: "Audio and visual warning systems that activate upon fence approach or breach.", image: "/images/products/product-warning-system_52e4c14b.jpg", features: ["Voice warnings", "Strobe lights", "Pre-recorded messages", " programmable zones"], specs: { "Audio": "Up to 110dB", "Messages": "Pre-recorded", "Lights": "LED strobe", "Trigger": "Approach or breach" } },
      { name: "Accessories", description: "Complete range of electric fence accessories including insulators, posts, and wiring.", image: "/images/products/product-fence-accessories_a7a5b2c0.jpg", features: ["Insulators", "Fence posts", "Grounding kits", "Warning signs"], specs: { "Material": "UV-stabilized", "Warranty": "5 years", "Compliance": "IEC standards", "Installation": "Professional" } },
    ],
  },
  {
    name: "Fire Detection",
    icon: "flame",
    products: [
      { name: "Smoke Detectors", description: "Photoelectric and ionization smoke detectors with early warning capabilities.", image: "/images/products/product-smoke-detector_1fb36b49.jpg", features: ["Photoelectric sensing", "Heat backup", "Low battery alert", "Interconnectable"], specs: { "Type": "Photoelectric", "Sensitivity": "EN54-7", "Power": "9V or 12V", "Temperature": "-10°C to +55°C" } },
      { name: "Heat Detectors", description: "Fixed temperature and rate-of-rise heat detectors for harsh environments.", image: "", features: ["Fixed 57°C", "Rate-of-rise", "Spark-free", "Dust resistant"], specs: { "Type": "Fixed + ROR", "Threshold": "57°C", "Rate": "8°C/min", "Rating": "IP54" } },
      { name: "Manual Call Points", description: "Emergency manual call points for fire alarm activation with reset mechanism.", image: "", features: ["Break-glass design", "Resettable", "LED indicator", "Weatherproof options"], specs: { "Type": "Break-glass", "Reset": "Key or test", "Indicator": "LED", "Rating": "IP54 optional" } },
      { name: "Control Panels", description: "Intelligent fire alarm control panels with addressable detection and zoning.", image: "", features: ["Addressable loops", "Cause & effect", "Event log", "Integration ready"], specs: { "Loops": "Up to 8", "Devices": "Up to 240/loop", "Zones": "Up to 200", "Interface": "TCP/IP, RS485" } },
      { name: "Notification Devices", description: "Sounders, strobes, and beacons for audible and visual fire alarm notification.", image: "", features: ["Up to 115dB", "LED strobe", "Multi-tone", "Weatherproof"], specs: { "Output": "Up to 115dB", "Tones": "32 selectable", "Strobe": "LED", "Rating": "IP54" } },
    ],
  },
  {
    name: "Gate Automation",
    icon: "gate",
    products: [
      { name: "Sliding Gates", description: "Automated sliding gate systems for residential and commercial entrances.", image: "", features: ["Up to 1200kg", "Soft start/stop", "Obstacle detection", "Remote control"], specs: { "Capacity": "Up to 1200kg", "Speed": "12m/min", "Motor": "24V DC", "Safety": "Photocell + edge" } },
      { name: "Swing Gates", description: "Electromechanical swing gate operators for double-leaf gate entrances.", image: "", features: ["Up to 500kg/leaf", "Adjustable speed", "Anti-crush", "Battery backup"], specs: { "Capacity": "Up to 500kg/leaf", "Opening": "90° in 15s", "Motor": "24V DC", "Backup": "Yes" } },
      { name: "Barrier Systems", description: "Boom barrier systems for parking lots and vehicle access control.", image: "", features: ["Up to 6m boom", "Fast operation", "Safety photocells", "Ticket dispenser"], specs: { "Boom": "Up to 6m", "Speed": "1.5–6 seconds", "Motor": "24V DC", "Safety": "Photocell + loop" } },
      { name: "Access Control", description: "Card, biometric, and mobile-based access control systems for gates and doors.", image: "", features: ["RFID cards", "Fingerprint", "Mobile credentials", "Visitor management"], specs: { "Methods": "Card, biometric, mobile", "Users": "Up to 30,000", "Connectivity": "TCP/IP", "Integration": "ONVIF, Wiegand" } },
    ],
  },
  {
    name: "Home Automation",
    icon: "home",
    products: [
      { name: "Lighting Control", description: "Smart lighting systems with scene control, scheduling, and remote operation.", image: "", features: ["Scene control", "Dimming", "Color tuning", "Scheduling"], specs: { "Control": "App, voice, switch", "Protocols": "Zigbee, Z-Wave", "Dimming": "0–100%", "Scenes": "Unlimited" } },
      { name: "Curtain Control", description: "Automated curtain and blind control integrated with smart home scenes.", image: "", features: ["Motorized tracks", "Schedule control", "Scene integration", "Sunrise/sunset"], specs: { "Control": "App, voice", "Motor": "Quiet DC", "Tracks": "Custom sizes", "Integration": "Zigbee" } },
      { name: "Smart Locks", description: "Keyless smart door locks with multiple access methods and audit trails.", image: "", features: ["Fingerprint", "PIN code", "RFID card", "Remote unlock"], specs: { "Methods": "Fingerprint, PIN, card, app", "Battery": "Up to 12 months", "Audit": "Full log", "Backup": "Mechanical key" } },
      { name: "Climate Control", description: "Smart thermostat and HVAC control for energy-efficient temperature management.", image: "", features: ["Smart scheduling", "Geo-fencing", "Energy reports", "Multi-zone"], specs: { "Control": "App, voice", "Zones": "Up to 16", "Savings": "Up to 30%", "Protocols": "Zigbee, WiFi" } },
      { name: "Energy Monitoring", description: "Real-time energy monitoring and reporting for optimized consumption.", image: "", features: ["Real-time data", "Historical reports", "Cost tracking", "Alerts"], specs: { "Monitoring": "Per circuit", "Accuracy": "±1%", "Reports": "Daily, weekly, monthly", "Alerts": "Threshold-based" } },
      { name: "Scenes", description: "Pre-configured automation scenes combining lighting, climate, security, and more.", image: "", features: ["One-tap scenes", "Custom scenes", "Schedule-based", "Event-triggered"], specs: { "Scenes": "Unlimited", "Triggers": "Time, location, event", "Devices": "All compatible", "Control": "App, voice" } },
      { name: "Voice Control", description: "Integration with Amazon Alexa, Google Assistant, and Apple HomeKit for hands-free control.", image: "", features: ["Alexa compatible", "Google Assistant", "Apple HomeKit", "Custom commands"], specs: { "Platforms": "Alexa, Google, HomeKit", "Commands": "Custom", "Languages": "Multi-language", "Privacy": "Local processing" } },
    ],
  },
];

export const solutions = [
  { name: "Residential Security", challenges: ["Burglary and home invasion risks", "False alarm management", "Family safety while away", "Integration with smart home"], technologies: ["Intruder alarm systems", "CCTV with remote access", "Smart locks", "24/7 monitoring"], benefits: ["Complete home protection", "Remote monitoring", "Instant alerts", "Insurance benefits"] },
  { name: "Commercial Security", challenges: ["Theft and vandalism", "Employee safety", "Access management", "After-hours protection"], technologies: ["Access control", "CCTV surveillance", "Intrusion detection", "Armed response"], benefits: ["Reduced losses", "Employee safety", "Access audit trails", "24/7 protection"] },
  { name: "Industrial Security", challenges: ["Large perimeter protection", "Equipment theft", "Safety compliance", "Hazardous area monitoring"], technologies: ["Electric fencing", "Thermal cameras", "Perimeter detection", "Monitoring"], benefits: ["Perimeter security", "Theft prevention", "Compliance", "Reduced incidents"] },
  { name: "Retail Security", challenges: ["Shoplifting", "Employee theft", "Inventory shrinkage", "Customer safety"], technologies: ["CCTV with analytics", "EAS integration", "Panic buttons", "Monitoring"], benefits: ["Reduced shrinkage", "Theft deterrence", "Staff safety", "Evidence capture"] },
  { name: "Warehouse Protection", challenges: ["Large area coverage", "Inventory theft", "Loading dock security", "Access control"], technologies: ["Perimeter detection", "CCTV surveillance", "Access control", "Armed response"], benefits: ["Inventory protection", "Access control", "24/7 monitoring", "Rapid response"] },
  { name: "Corporate Offices", challenges: ["Access management", "Visitor tracking", "Data room security", "Employee safety"], technologies: ["Access control", "CCTV", "Visitor management", "Intrusion detection"], benefits: ["Secure access", "Visitor tracking", "Data protection", "Employee safety"] },
  { name: "Banks", challenges: ["Robbery prevention", "Vault security", "Customer safety", "Regulatory compliance"], technologies: ["Panic buttons", "CCTV with analytics", "Access control", "Armed response"], benefits: ["Robbery deterrence", "Vault protection", "Rapid response", "Compliance"] },
  { name: "Educational Institutions", challenges: ["Campus safety", "Access control", "Emergency response", "Student protection"], technologies: ["Access control", "CCTV", "Emergency alerts", "Monitoring"], benefits: ["Campus security", "Controlled access", "Emergency response", "Parent peace of mind"] },
  { name: "Healthcare", challenges: ["Patient safety", "Drug storage security", "Access control", "24/7 operation"], technologies: ["Access control", "CCTV", "Panic buttons", "Monitoring"], benefits: ["Patient protection", "Drug security", "Staff safety", "Continuous monitoring"] },
  { name: "Telecommunication Infrastructure", challenges: ["Remote site protection", "Equipment theft", "Copper theft", "Vandalism"], technologies: ["Perimeter detection", "CCTV", "Intrusion detection", "Remote monitoring"], benefits: ["Site protection", "Theft prevention", "Remote monitoring", "Rapid response"] },
  { name: "Luxury Homes", challenges: ["High-value asset protection", "Privacy", "Aesthetic integration", "Discreet security"], technologies: ["Smart security", "CCTV", "Perimeter detection", "24/7 monitoring"], benefits: ["Discreet protection", "Smart integration", "Privacy preservation", "Premium service"] },
];

export const industries = [
  "Residential", "Corporate Offices", "Banks", "Retail", "Factories", "Warehouses",
  "Educational Institutions", "Healthcare", "Telecommunication Infrastructure", "Restaurants & Cafes", "Hotels & Apartments", "Luxury Homes",
];

export const trustIndicators = [
  { value: "15+", label: "Years of Experience" },
  { value: "24/7", label: "Professional Monitoring" },
  { value: "<8min", label: "Rapid Armed Response" },
  { value: "100%", label: "Certified Engineers" },
  { value: "5,000+", label: "Systems Installed" },
  { value: "24/7", label: "Residential & Commercial" },
];

export const whyChooseHLS = [
  { title: "Professional Installation", description: "Certified engineers ensure every component is installed to the highest industry standards.", icon: "wrench" },
  { title: "Round-the-clock Monitoring", description: "Our monitoring center never sleeps — your protection is active 24/7/365.", icon: "monitor" },
  { title: "Immediate Alarm Verification", description: "Every alarm is verified before dispatch, minimizing false alarms and ensuring real response.", icon: "check" },
  { title: "Rapid Armed Response", description: "Licensed armed response teams arrive within minutes of verified alarm activation.", icon: "shield" },
  { title: "Preventive Maintenance", description: "Scheduled maintenance keeps your systems performing at peak reliability year-round.", icon: "calendar" },
  { title: "Latest Security Technology", description: "We deploy enterprise-grade equipment from leading global security manufacturers.", icon: "cpu" },
];

export const howItWorks = [
  { step: "01", title: "Free Security Survey", description: "We assess your property and identify vulnerabilities at no cost." },
  { step: "02", title: "Risk Assessment", description: "Detailed analysis of threats and security gaps specific to your environment." },
  { step: "03", title: "System Design", description: "Custom security solution designed around your unique requirements." },
  { step: "04", title: "Professional Installation", description: "Certified engineers install your system with minimal disruption." },
  { step: "05", title: "24/7 Monitoring", description: "Your system goes live with professional monitoring from day one." },
  { step: "06", title: "Emergency Response", description: "Armed response dispatched immediately upon verified alarm activation." },
];

export const testimonials = [
  { quote: "HLS transformed our security infrastructure. The 24/7 monitoring gives us complete peace of mind knowing our facility is always protected.", author: "James Mitchell", role: "Operations Director", company: "Meridian Logistics" },
  { quote: "When our alarm was triggered at 3 AM, HLS armed response arrived in under 8 minutes. That's real protection, not just a system.", author: "Sarah Chen", role: "Property Manager", company: "Vertex Residential" },
  { quote: "The professionalism of the HLS team is unmatched. From survey to installation to ongoing monitoring — every step was flawless.", author: "David Okonkwo", role: "Facility Head", company: "Apex Banking Group" },
  { quote: "We switched from our previous provider to HLS and the difference is night and day. Faster response, better technology, superior service.", author: "Maria Rodriguez", role: "CEO", company: "Boutique Retail Chain" },
];

export const faqs = [
  { question: "What makes HLS different from other security companies?", answer: "HLS provides complete protection — not just installation. We combine advanced intruder alarm systems with professional 24/7 monitoring and rapid armed response. This means every alarm is verified by a live operator and met with immediate physical response, not just a phone call." },
  { question: "How quickly does armed response arrive?", answer: "Our armed response teams are strategically positioned across our service areas. The average response time is under 8 minutes from alarm verification. All our officers are licensed, trained, and GPS-tracked for accountability." },
  { question: "Do you offer security solutions for both homes and businesses?", answer: "Yes. HLS designs and installs security systems for residential, commercial, industrial, and enterprise clients. From single-family homes to multi-site corporate facilities, we tailor every solution to the specific needs and risk profile of the property." },
  { question: "What happens when an alarm is triggered?", answer: "When an alarm activates, the signal is instantly transmitted to our 24/7 monitoring center. A live operator verifies the alarm (often using video verification), and if confirmed, immediately dispatches armed response and contacts you and your emergency contacts." },
  { question: "Do you provide maintenance for existing security systems?", answer: "Yes. We offer preventive maintenance, annual maintenance contracts (AMC), and emergency repair services for both HLS-installed systems and existing systems from other providers. Our AMC plans include priority support and discounted parts." },
  { question: "Can I monitor my security system remotely?", answer: "Absolutely. All HLS systems include a mobile app that lets you view live camera feeds, arm/disarm your system, receive push notifications, and manage access — all from your smartphone, tablet, or computer, anywhere in the world." },
  { question: "How much does a security system cost?", answer: "Every property is unique, so we provide custom quotes based on your specific needs. We offer free security assessments and transparent pricing with no hidden fees. Contact us to schedule your free assessment and receive a detailed quote." },
  { question: "Are your systems compatible with smart home automation?", answer: "Yes. Our security systems integrate seamlessly with home automation including lighting, climate, smart locks, and voice control. You can create scenes that arm your security system, lock doors, and adjust lighting all at once." },
];
