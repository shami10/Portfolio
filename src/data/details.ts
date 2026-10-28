import type { Project } from "./projects";

type Detail = Pick<Project, "type" | "scope" | "outcome"> & Partial<Pick<Project, "challenge" | "intro" | "label" | "platform">>;

export const details: Record<string, Detail> = {
  gelameat: {
    type: "Client project",
    intro: [
      "GelaMeat lets customers order meat for delivery, pick-up or catering. Behind the customer app, staff take and manage orders on a tablet, and managers run the business from a POS dashboard covering inventory, purchases, items and user roles.",
    ],
    challenge:
      "One brand had to work for three very different jobs: a customer ordering quickly on a phone, a staff member handling orders at speed on a tablet, and a manager tracking stock, purchases and permissions on a desktop.",
    scope: [
      "I designed all three surfaces: the customer mobile app, the order-taker tablet app and the POS web dashboard.",
      "They share one brand, one type system and one visual language, so each is recognizable as part of the same product.",
    ],
    outcome: [
      "The result is a connected set of screens, from a customer’s order to the staff who handle it and the manager who tracks it.",
      "Next, I would show the Arabic version of every screen. The app supports Arabic and English.",
    ],
  },
  "live-session-dashboard": {
    type: "Design assessment (independent concept)",
    intro: [
      "A dashboard concept for research operators who monitor live sessions, track participant activity, find problems and act on them without moving between disconnected views.",
    ],
    challenge:
      "Managing a live session gets harder as participants multiply. Operators need to see how the session is going, find who needs help and respond quickly, so the design has to balance information density with clarity.",
    scope: ["A design assessment. I designed the dashboard, the participant side panel and the main workflow in Figma."],
    outcome: [
      "This was a design assessment, so it was not implemented or tested with real operators. The page shows design thinking, not results.",
    ],
  },
  facebloom: {
    type: "Professional work, live product",
    intro: ["Facebloom starts with a face photo and turns it into scores and personalized recommendations for skincare and grooming."],
    challenge: "AI output is easy to misread. The interface had to make clear what was measured, what the numbers mean and what to do next.",
    scope: ["I designed the product end to end at JinnByte, covering the UX decisions and the interface."],
    outcome: ["Facebloom is live on the App Store. I do not have usage or performance figures to share."],
  },
  moodbites: {
    type: "Independent concept",
    intro: ["MoodBites explores an AI recommendation experience that begins with a mood instead of a menu."],
    challenge:
      "Choosing what to eat gets tiring when you are tired, stressed or celebrating. The design had to let people say how they feel, show a recommendation they can trust and keep the path to ordering short.",
    scope: ["An independent concept. I designed the full flow in Figma, from splash and onboarding to checkout and confirmation."],
    outcome: ["A concept, so there are no launch results. The recommendation logic shown is illustrative."],
  },
  "heraf-lms": {
    type: "Client project",
    intro: [
      "Heraf is a skills learning center. The platform serves administrators, faculty and students, on the web and on mobile, in Arabic and English.",
    ],
    challenge:
      "Three groups with different jobs share one platform: administrators who manage courses, enrollment and approvals, faculty who run classes, and students who follow their courses on the web and on their phones.",
    scope: [
      "I delivered the design end to end at Devrol Solutions, across the admin, faculty and student portals and the student mobile app.",
      "The interface supports Arabic and English through a language toggle.",
    ],
    outcome: ["I do not have launch or usage figures to share. This page shows the design of each portal."],
  },
  "visionet-homepage": {
    type: "Independent concept",
    intro: [
      "An independent exploration of a B2B IT services homepage. I reordered the page into a path: establish trust, show outcomes and capabilities, prove it with stories, and end with a simple way to start a conversation.",
    ],
    challenge:
      "A corporate homepage has to do more than look polished. It should help a visitor understand the company, what it can do for them and what to do next.",
    scope: ["An independent concept. I redesigned the homepage in Figma, including content order, visual hierarchy and the design of each section."],
    outcome: [
      "A concept, not an approved redesign, so there are no business results. Next I would test whether visitors reach the contact form more easily with this path.",
    ],
  },
  buff: {
    type: "Professional work, live product",
    challenge:
      "A gym app has to keep people motivated while staying out of the way during a workout. The design turns training into visible progress through levels, plans and a community.",
    scope: ["I designed the product end to end at JinnByte, covering the UX decisions and the interface."],
    outcome: ["BUFF is live on the App Store and Google Play. I do not have usage figures to share."],
    intro: ["BUFF helps people track workouts and stay motivated, with levels and stats, an exercise library built around a muscle map, ready-made and custom plans, and a community feed."],
  },
  "real-estate-app": {
    type: "Client project",
    intro: ["A mobile app for finding properties: search and browse by category, view agent profiles, chat with agents and choose a location on a map."],
    challenge: "Property apps mix browsing, trust and conversation. The design had to help people find a place, check the agent and get in touch.",
    scope: ["A client project. I designed the screens with placeholder content, as the client requested."],
    outcome: ["Delivered as a set of screens. I do not have launch figures to share."],
  },
  "proposals-app": {
    type: "Client project",
    label: "Client project",
    platform: "B2B web app",
    intro: ["A B2B tool for creating client proposals. The sample data is accountancy services: a firm configures its services, sets pricing rules, manages contacts and users, and tracks proposals and revenue."],
    challenge:
      "Pricing a proposal depends on many rules at once. The design had to let a firm configure services, revenue ranges, rounding and tax in one place without losing clarity.",
    scope: ["I designed the web app screens. The sample data and the logo are placeholders."],
    outcome: ["I do not have launch figures to share. The pricing setup is the most interesting part of this work."],
  },
};
