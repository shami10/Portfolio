export const site = {
  name: "Ahtasham Anjum",
  role: "Senior UI/UX and Product Designer",
  statement: "I design digital products that make complex things feel simple.",
  email: "ahtashamanjum1@gmail.com",
  linkedin: "https://www.linkedin.com/in/ahtasham-designer",
  resume: "/Ahtasham-Anjum-Resume.pdf",
  location: "Pakistan",
  years: 9,
};

export type Job = { role: string; company: string; period: string; points: string[] };

export const experience: Job[] = [
  {
    role: "Freelance UI/UX Designer",
    company: "Independent",
    period: "Mar 2026 – Present",
    points: [
      "Working with clients on a project basis on UI/UX design.",
      "Open to full-time Senior UI/UX, Lead Product Design and Product Design roles.",
    ],
  },
  {
    role: "Founder and Product Designer",
    company: "Wearpik",
    period: "Mar 2025 – Mar 2026",
    points: [
      "Founded and designed Wearpik, managing branding, product design and digital presence.",
      "Created e-commerce and social media campaigns, product presentations and visual systems.",
    ],
  },
  {
    role: "Design Lead",
    company: "JinnByte",
    period: "Mar 2024 – Feb 2025",
    points: [
      "Led UX and UI for web and mobile products, including research, prototyping and design delivery.",
      "Managed and mentored designers while personally contributing to key screens, flows and design decisions.",
      "Designed live products end to end, including BUFF, Facebloom and Reteta.",
    ],
  },
  {
    role: "Design Lead",
    company: "Devrol Solutions",
    period: "Sep 2021 – Feb 2024",
    points: [
      "Guided design direction while personally executing core UX flows, prototypes and UI systems.",
      "Delivered the Heraf learning platform end to end.",
    ],
  },
  {
    role: "Senior Designer",
    company: "EpicSoft",
    period: "Jun 2020 – Aug 2021",
    points: ["Designed and shipped user-centered web and mobile interfaces, working closely with developers and stakeholders."],
  },
  { role: "Associate Designer", company: "Paksa IT Solutions", period: "Oct 2019 – May 2020", points: [] },
  { role: "Associate Designer", company: "Villaex Technologies", period: "Sep 2017 – Aug 2019", points: [] },
];

export const snapshot: { text: string; links?: { label: string; href: string }[] }[] = [
  { text: "Web and mobile product design", links: [{ label: "BUFF", href: "/work/buff/" }, { label: "Facebloom", href: "/work/facebloom/" }, { label: "GelaMeat", href: "/work/gelameat/" }] },
  { text: "SaaS and data-heavy dashboard UX", links: [{ label: "Live Session Dashboard", href: "/work/live-session-dashboard/" }, { label: "GelaMeat POS", href: "/work/gelameat/" }] },
  { text: "Information architecture and complex user flows", links: [{ label: "Heraf", href: "/work/heraf-lms/" }, { label: "Visionet", href: "/work/visionet-homepage/" }] },
  { text: "Design systems and interaction design" },
  { text: "AI-powered product experiences", links: [{ label: "Facebloom", href: "/work/facebloom/" }, { label: "MoodBites", href: "/work/moodbites/" }] },
  { text: "Leading and mentoring designers, at JinnByte and Devrol Solutions" },
];

export const principles = [
  { icon: "understand", title: "Understand the problem", text: "Clarify the user needs, business context, constraints and underlying problem before deciding what to design." },
  { icon: "structure", title: "Structure the experience", text: "Organize information, simplify navigation, map user flows and make complicated tasks easier to understand." },
  { icon: "design", title: "Design with intention", text: "Use hierarchy, interaction patterns, visual systems and meaningful feedback to guide users through the experience." },
  { icon: "deliver", title: "Refine and deliver", text: "Validate decisions where appropriate, iterate on the design and prepare clear, consistent deliverables for development." },
] as const;

export const capabilities = [
  { group: "Product strategy and UX", items: ["Problem framing", "Information architecture", "User flows", "Wireframing", "UX improvement"] },
  { group: "Interface and interaction design", items: ["UI design", "Interaction design", "Responsive experiences", "Prototyping", "Design systems"] },
  { group: "Product types", items: ["SaaS and enterprise dashboards", "Web applications", "Mobile applications", "Marketing websites", "AI-powered product experiences"] },
  { group: "Tools", items: ["Figma", "FigJam", "Adobe XD", "Photoshop", "Illustrator"] },
];

export const lessons = [
  { title: "Good UX begins with structure", text: "A visually polished interface cannot make up for confusing information architecture or unclear workflows." },
  { title: "Every screen has a job", text: "Each section, component and interaction should help users understand information or complete a task." },
  { title: "Complexity needs hierarchy", text: "Dense products need deliberate prioritization, meaningful status cues and clear paths to action." },
  { title: "Design is a collaborative process", text: "Good product design depends on clarifying requirements, communicating trade-offs and working well with product managers and developers." },
];

export const approach = [
  "Understand the context and constraints.",
  "Identify the important user tasks and information.",
  "Structure the experience and map key flows.",
  "Explore layouts and interaction patterns.",
  "Refine the interface and reusable components.",
  "Prepare prototypes and development-ready handoff.",
  "Iterate based on feedback and validation where available.",
];

export const strengths: { title: string; links?: { label: string; href: string }[] }[] = [
  { title: "Simplifying complex workflows", links: [{ label: "Live Session Dashboard", href: "/work/live-session-dashboard/" }] },
  { title: "Information architecture and UX hierarchy", links: [{ label: "Heraf", href: "/work/heraf-lms/" }, { label: "Visionet", href: "/work/visionet-homepage/" }] },
  { title: "Dashboard and enterprise interface design", links: [{ label: "GelaMeat POS", href: "/work/gelameat/" }, { label: "Heraf admin portal", href: "/work/heraf-lms/" }] },
  { title: "End-to-end UI/UX thinking", links: [{ label: "BUFF", href: "/work/buff/" }, { label: "Facebloom", href: "/work/facebloom/" }, { label: "Heraf", href: "/work/heraf-lms/" }] },
  { title: "Visual consistency and component-based design", links: [{ label: "GelaMeat", href: "/work/gelameat/" }] },
  { title: "Clear collaboration with product and development teams" },
  { title: "Exploring AI-powered experiences", links: [{ label: "MoodBites", href: "/work/moodbites/" }, { label: "Facebloom", href: "/work/facebloom/" }] },
];

export const toolGroups = [
  { group: "Design", items: ["Figma (primary)", "FigJam", "Adobe XD", "Photoshop", "Illustrator", "Sketch"] },
  { group: "Prototyping and handoff", items: ["Framer", "InVision", "Zeplin"] },
  { group: "Collaboration", items: ["Asana"] },
  { group: "Working methods", items: ["Prototyping", "Component libraries", "Responsive design", "Interaction specifications", "Developer handoff"] },
];

export const beyond = {
  development: ["React", "Laravel", "WordPress", "Shopify", "HTML", "CSS", "JavaScript"],
  marketing: ["Meta ads", "SEO setup", "Ad creative for Google and Meta", "Running and optimizing campaigns"],
};

export const opportunities = [
  "Senior UI/UX Designer roles",
  "Lead UI/UX Designer roles",
  "Product Designer roles",
  "AI Product Designer opportunities",
  "Relevant freelance or product design collaborations",
];
