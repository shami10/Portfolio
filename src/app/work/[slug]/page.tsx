import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseBlocks } from "@/components/CaseBlocks";
import { Chip } from "@/components/Chip";
import { categoryLabels, getProject, nextProject, projects } from "@/data/projects";
import { img } from "@/lib/images";
import { btnGhost, container } from "@/lib/ui";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getProject(params.slug);
  if (!p) return {};
  return { title: p.title, description: p.tagline, openGraph: { title: p.title, description: p.tagline, images: [{ url: img(p.cover).src }] } };
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-24 grid gap-6 md:grid-cols-12">
      <h2 className="h-display text-3xl md:col-span-4">{title}</h2>
      <div className="space-y-4 md:col-span-7">{children}</div>
    </section>
  );
}

export default function CaseStudy({ params }: { params: { slug: string } }) {
  const p = getProject(params.slug);
  if (!p) notFound();
  const cover = img(p.cover);
  const next = nextProject(p.slug);
  const meta: [string, string][] = [
    ["Category", p.categories.map((c) => categoryLabels[c]).join(", ")],
    ["My role", p.role],
    ["Project type", p.type],
    ["Platform", p.platform],
    ...(p.tools ? ([["Tools", p.tools]] as [string, string][]) : []),
  ];

  return (
    <article className={`${container} pt-32`}>
      <Link href="/work/" className="text-sub transition-colors hover:text-paper">All projects</Link>
      <div className="mt-8">
        <Chip kind={p.kind} label={p.label} />
        <h1 className="h-display mt-5 max-w-4xl text-5xl md:text-7xl">{p.title}</h1>
        <p className="mt-5 max-w-2xl text-xl text-sub">{p.tagline}</p>
      </div>

      <dl className="mt-12 grid gap-6 border-t border-line pt-6 sm:grid-cols-2 lg:grid-cols-5">
        {meta.map(([k, v]) => (
          <div key={k}>
            <dt className="text-sm text-sub">{k}</dt>
            <dd className="mt-1">{v}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-12 overflow-hidden rounded-[28px] border border-line bg-panel">
        <img src={cover.src} width={cover.w} height={cover.h} alt={`${p.title} screens`} className="h-auto w-full" />
      </div>

      <Section title="Overview">
        {p.intro.map((t) => (
          <p key={t} className="text-xl leading-relaxed">{t}</p>
        ))}
        {p.links && (
          <div className="flex flex-wrap gap-3 pt-2">
            {p.links.map((l) => (
              <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className={btnGhost}>{l.label}</a>
            ))}
          </div>
        )}
        {p.note && <p className="rounded-2xl border border-line bg-panel p-5 text-[15px] text-sub">{p.note}</p>}
      </Section>

      {p.challenge && (
        <Section title="The challenge">
          <p className="text-lg text-sub">{p.challenge}</p>
        </Section>
      )}

      <Section title="My role and scope">
        {p.scope.map((t) => (
          <p key={t} className="text-lg text-sub">{t}</p>
        ))}
      </Section>

      <CaseBlocks blocks={p.blocks} />

      <Section title="Outcome and reflection">
        {p.outcome.map((t) => (
          <p key={t} className="text-lg text-sub">{t}</p>
        ))}
      </Section>

      <section className="mt-32 border-t border-line pt-12">
        <p className="text-sub">Next project</p>
        <Link href={`/work/${next.slug}/`} className="group mt-3 block">
          <span className="h-display text-4xl underline decoration-line decoration-2 underline-offset-8 transition-colors group-hover:decoration-violet md:text-6xl">{next.title}</span>
        </Link>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/work/" className={btnGhost}>All work</Link>
          <Link href="/contact/" className={btnGhost}>Contact me</Link>
        </div>
      </section>
    </article>
  );
}
