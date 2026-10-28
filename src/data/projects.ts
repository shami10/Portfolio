export type Focus = { x: number; y: number; scale: number };
export type Step = { image: string; title: string; text: string; focus?: Focus };
export type GalleryItem = { image: string; caption: string };

export type Block =
  | { type: "text"; title: string; body: string[]; list?: string[] }
  | { type: "story"; title: string; intro?: string; device: "phone" | "browser" | "zoom"; steps: Step[] }
  | { type: "gallery"; title: string; intro?: string; layout: "phones" | "tablet" | "wide"; items: GalleryItem[] }
  | { type: "flow"; title: string; intro?: string; steps: { title: string; text: string }[] }
  | { type: "list"; title: string; items: string[] };

export type Kind = "live" | "client" | "concept";
export type Category = "Mobile" | "Web" | "Dashboard" | "AI";

export type Project = {
  slug: string;
  title: string;
  featured: boolean;
  kind: Kind;
  label: string;
  categories: Category[];
  tagline: string;
  cover: string;
  role: string;
  platform: string;
  tools?: string;
  intro: string[];
  links?: { label: string; url: string }[];
  note?: string;
  blocks: Block[];
  type: string;
  challenge?: string;
  scope: string[];
  outcome: string[];
};

const gelameatUser: Step[] = [
  { image: "gelameat/user-1", title: "A clear way in", text: "A full-bleed product image and one action. Nothing competes with Get started." },
  { image: "gelameat/user-2", title: "Three ways to order", text: "Delivery, pick-up and catering are each one tap from home, with offers below." },
  { image: "gelameat/user-3", title: "Browsing by category", text: "Search, category chips and clear prices keep a long catalog easy to scan." },
  { image: "gelameat/user-4", title: "The item page", text: "Photo, price, delivery estimate and variants, with the total and add-to-cart bar always in reach." },
  { image: "gelameat/user-5", title: "Checkout", text: "Variants and modifiers listed in the order summary, with the price breakdown and promo applied." },
  { image: "gelameat/user-6", title: "Payment and confirmation", text: "Card or cash on delivery, then a confirmation that states the delivery time." },
  { image: "gelameat/user-7", title: "Arabic and English", text: "The language can be switched from the start, and the interface supports both." },
];

const moodSteps: Step[] = [
  { image: "mood/s-1", title: "The promise", text: "A splash screen that states the idea: your mood, your meal." },
  { image: "mood/s-2", title: "One action", text: "The welcome screen explains the product in a sentence and offers a single button, Find My Meal." },
  { image: "mood/s-3", title: "Location first", text: "Location is requested before recommending, with a manual option for people who prefer it." },
  { image: "mood/s-4", title: "Confirm on a map", text: "A map confirmation so delivery details are right before any ordering starts." },
  { image: "mood/s-5", title: "How are you feeling?", text: "Home opens with a question, not a menu. Four mood chips, a free-text craving field and quick filters such as Something Quick and Budget-friendly." },
  { image: "mood/s-6", title: "A moment to wait", text: "A short loading state that tells people what is happening: finding the perfect meal based on mood and preferences." },
  { image: "mood/s-7", title: "A top pick, with options", text: "The recommendation screen leads with one top pick for the chosen mood, followed by more options tagged by feeling, such as Comfort pick." },
  { image: "mood/s-8", title: "Why this for you", text: "Before customizing, a short note explains why the meal fits the mood, so the AI suggestion feels understandable." },
  { image: "mood/s-9", title: "Cart", text: "Quantity controls and a swipe action to remove an item." },
  { image: "mood/s-10", title: "Checkout", text: "Address and payment on one screen, with the total always visible." },
  { image: "mood/s-11", title: "Order confirmed", text: "A confirmation that carries the idea through to the end, with Track Order as the next action." },
];

type Base = Omit<Project, "type" | "scope" | "outcome" | "challenge">;
const baseProjects: Base[] = [
  {
    slug: "gelameat",
    title: "GelaMeat",
    featured: true,
    kind: "client",
    label: "Client project",
    categories: ["Mobile", "Dashboard"],
    tagline: "A meat delivery, pick-up and catering app, with a tablet app for order takers and a POS back office.",
    cover: "covers/gelameat",
    role: "UI/UX designer",
    platform: "Customer mobile app, order-taker tablet app and POS web dashboard",
    tools: "Figma",
    intro: [
      "GelaMeat lets customers order meat for delivery, pick-up or catering. Behind the customer app, staff take and manage orders on a tablet, and managers run the business from a POS dashboard covering inventory, purchases, items and user roles.",
      "The three surfaces share one brand, one type system and one visual language, so each is recognizable as part of the same product while being built for a different job.",
    ],
    blocks: [
      { type: "story", title: "The customer app", device: "phone", steps: gelameatUser },
      {
        type: "gallery",
        title: "The order-taker tablet app",
        intro: "Staff create orders for customers and manage the orders coming in, all on a tablet.",
        layout: "tablet",
        items: [
          { image: "gelameat/taker-1", caption: "Create an order: delivery, pick-up or catering." },
          { image: "gelameat/taker-2", caption: "Incoming orders, with accept and cancel on each card." },
          { image: "gelameat/taker-3", caption: "Order details: bill summary, modifiers and special instructions." },
          { image: "gelameat/taker-4", caption: "Completing payment by card, cash or split payment." },
          { image: "gelameat/taker-5", caption: "History with filters for order type, date and payment status." },
        ],
      },
      {
        type: "gallery",
        title: "The POS dashboard",
        intro: "A web dashboard for managers. Select any screen to inspect it at full size.",
        layout: "wide",
        items: [
          { image: "gelameat/pos-1", caption: "Dashboard: sales trend, sales by product, order summary and staff summary." },
          { image: "gelameat/pos-2", caption: "Inventory listing with search and filters by branch, category and type." },
          { image: "gelameat/pos-3", caption: "Adding raw materials and sale items, with branch selection and a thumbnail." },
          { image: "gelameat/pos-4", caption: "Purchase entry with supplier details, invoice attachment, line items, tax and totals." },
          { image: "gelameat/pos-5", caption: "Item detail: stock, pricing and dates, with the item’s transaction history." },
          { image: "gelameat/pos-6", caption: "Custom roles with view, add and modify permissions for each module." },
        ],
      },
    ],
  },
  {
    slug: "live-session-dashboard",
    title: "Live Session Dashboard",
    featured: true,
    kind: "concept",
    label: "Concept (design assessment)",
    categories: ["Dashboard"],
    tagline: "Making complex research sessions easier to manage: one workspace to monitor participants, spot problems and act.",
    cover: "covers/live",
    role: "UI/UX designer",
    platform: "Web dashboard",
    tools: "Figma",
    intro: [
      "Managing a live research session gets harder as the number of participants grows. Operators need to see how the session is going, find the participants who need help, and respond quickly.",
      "The challenge was to bring session information and participant activity into one organized workspace, balancing information density with clarity so the operator always knows what needs attention next.",
    ],
    note: "Design assessment concept. It is not a launched product and was not tested with real operators.",
    blocks: [
      {
        type: "story",
        title: "Reading the dashboard",
        intro: "Scroll to move through the main screen. Each step zooms into the part of the design it describes.",
        device: "zoom",
        steps: [
          { image: "live/dashboard", title: "The whole workspace", text: "Session health at the top, the participant list in the middle, and supporting information at the side." },
          { image: "live/dashboard", title: "Session health first", text: "Five summary cards and one progress bar answer the first question: is the session going as expected? The Need Attention card is the only one tinted red.", focus: { x: 0.52, y: 0.22, scale: 1.7 } },
          { image: "live/dashboard", title: "Exceptions are visible", text: "Status labels are consistent, and a participant who needs attention gets a tinted row, so operators do not have to inspect every line.", focus: { x: 0.32, y: 0.67, scale: 1.9 } },
          { image: "live/dashboard", title: "Search, filter, sort, act", text: "The controls for finding and managing participants sit directly above the table they affect, including bulk actions.", focus: { x: 0.52, y: 0.42, scale: 2.3 } },
          { image: "live/dashboard", title: "Secondary information stays secondary", text: "Recent activity, notifications and upcoming milestones sit in a narrow column, available without competing with the participant list.", focus: { x: 0.88, y: 0.55, scale: 2.1 } },
        ],
      },
      {
        type: "gallery",
        title: "Acting without leaving the page",
        intro: "Opening a participant shows a side panel, so the operator keeps the list in view. The panel leads with the problem and the action: no activity for six minutes, with Send Reminder right beside it.",
        layout: "phones",
        items: [{ image: "live/drawer", caption: "Participant details: status, progress, timeline and connection, with Send Reminder, Message, Flag and End Participation." }],
      },
      {
        type: "flow",
        title: "The main workflow",
        intro: "The layout is built around the shortest path from noticing a problem to doing something about it.",
        steps: [
          { title: "Identify an issue", text: "The Need Attention card and the tinted row draw the eye." },
          { title: "Find the participant", text: "Search, filter and sort narrow a long list." },
          { title: "Review details", text: "A side panel shows progress, timeline and connection." },
          { title: "Take action", text: "Send a reminder, message, flag or end the participation." },
        ],
      },
      {
        type: "list",
        title: "Design decisions",
        items: [
          "Separate overall session health from individual participant details.",
          "Use consistent status indicators and labels.",
          "Prioritize exceptions and attention-needed states.",
          "Make search and filtering prominent in participant-heavy views.",
          "Keep frequently used actions close to the information they affect.",
          "Use compact, readable data layouts instead of decoration.",
          "Preserve context when moving between the table and participant details.",
        ],
      },
      {
        type: "list",
        title: "What I would validate next",
        items: [
          "Whether operators can find an attention-needed participant faster with the tinted row than without it.",
          "How the layout holds up with several hundred participants and several concurrent sessions.",
          "Which bulk actions operators use most, so the toolbar can be trimmed.",
        ],
      },
    ],
  },
  {
    slug: "facebloom",
    title: "Facebloom",
    featured: true,
    kind: "live",
    label: "Client project at JinnByte, live on the App Store",
    categories: ["Mobile", "AI"],
    tagline: "An AI-driven face analysis app that rates facial features and gives personalized skincare and grooming tips.",
    cover: "covers/facebloom",
    role: "UI/UX designer, end to end",
    platform: "iOS app",
    intro: [
      "Facebloom starts with a face photo and turns it into scores and personalized recommendations. The design had to make AI output understandable: what was measured, what the numbers mean, and what to do next.",
      "I designed the product end to end at JinnByte, covering the UX decisions and the interface.",
    ],
    links: [{ label: "View on the App Store", url: "https://apps.apple.com/us/app/facebloom/id6477335863" }],
    note: "Images are from the public App Store listing. As the listing states, Facebloom is not a substitute for medical advice.",
    blocks: [
      {
        type: "story",
        title: "From photo to recommendations",
        device: "phone",
        steps: [
          { image: "facebloom/s-1", title: "Start with a face photo", text: "The first screen explains the value in one line and offers a single action." },
          { image: "facebloom/s-2", title: "Results at a glance", text: "A large score ring answers the main question first, with a clear next step." },
          { image: "facebloom/s-3", title: "Ratings by feature", text: "Overall, potential and individual features such as jawline, cheekbones, nose and lips, each with its own ring." },
          { image: "facebloom/s-4", title: "Personalized recommendations", text: "Tips arrive as short cards covering skincare, grooming and fitness, so each one can be read in a glance." },
          { image: "facebloom/s-5", title: "Family profiles", text: "Several profiles can be managed under one subscription." },
        ],
      },
    ],
  },
  {
    slug: "moodbites",
    title: "MoodBites",
    featured: true,
    kind: "concept",
    label: "Concept",
    categories: ["Mobile", "AI"],
    tagline: "An AI-powered food recommendation app that starts from how you feel, not what you want to eat.",
    cover: "covers/mood",
    role: "UI/UX designer",
    platform: "Mobile app",
    tools: "Figma",
    intro: [
      "Choosing what to eat gets tiring when you are tired, stressed or celebrating. MoodBites explores an AI recommendation experience that begins with a mood instead of a menu.",
      "The design focuses on how people tell the system how they feel, how recommendations are presented, and how the product explains why a meal was suggested.",
    ],
    note: "Concept project. The recommendation logic shown is illustrative.",
    blocks: [
      { type: "story", title: "The journey, screen by screen", device: "phone", steps: moodSteps },
      {
        type: "list",
        title: "Design decisions",
        items: [
          "Ask about mood first, with chips for speed and a text field for people who know what they want.",
          "Lead with one top pick, then show alternatives, so the recommendation feels like a decision rather than a list.",
          "Explain each recommendation with a short “Why this for you” note to build trust in the AI.",
          "Keep the ordering flow short so the mood idea does not get lost behind checkout.",
        ],
      },
      {
        type: "list",
        title: "What I would test next",
        items: [
          "Whether people choose the top pick, and how often they open the alternatives.",
          "Whether the explanation note changes how much people trust the suggestion.",
          "How well the mood chips cover real feelings, and whether free text should come first for some users.",
        ],
      },
    ],
  },
  {
    slug: "heraf-lms",
    title: "Heraf learning platform",
    featured: true,
    kind: "client",
    label: "Client project at Devrol Solutions",
    categories: ["Dashboard", "Web", "Mobile"],
    tagline: "A learning platform for a skills training center, with admin, faculty and student portals and a student mobile app.",
    cover: "covers/heraf",
    role: "UI/UX designer, delivered end to end",
    platform: "Web portals and mobile app",
    tools: "Figma",
    intro: [
      "Heraf is a skills learning center. The platform serves three groups with different jobs: administrators who manage courses, enrollment and approvals, faculty who run classes, and students who follow their courses on the web and on their phones.",
      "I delivered the design end to end at Devrol Solutions. The interface supports Arabic and English through a language toggle.",
    ],
    blocks: [
      {
        type: "gallery",
        title: "Admin portal",
        intro: "A dark, dense workspace for staff who spend the day in tables and forms. Select a screen to inspect it.",
        layout: "wide",
        items: [
          { image: "heraf/admin-1", caption: "Dashboard with course news, headline counts and an activity log." },
          { image: "heraf/admin-2", caption: "Course management: a filterable list with status." },
          { image: "heraf/admin-3", caption: "Enrollment requests with search and filters." },
          { image: "heraf/admin-4", caption: "Registration approvals for new users." },
          { image: "heraf/admin-5", caption: "Adding a course: category, schedule, duration, fee and instructor." },
          { image: "heraf/admin-6", caption: "Student list with course and status." },
        ],
      },
      {
        type: "gallery",
        title: "Faculty portal",
        layout: "wide",
        items: [
          { image: "heraf/faculty-1", caption: "Faculty dashboard." },
          { image: "heraf/faculty-2", caption: "Attendance by student and session." },
          { image: "heraf/faculty-3", caption: "Course information and overview." },
          { image: "heraf/faculty-4", caption: "Submissions, grouped by assignments and quizzes." },
        ],
      },
      {
        type: "gallery",
        title: "Student portal on the web",
        layout: "wide",
        items: [
          { image: "heraf/student-1", caption: "Dashboard: course completion, performance, attendance, upcoming lecture and notifications." },
          { image: "heraf/student-2", caption: "My course: status, topics, lecture schedule, marksheet and overall performance." },
          { image: "heraf/student-3", caption: "Course material, grouped into lectures, assignments and quizzes." },
        ],
      },
      {
        type: "gallery",
        title: "Student mobile app",
        layout: "phones",
        items: [
          { image: "heraf/mobile-1", caption: "Sign in, with an Arabic toggle." },
          { image: "heraf/mobile-2", caption: "Course material by type." },
          { image: "heraf/mobile-3", caption: "Lectures by day, with times and tutors." },
          { image: "heraf/mobile-4", caption: "Course overview with completion and topics." },
        ],
      },
    ],
  },
  {
    slug: "visionet-homepage",
    title: "Visionet homepage redesign",
    featured: true,
    kind: "concept",
    label: "Independent concept",
    categories: ["Web"],
    tagline: "An independent exploration of a B2B IT services homepage, with a clearer content journey from trust to capability to action.",
    cover: "covers/visionet",
    role: "UI/UX designer",
    platform: "Desktop website",
    tools: "Figma",
    intro: [
      "A corporate homepage has to do more than look polished. It should help a visitor understand the company, what it can do for them and what to do next.",
      "In this exploration I reordered the page into a path: establish trust, show outcomes and capabilities, prove it with stories, and end with a simple way to start a conversation.",
    ],
    note: "Independent concept. It was not commissioned by, or affiliated with, Visionet. Company names, logos, statistics and imagery come from public material and are used for context only.",
    blocks: [
      {
        type: "list",
        title: "The content path",
        items: [
          "Hero with a clear value proposition and two actions",
          "Trust signals early",
          "Outcomes and capabilities",
          "Industries served",
          "A simple method: discover, design, deliver, evolve",
          "Success stories and testimonials",
          "News and insights",
          "A short contact form",
        ],
      },
      {
        type: "gallery",
        title: "The page, section by section",
        intro: "Select a section to view it at full size.",
        layout: "wide",
        items: [
          { image: "visionet/s-1", caption: "Hero: a clear promise and two actions, explore capabilities or talk to an expert." },
          { image: "visionet/s-2", caption: "Trust: experience, scale and partners." },
          { image: "visionet/s-3", caption: "Outcomes: what the company helps enterprises achieve, in six cards." },
          { image: "visionet/s-4", caption: "Capabilities as a browsable carousel." },
          { image: "visionet/s-5", caption: "Industries, with a short line on the value for each." },
          { image: "visionet/s-6", caption: "Method: four steps from strategy to scale." },
          { image: "visionet/s-7", caption: "Success stories: one featured story with its results, and shorter ones beside it." },
          { image: "visionet/s-8", caption: "Testimonials, with video and quotes." },
          { image: "visionet/s-9", caption: "News, events and insights." },
          { image: "visionet/s-10", caption: "Contact: a short form to start a conversation." },
          { image: "visionet/s-11", caption: "Footer with services, products and quick links." },
        ],
      },
    ],
  },
  {
    slug: "buff",
    title: "BUFF",
    featured: true,
    kind: "live",
    label: "Client project at JinnByte, live on iOS and Android",
    categories: ["Mobile"],
    tagline: "A gym workout tracker with levels, a muscle-map exercise library, training plans and a community feed.",
    cover: "covers/buff",
    role: "UI/UX designer, end to end",
    platform: "iOS and Android app",
    intro: [
      "BUFF helps people track workouts and stay motivated. The interface turns training into progress, with levels and stats, an exercise library built around a muscle map, ready-made and custom plans, and a community feed.",
      "I designed the product end to end at JinnByte, covering the UX decisions and the interface.",
    ],
    links: [
      { label: "View on the App Store", url: "https://apps.apple.com/us/app/buff-gym-workout-tracker/id6480278630" },
      { label: "View on Google Play", url: "https://play.google.com/store/apps/details?id=com.buffdudes.android&hl=en" },
    ],
    note: "Images are from the public App Store and Google Play listings.",
    blocks: [
      {
        type: "story",
        title: "Inside the app",
        device: "phone",
        steps: [
          { image: "buff/s-1", title: "Progress you can see", text: "A profile with a level and stat bars for strength, endurance, vigor and intellect." },
          { image: "buff/s-2", title: "Choose a muscle", text: "The exercise library starts from a body diagram, with front, back and list views." },
          { image: "buff/s-3", title: "Search and learn", text: "Search and a clear exercise list, grouped by muscle and equipment." },
          { image: "buff/s-4", title: "Find a plan", text: "Plans grouped by goal, such as lean and athletic or size and strength, each with its own artwork." },
          { image: "buff/s-5", title: "A plan as a roadmap", text: "An interactive roadmap shows the weeks ahead and where you are." },
          { image: "buff/s-6", title: "Build your workout", text: "Add exercises, set reps and sets, and see the previous result next to the current one." },
          { image: "buff/s-7", title: "Community", text: "A feed for sharing progress, with likes, comments and sharing." },
        ],
      },
    ],
  },
  {
    slug: "real-estate-app",
    title: "Real estate app",
    featured: false,
    kind: "client",
    label: "Client project",
    categories: ["Mobile"],
    tagline: "A real estate app for browsing villas and apartments, chatting with agents and choosing a location.",
    cover: "covers/realestate",
    role: "UI/UX designer",
    platform: "Mobile app",
    tools: "Figma",
    intro: [
      "A mobile app for finding properties: search and browse by category, view agent profiles, chat with agents and choose a location on a map.",
      "The visual direction is light and fresh, with a green accent and large photography so the listings carry the screens.",
    ],
    note: "Content in these screens is placeholder, as requested by the client.",
    blocks: [
      {
        type: "gallery",
        title: "Screens",
        layout: "phones",
        items: [
          { image: "realestate/s-1", caption: "Splash." },
          { image: "realestate/s-2", caption: "Home: search, categories and featured estates." },
          { image: "realestate/s-3", caption: "Top villas by category, with price, rating and location." },
          { image: "realestate/s-4", caption: "Agent profile with rating, reviews, sales and listings." },
          { image: "realestate/s-5", caption: "Choose a location on a map." },
          { image: "realestate/s-6", caption: "Chat with an agent, with a listing shared in the thread." },
          { image: "realestate/s-7", caption: "Help center with buyer and agent tabs." },
          { image: "realestate/s-8", caption: "Adding a payment method." },
        ],
      },
    ],
  },
  {
    slug: "proposals-app",
    title: "Proposals web app",
    featured: false,
    kind: "client",
    label: "B2B web app",
    categories: ["Dashboard", "Web"],
    tagline: "A web app for service firms to build, price and send proposals to their clients.",
    cover: "covers/proposals",
    role: "UI/UX designer",
    platform: "Web app",
    tools: "Figma",
    intro: [
      "A B2B tool for creating client proposals. The sample data is accountancy services: a firm configures its services, sets pricing rules, manages contacts and users, and tracks proposals and revenue.",
      "The most interesting part of the design is the pricing setup, where annual revenue ranges, sub-totals, rounding and tax rates all feed into the price a client sees.",
    ],
    note: "Sample data and the logo are placeholders.",
    blocks: [
      {
        type: "gallery",
        title: "Screens",
        intro: "Select a screen to view it at full size.",
        layout: "wide",
        items: [
          { image: "proposals/s-1", caption: "Dashboard: proposals produced and won, goals and a revenue trend." },
          { image: "proposals/s-2", caption: "Contacts, with import and add actions." },
          { image: "proposals/s-3", caption: "Configure the services and service types the firm offers." },
          { image: "proposals/s-4", caption: "Pricing setup: annual revenue ranges that drive the price." },
          { image: "proposals/s-5", caption: "Pricing rules for sub-totals, rounding and tax rates." },
          { image: "proposals/s-6", caption: "Manage users, roles and an activity log." },
          { image: "proposals/s-7", caption: "Super admin view of accounts, packages and status." },
        ],
      },
    ],
  },
];

import { details } from "./details";

export const projects: Project[] = baseProjects.map((b) => ({ ...b, ...details[b.slug] }) as Project);

export const categoryLabels: Record<Category, string> = {
  Mobile: "Mobile apps",
  Web: "Websites and redesigns",
  Dashboard: "SaaS and dashboards",
  AI: "AI experiences",
};

export const featured = projects.filter((p) => p.featured);
export const more = projects.filter((p) => !p.featured);
export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
export function nextProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}
