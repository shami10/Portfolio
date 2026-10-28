import Link from "next/link";
import { Hero } from "@/components/Hero";
import { ApproachVisual } from "@/components/ApproachVisual";
import { Principles } from "@/components/Principles";
import { ProjectCard, ProjectFeature } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { capabilities, principles, site, snapshot } from "@/data/site";
import { featured } from "@/data/projects";
import { img } from "@/lib/images";
import { btnGhost, btnPrimary, container } from "@/lib/ui";

export default function Home() {
  const head = img("photo/headshot");
  return (
    <>
      <Hero />

      {/* 3. Experience and expertise snapshot */}
      <section className={`${container} pt-28`} aria-labelledby="snapshot">
        <div className="grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <p id="snapshot" className="h-display text-[7rem] leading-none text-violet-soft md:text-[9rem]">{site.years}</p>
            <p className="mt-2 max-w-[16rem] text-xl">years designing web and mobile products.</p>
          </Reveal>
          <Reveal className="md:col-span-8" delay={0.1}>
            <ul className="border-t border-line">
              {snapshot.map((s) => (
                <li key={s.text} className="flex flex-col justify-between gap-2 border-b border-line py-5 sm:flex-row sm:items-baseline sm:gap-8">
                  <span className="text-xl">{s.text}</span>
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
          </Reveal>
        </div>
      </section>

      {/* 4. Featured work */}
      <section id="work" className={`${container} scroll-mt-10 pb-8 pt-32`}>
        <h2 className="h-display text-4xl md:text-5xl">Selected work</h2>
        <p className="mt-4 max-w-xl text-lg text-sub">
          Seven projects across mobile apps, dashboards and the web. Each one opens into a case study, and each is labeled so you know whether it is client work, a live product or a concept.
        </p>
        <div className="mt-16 space-y-24">
          {featured.slice(0, 3).map((p, i) => (
            <ProjectFeature key={p.slug} p={p} reverse={i % 2 === 1} />
          ))}
        </div>
        <div className="mt-24 grid gap-x-8 gap-y-14 md:grid-cols-2">
          {featured.slice(3).map((p) => (
            <ProjectCard key={p.slug} p={p} />
          ))}
        </div>
        <div className="mt-16">
          <Link href="/work/" className={btnGhost}>See all projects</Link>
        </div>
      </section>

      {/* 5. How I approach design */}
      <section className={`${container} pt-32`} aria-labelledby="approach">
        <h2 id="approach" className="h-display max-w-2xl text-4xl md:text-5xl">How I approach design</h2>
        <p className="mt-4 max-w-xl text-lg text-sub">These are the principles I aim to apply on every product, not a promise that every project had every step.</p>
        <div className="mt-12">
          <ApproachVisual />
        </div>
        <div className="mt-6">
          <Principles items={principles} />
        </div>
      </section>

      {/* 6. Design capabilities */}
      <section className={`${container} pt-32`} aria-labelledby="capabilities">
        <h2 id="capabilities" className="h-display text-4xl md:text-5xl">Design capabilities</h2>
        <div className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((c) => (
            <div key={c.group} className="border-t border-line pt-5">
              <h3 className="text-lg text-mist">{c.group}</h3>
              <ul className="mt-4 space-y-2">
                {c.items.map((i) => (
                  <li key={i} className="text-paper">{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 7. About preview */}
      <section className={`${container} pt-32`}>
        <div className="grid items-center gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="overflow-hidden rounded-[28px] border border-line">
              <img src={head.src} width={head.w} height={head.h} alt={`Portrait of ${site.name}`} loading="lazy" className="h-auto w-full" />
            </div>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <h2 className="h-display text-4xl md:text-5xl">The person behind the screens</h2>
            <p className="mt-6 text-xl leading-relaxed text-sub">
              I enjoy turning complicated requirements into digital experiences that feel clear, purposeful and easy to navigate. My work brings together structured problem-solving, thoughtful UX and careful attention to interface details.
            </p>
            <Link href="/about/" className={`${btnGhost} mt-8`}>More about me</Link>
          </div>
        </div>
      </section>

      {/* 8. Contact CTA */}
      <section className={`${container} pt-32`}>
        <div className="rounded-[28px] border border-line bg-gradient-to-br from-raised to-panel p-8 md:p-14">
          <h2 className="h-display max-w-3xl text-3xl md:text-5xl">Have a product worth making better?</h2>
          <p className="mt-4 max-w-xl text-lg text-sub">
            I’m open to opportunities where thoughtful UX, strong product thinking and clear design can make a difference.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact/" className={btnPrimary}>Let’s talk</Link>
            <a href={site.resume} download className={btnGhost}>Download résumé</a>
          </div>
        </div>
      </section>
    </>
  );
}
