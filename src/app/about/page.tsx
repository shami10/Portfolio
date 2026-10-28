import type { Metadata } from "next";
import Link from "next/link";
import { approach, beyond, experience, lessons, site, strengths, toolGroups } from "@/data/site";
import { img } from "@/lib/images";
import { btnGhost, btnPrimary, container } from "@/lib/ui";

export const metadata: Metadata = {
  title: "About",
  description: "Ahtasham Anjum is a UI/UX and Product Designer with 9 years of experience designing web and mobile products, dashboards and AI-powered experiences.",
};

export default function About() {
  const head = img("photo/headshot");
  const desk = img("photo/about");
  return (
    <div className={`${container} pt-36`}>
      {/* 1. Hero */}
      <div className="grid items-center gap-12 md:grid-cols-12">
        <div className="md:col-span-7">
          <h1 className="h-display text-5xl md:text-7xl">Thoughtful design starts with understanding the problem.</h1>
          <p className="mt-6 max-w-xl text-xl text-sub">
            I’m {site.name}, a UI/UX and Product Designer with {site.years} years of experience designing digital products, improving complex experiences and bringing structure to ideas that are not always easy to explain.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/work/" className={btnPrimary}>Explore my work</Link>
            <a href={site.resume} download className={btnGhost}>Download résumé</a>
          </div>
        </div>
        <div className="md:col-span-4 md:col-start-9">
          <div className="overflow-hidden rounded-[28px] border border-line">
            <img src={head.src} width={head.w} height={head.h} alt={`Portrait of ${site.name}`} className="h-auto w-full" />
          </div>
        </div>
      </div>

      {/* 2. My story */}
      <section className="mt-32 grid gap-10 md:grid-cols-12" aria-labelledby="story">
        <h2 id="story" className="h-display text-3xl md:col-span-4 md:text-4xl">My story</h2>
        <div className="prose-tight space-y-5 text-lg text-sub md:col-span-7">
          <p>I started in 2017 as an Associate Designer at Villaex Technologies, then moved through Paksa IT Solutions to EpicSoft, where as a Senior Designer I designed and shipped web and mobile interfaces, working closely with developers and stakeholders.</p>
          <p>At Devrol Solutions and then JinnByte I led design: guiding direction, mentoring designers and still designing key flows, prototypes and UI systems myself. That work includes the Heraf learning platform and live products such as BUFF and Facebloom.</p>
          <p>Across web and mobile I have designed websites, apps, dashboards and management systems. That mix taught me to keep usability and visual quality working together instead of trading one for the other.</p>
          <p>I also founded Wearpik, an e-commerce fashion brand, which gave me a close look at building and promoting a product. Since March 2026 I have been working with clients as a freelance designer while looking for my next full-time role, and I am increasingly interested in AI-powered products and how thoughtful UX makes intelligent features feel useful and predictable.</p>
        </div>
      </section>

      <section className="mt-24" aria-labelledby="experience">
        <h2 id="experience" className="h-display text-3xl md:text-4xl">Experience</h2>
        <ol className="mt-10 border-l border-line">
          {experience.map((j) => (
            <li key={j.company + j.period} className="relative grid gap-2 py-6 pl-8 md:grid-cols-12 md:gap-8">
              <span className="absolute -left-[5px] top-9 h-2.5 w-2.5 rounded-full bg-violet" aria-hidden />
              <div className="md:col-span-4">
                <p className="text-sub">{j.period}</p>
                <h3 className="h-display mt-1 text-2xl">{j.company}</h3>
                <p className="text-mist">{j.role}</p>
              </div>
              <ul className="space-y-2 md:col-span-8">
                {j.points.map((t) => (
                  <li key={t} className="text-sub">{t}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-sub">Education: Bachelor of Science in IT, Punjab University, 2019.</p>
      </section>

      {/* 3. What experience has taught me */}
      <section className="mt-32" aria-labelledby="lessons">
        <h2 id="lessons" className="h-display text-3xl md:text-4xl">What experience has taught me</h2>
        <p className="mt-3 max-w-xl text-sub">These are principles, not claims about every project.</p>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {lessons.map((l) => (
            <div key={l.title} className="rounded-[22px] border border-line bg-panel p-8">
              <h3 className="h-display text-2xl">{l.title}</h3>
              <p className="mt-3 text-sub">{l.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Design approach */}
      <section className="mt-32 grid gap-10 md:grid-cols-12" aria-labelledby="approach">
        <div className="md:col-span-4">
          <h2 id="approach" className="h-display text-3xl md:text-4xl">My design approach</h2>
          <p className="mt-3 text-sub">From problem to delivery.</p>
        </div>
        <ol className="relative space-y-1 md:col-span-7">
          <span className="absolute bottom-6 left-[15px] top-6 w-px bg-line" aria-hidden />
          {approach.map((a, i) => (
            <li key={a} className="relative flex items-start gap-5 py-3">
              <span className="relative z-10 flex h-8 w-8 flex-none items-center justify-center rounded-full border border-line bg-raised text-sm text-mist" aria-hidden>{i + 1}</span>
              <span className="pt-0.5 text-lg">{a}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* 5. Strengths */}
      <section className="mt-32" aria-labelledby="strengths">
        <h2 id="strengths" className="h-display text-3xl md:text-4xl">Strengths</h2>
        <ul className="mt-10 border-t border-line">
          {strengths.map((s) => (
            <li key={s.title} className="flex flex-col justify-between gap-2 border-b border-line py-5 sm:flex-row sm:items-baseline sm:gap-8">
              <span className="text-xl">{s.title}</span>
              {s.links && (
                <span className="flex flex-wrap gap-x-4 gap-y-1 text-[15px]">
                  {s.links.map((l) => (
                    <Link key={l.label} href={l.href} className="text-mist underline decoration-mist/30 underline-offset-4 transition-colors hover:decoration-mist">{l.label}</Link>
                  ))}
                </span>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* 6. Tools and working methods */}
      <section className="mt-32" aria-labelledby="tools">
        <h2 id="tools" className="h-display text-3xl md:text-4xl">Tools and working methods</h2>
        <div className="mt-10 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {toolGroups.map((g) => (
            <div key={g.group} className="border-t border-line pt-5">
              <h3 className="text-lg text-mist">{g.group}</h3>
              <ul className="mt-4 space-y-2">
                {g.items.map((t) => (<li key={t}>{t}</li>))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Beyond the interface */}
      <section className="mt-32 grid items-center gap-10 md:grid-cols-12" aria-labelledby="beyond">
        <div className="md:col-span-6">
          <h2 id="beyond" className="h-display text-3xl md:text-4xl">Beyond the interface</h2>
          <p className="mt-5 text-lg text-sub">
            I follow how AI is changing what products can do, and I like designing the moments where intelligent features have to be understood and trusted. I also know how products get built and promoted, which keeps my handoffs practical and my decisions grounded.
          </p>
          <dl className="mt-8 space-y-5">
            <div>
              <dt className="text-mist">Development</dt>
              <dd className="mt-1 text-sub">{beyond.development.join(", ")}.</dd>
            </div>
            <div>
              <dt className="text-mist">Digital marketing</dt>
              <dd className="mt-1 text-sub">{beyond.marketing.join(", ")}.</dd>
            </div>
          </dl>
        </div>
        <figure className="md:col-span-5 md:col-start-8">
          <div className="overflow-hidden rounded-[28px] border border-line">
            <img src={desk.src} width={desk.w} height={desk.h} alt="Illustration of Ahtasham reviewing wireframes at a desk" loading="lazy" className="h-auto w-full" />
          </div>
          <figcaption className="mt-2 text-sm text-sub">Illustration</figcaption>
        </figure>
      </section>

      {/* 8. CTA */}
      <section className="mt-32">
        <div className="rounded-[28px] border border-line bg-gradient-to-br from-raised to-panel p-8 md:p-14">
          <h2 className="h-display max-w-3xl text-3xl md:text-5xl">Looking for a designer who thinks beyond the screen?</h2>
          <p className="mt-4 max-w-xl text-lg text-sub">
            Explore my work to see how I approach product problems, structure experiences and turn ideas into thoughtful interfaces.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/work/" className={btnPrimary}>Explore my work</Link>
            <Link href="/contact/" className={btnGhost}>Contact me</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
