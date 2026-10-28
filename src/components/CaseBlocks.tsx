import type { Block } from "@/data/projects";
import { FlowSteps } from "./FlowSteps";
import { Gallery } from "./Gallery";
import { ScrollStory } from "./ScrollStory";

function Heading({ title, intro }: { title: string; intro?: string }) {
  return (
    <div className="mb-10 max-w-2xl">
      <h2 className="h-display text-3xl md:text-4xl">{title}</h2>
      {intro && <p className="mt-3 text-lg text-sub">{intro}</p>}
    </div>
  );
}

export function CaseBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.type) {
          case "text":
            return (
              <section key={i} className="mt-24 grid gap-6 md:grid-cols-12">
                <h2 className="h-display text-3xl md:col-span-4">{b.title}</h2>
                <div className="prose-tight md:col-span-7">
                  {b.body.map((t) => (
                    <p key={t} className="text-lg text-sub">{t}</p>
                  ))}
                </div>
              </section>
            );
          case "list":
            return (
              <section key={i} className="mt-24 grid gap-6 md:grid-cols-12">
                <h2 className="h-display text-3xl md:col-span-4">{b.title}</h2>
                <ul className="space-y-3 md:col-span-7">
                  {b.items.map((t) => (
                    <li key={t} className="flex gap-3 text-lg text-sub">
                      <span className="mt-3 h-1.5 w-1.5 flex-none rounded-full bg-violet" aria-hidden />
                      {t}
                    </li>
                  ))}
                </ul>
              </section>
            );
          case "story":
            return (
              <section key={i} className="mt-28">
                <Heading title={b.title} intro={b.intro} />
                <ScrollStory steps={b.steps} device={b.device} />
              </section>
            );
          case "gallery":
            return (
              <section key={i} className="mt-28">
                <Heading title={b.title} intro={b.intro} />
                <Gallery items={b.items} layout={b.layout} />
              </section>
            );
          case "flow":
            return (
              <section key={i} className="mt-28">
                <Heading title={b.title} intro={b.intro} />
                <FlowSteps steps={b.steps} />
              </section>
            );
        }
      })}
    </>
  );
}
