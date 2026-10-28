"use client";
import Link from "next/link";
import { useRef } from "react";
import { motion, MotionValue, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { site } from "@/data/site";
import { img } from "@/lib/images";
import { btnGhost, btnPrimary } from "@/lib/ui";

// Where each frame starts (fraction of the viewport) before it snaps into the tidy row.
const frames = [
  { k: "hero/f1", label: "GelaMeat", sx: 0.5, sy: 0.13, r: -8 },
  { k: "hero/f2", label: "Live session dashboard", sx: 0.585, sy: 0.62, r: 7 },
  { k: "hero/f3", label: "MoodBites", sx: 0.4, sy: 0.79, r: -6 },
  { k: "hero/f4", label: "Visionet", sx: 0.6, sy: 0.3, r: 9 },
  { k: "hero/f5", label: "Heraf", sx: 0.52, sy: 0.47, r: -8 },
  { k: "hero/f6", label: "GelaMeat", sx: 0.33, sy: 0.06, r: 5 },
  { k: "hero/f7", label: "Real estate", sx: 0.07, sy: 0.83, r: -10 },
  { k: "hero/f8", label: "Heraf", sx: 0.8, sy: 0.88, r: 5 },
];
const NOMINAL_W = 10.5; // vw
const GAP = (95 - 8 * NOMINAL_W) / 7;
const NOMINAL_Y = 87; // vh, where the docked row sits

function Frame({ f, i, p }: { f: (typeof frames)[number]; i: number; p: MotionValue<number> }) {
  const center = 2.5 + i * (NOMINAL_W + GAP) + NOMINAL_W / 2;
  const x = useTransform(p, [0, 1], [`${f.sx * 100 - center}vw`, "0vw"]);
  const y = useTransform(p, [0, 1], [`${f.sy * 100 - NOMINAL_Y}vh`, "0vh"]);
  const rotate = useTransform(p, [0, 1], [f.r, 0]);
  const ring = useTransform(p, [0.88, 1], [0, 1]);
  const im = img(f.k);
  return (
    <motion.div style={{ x, y, rotate, width: "min(10.5vw, 14vh)" }} className="relative will-change-transform">
      <span className="absolute -top-6 left-0 whitespace-nowrap text-[11px] text-mist/80">{f.label}</span>
      <div className="animate-bob" style={{ animationDelay: `${i * 0.45}s` }}>
        <img
          src={im.src}
          width={im.w}
          height={im.h}
          alt={f.label}
          className="aspect-[4/5] w-full rounded-xl border border-line object-cover object-top shadow-[0_18px_50px_-18px_rgba(124,92,255,.6)]"
        />
      </div>
      {i === 3 && (
        <motion.span style={{ opacity: ring }} className="pointer-events-none absolute -inset-1.5 rounded-[14px] border-2 border-violet-soft" aria-hidden>
          {["-left-1 -top-1", "-right-1 -top-1", "-bottom-1 -left-1", "-bottom-1 -right-1"].map((c) => (
            <span key={c} className={`absolute h-2 w-2 rounded-[2px] bg-white ${c}`} />
          ))}
        </motion.span>
      )}
    </motion.div>
  );
}

function Cursor({ p }: { p: MotionValue<number> }) {
  const x = useTransform(p, [0, 0.5, 1], ["62.5vw", "56vw", "47.5vw"]);
  const y = useTransform(p, [0, 0.5, 1], ["40vh", "58vh", "90vh"]);
  const pulse = useTransform(p, [0.9, 1], [0, 1]);
  return (
    <motion.div style={{ x, y }} className="pointer-events-none absolute left-0 top-0 z-40" aria-hidden>
      <motion.span style={{ opacity: pulse }} className="absolute -left-3 -top-3 h-6 w-6 animate-pulse2 rounded-full border border-coral" />
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M2 2l7.5 17.5 2.5-7 7-2.5L2 2z" fill="#FF6B57" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
      <span className="-mt-1 ml-4 inline-block rounded-full rounded-tl-none bg-coral px-2.5 py-0.5 text-xs font-medium text-white">Ahtasham</span>
    </motion.div>
  );
}

/** The portrait is treated as one more frame on the canvas: selected, labelled, with the head breaking out of the top edge. */
function PortraitFrame({ lift }: { lift?: MotionValue<number> }) {
  const portrait = img("photo/portrait");
  const common = {
    src: portrait.src,
    width: portrait.w,
    height: portrait.h,
    alt: `${site.name}, ${site.role}`,
    className: "absolute -left-[2%] bottom-0 w-[104%] max-w-none",
  };
  return (
    <div className="relative aspect-[1/1.12] w-full">
      {/* <span className="absolute -top-6 left-0 whitespace-nowrap text-[11px] text-mist">Ahtasham Anjum / Profile</span> */}
      <div className="absolute inset-0 rounded-[28px] bg-[linear-gradient(150deg,#2A1A7A_0%,#5B3FE0_55%,#8E73FF_100%)]" aria-hidden />
      <div className="absolute inset-0 [clip-path:inset(-40%_-6%_0_-6%_round_0_0_28px_28px)]">
        {lift ? <motion.img {...common} style={{ y: lift }} /> : <img {...common} />}
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-[28px] border border-violet-soft/70" aria-hidden>
        {["-left-1 -top-1", "-right-1 -top-1", "-bottom-1 -left-1", "-bottom-1 -right-1"].map((c) => (
          <span key={c} className={`absolute h-2.5 w-2.5 rounded-[2px] border border-violet bg-white ${c}`} />
        ))}
      </div>
    </div>
  );
}

function Copy() {
  return (
    <>
      <p className="flex items-center gap-2 text-[15px] text-mist">
        <span className="h-2 w-2 rounded-full bg-live" aria-hidden />
        {site.role}
      </p>
      <h1 className="h-display mt-5 text-[clamp(2.2rem,min(3.6vw,7vh),3.9rem)]">Designing digital products that make complex things feel simple.</h1>
      <p className="mt-6 max-w-md text-lg text-sub lg:[@media(max-height:780px)]:hidden">
        I’m Ahtasham, a Senior UI/UX and Product Designer with {site.years} years of experience turning complex ideas, workflows and business requirements into clear, thoughtful digital experiences.
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <a href="#work" className={btnPrimary}>Explore my work</a>
        <Link href="/about/" className={btnGhost}>About me</Link>
        <Link href="/contact/" className="px-3 py-3 text-mist underline decoration-mist/40 underline-offset-4 transition-colors hover:decoration-mist">Get in touch</Link>
      </div>
    </>
  );
}

export function Hero() {
  const track = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] });
  const mapped = useTransform(scrollYProgress, [0, 0.72], [0, 1]);
  const spring = useSpring(mapped, { stiffness: 90, damping: 22, mass: 0.6 });
  const done = useMotionValue(1);
  const p = reduce ? done : spring;
  const lift = useTransform(p, [0, 1], [0, -14]);

  return (
    <>
      {/* Wide screens: the canvas tidies itself as you scroll */}
      <section ref={track} className={`relative hidden lg:block ${reduce ? "h-screen" : "h-[230vh]"}`} aria-label="Introduction">
        <div className="sticky top-0 h-screen min-h-[620px] overflow-hidden">
          <div className="canvas-dots absolute inset-0" aria-hidden />
          <div className="absolute bottom-[10vh] right-[-4vw] z-10 h-[90vh] w-[56vw] bg-[radial-gradient(closest-side,rgba(124,92,255,.32),transparent)]" aria-hidden />
          <div className="absolute bottom-[26vh] right-[6vw] z-20 w-[min(28vw,44vh)]">
            <PortraitFrame lift={lift} />
          </div>
          <div className="absolute left-[5vw] top-[17vh] z-30 max-w-[40vw]">
            <Copy />
          </div>
          <div className="absolute inset-x-[2.5vw] bottom-[2.2vh] z-30 flex items-end justify-between">
            {frames.map((f, i) => (
              <Frame key={f.k} f={f} i={i} p={p} />
            ))}
          </div>
          {!reduce && <Cursor p={p} />}
        </div>
      </section>

      {/* Smaller screens: same content, already tidy */}
      <section className="relative overflow-hidden px-6 pb-12 pt-28 lg:hidden" aria-label="Introduction">
        <div className="canvas-dots absolute inset-0" aria-hidden />
        <div className="relative">
          <Copy />
          <div className="mx-auto mt-40 w-[min(76%,300px)]">
            <PortraitFrame />
          </div>
          <div className="mt-10 grid grid-cols-4 gap-2">
            {frames.map((f) => {
              const im = img(f.k);
              return <img key={f.k} src={im.src} width={im.w} height={im.h} alt={f.label} loading="lazy" className="aspect-[4/5] w-full rounded-lg border border-line object-cover object-top" />;
            })}
          </div>
        </div>
      </section>
    </>
  );
}
