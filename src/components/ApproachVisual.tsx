"use client";
import { useRef } from "react";
import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { img } from "@/lib/images";

const labels = [
  { text: "Understand", x: 13 },
  { text: "Structure", x: 38 },
  { text: "Design", x: 63 },
  { text: "Deliver", x: 87 },
];

/** The illustration is revealed left to right as the section scrolls into view: scattered pieces first, a clear interface last. */
export function ApproachVisual() {
  const im = img("photo/approach");
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 92%", "center 50%"] });
  const hidden = useTransform(scrollYProgress, [0, 1], [97, 0]);
  const clip = useMotionTemplate`inset(0 ${hidden}% 0 0)`;
  const edge = useTransform(scrollYProgress, [0, 1], [3, 100]);
  const edgeLeft = useMotionTemplate`${edge}%`;
  const alt = "Illustration: scattered shapes on the left become connected flows in the middle and a clear, organized interface on the right.";

  return (
    <div ref={ref} className="relative overflow-hidden rounded-[28px] border border-line bg-[#0A0820]">
      <img src={im.src} width={im.w} height={im.h} alt={alt} loading="lazy" className="h-auto w-full opacity-[0.2]" />
      <motion.img
        src={im.src}
        width={im.w}
        height={im.h}
        alt=""
        aria-hidden
        loading="lazy"
        className="absolute inset-0 h-full w-full"
        style={reduce ? undefined : { clipPath: clip }}
      />
      {!reduce && <motion.span aria-hidden className="absolute bottom-0 top-0 w-px bg-violet-soft/70 shadow-[0_0_18px_2px_rgba(124,92,255,.7)]" style={{ left: edgeLeft }} />}
      <ul className="pointer-events-none absolute inset-x-0 bottom-3 hidden sm:block" aria-hidden>
        {labels.map((l) => (
          <li key={l.text} className="absolute -translate-x-1/2 text-[13px] text-mist" style={{ left: `${l.x}%` }}>{l.text}</li>
        ))}
      </ul>
    </div>
  );
}
