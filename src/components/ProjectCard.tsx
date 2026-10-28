import Link from "next/link";
import type { Project } from "@/data/projects";
import { img } from "@/lib/images";
import { Chip } from "./Chip";

export function ProjectCard({ p }: { p: Project }) {
  const cover = img(p.cover);
  return (
    <Link href={`/work/${p.slug}/`} className="group block">
      <div className="overflow-hidden rounded-[22px] border border-line bg-panel transition-colors duration-300 group-hover:border-violet">
        <img
          src={cover.src}
          width={cover.w}
          height={cover.h}
          alt={`${p.title}: ${p.tagline}`}
          loading="lazy"
          decoding="async"
          className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </div>
      <div className="mt-5">
        <Chip kind={p.kind} label={p.label} />
        <h3 className="h-display mt-3 text-2xl md:text-[1.7rem]">{p.title}</h3>
        <p className="mt-2 max-w-md text-sub">{p.tagline}</p>
      </div>
    </Link>
  );
}

export function ProjectFeature({ p, reverse = false }: { p: Project; reverse?: boolean }) {
  const cover = img(p.cover);
  return (
    <Link href={`/work/${p.slug}/`} className="group grid items-center gap-8 md:grid-cols-12 md:gap-12">
      <div className={`md:col-span-7 ${reverse ? "md:order-2" : ""}`}>
        <div className="overflow-hidden rounded-[26px] border border-line bg-panel transition-colors duration-300 group-hover:border-violet">
          <img
            src={cover.src}
            width={cover.w}
            height={cover.h}
            alt={`${p.title}: ${p.tagline}`}
            loading="lazy"
            decoding="async"
            className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        </div>
      </div>
      <div className={`md:col-span-5 ${reverse ? "md:order-1" : ""}`}>
        <Chip kind={p.kind} label={p.label} />
        <h3 className="h-display mt-4 text-3xl md:text-4xl">{p.title}</h3>
        <p className="mt-3 text-lg text-sub">{p.tagline}</p>
        <p className="mt-5 text-[15px] text-sub">{p.platform}</p>
        <span className="mt-6 inline-flex items-center gap-2 border-b border-mist/40 pb-1 text-mist transition-colors group-hover:border-mist">
          View case study
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
            <path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
