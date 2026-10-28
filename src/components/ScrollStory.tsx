"use client";
import { useEffect, useRef, useState } from "react";
import type { Step } from "@/data/projects";
import { img } from "@/lib/images";

type Device = "phone" | "browser" | "zoom";
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

function zoomTransform(step: Step) {
  const f = step.focus;
  if (!f) return "translate(0%, 0%) scale(1)";
  const tx = clamp(50 - f.scale * f.x * 100, (1 - f.scale) * 100, 0);
  const ty = clamp(50 - f.scale * f.y * 100, (1 - f.scale) * 100, 0);
  return `translate(${tx}%, ${ty}%) scale(${f.scale})`;
}

function StaticShot({ step, device }: { step: Step; device: Device }) {
  const im = img(step.image);
  const alt = `${step.title}. ${step.text}`;
  if (device === "zoom") {
    return (
      <div className="relative mx-auto overflow-hidden rounded-2xl border border-line bg-panel" style={{ aspectRatio: `${im.w} / ${im.h}`, maxWidth: im.w }}>
        <img
          src={im.src}
          width={im.w}
          height={im.h}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="absolute left-0 top-0 h-full w-full max-w-none"
          style={{ transformOrigin: "0 0", transform: zoomTransform(step) }}
        />
      </div>
    );
  }
  return (
    <div
      className={`mx-auto overflow-hidden border border-line bg-panel ${device === "phone" ? "rounded-[2rem]" : "rounded-2xl"}`}
      style={{ maxWidth: device === "phone" ? Math.min(im.w, 320) : im.w }}
    >
      <img src={im.src} width={im.w} height={im.h} alt={alt} loading="lazy" decoding="async" className="h-auto w-full" />
    </div>
  );
}

export function ScrollStory({ steps, device }: { steps: Step[]; device: Device }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);
  const first = img(steps[0].image);
  const wide = device !== "phone";

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(Number((e.target as HTMLElement).dataset.index))),
      { rootMargin: "-45% 0px -45% 0px" }
    );
    refs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className={`grid gap-10 lg:gap-16 ${wide ? "lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]" : "lg:grid-cols-[minmax(0,1fr)_minmax(300px,380px)]"}`}>
      <div>
        {steps.map((s, i) => (
          <article
            key={s.title + i}
            data-index={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            className="py-8 lg:flex lg:min-h-[68vh] lg:flex-col lg:justify-center lg:py-0"
          >
            <div className={`transition-opacity duration-500 ${i === active ? "lg:opacity-100" : "lg:opacity-30"}`}>
              <p className="text-sm text-sub">
                {i + 1} of {steps.length}
              </p>
              <h3 className="h-display mt-2 text-3xl">{s.title}</h3>
              <p className="mt-3 max-w-md text-sub">{s.text}</p>
            </div>
            <div className="mt-6 lg:hidden">
              <StaticShot step={s} device={device} />
            </div>
          </article>
        ))}
      </div>

      <div className="hidden lg:block">
        <div className="sticky top-[14vh]">
          {device === "phone" ? (
            <div
              className="relative mx-auto overflow-hidden rounded-[2.4rem] border border-line bg-panel shadow-[0_30px_80px_-30px_rgba(124,92,255,.55)]"
              style={{ maxWidth: Math.min(first.w, 340), aspectRatio: `${first.w} / ${first.h}` }}
            >
              {steps.map((s, i) => {
                const im = img(s.image);
                return (
                  <img
                    key={s.image + i}
                    src={im.src}
                    width={im.w}
                    height={im.h}
                    alt={`${s.title}. ${s.text}`}
                    aria-hidden={i !== active}
                    loading={i < 2 ? "eager" : "lazy"}
                    decoding="async"
                    className={`absolute inset-0 h-full w-full object-contain transition-all duration-500 ${i === active ? "scale-100 opacity-100" : "scale-[0.97] opacity-0"}`}
                  />
                );
              })}
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-line bg-panel shadow-[0_30px_80px_-30px_rgba(124,92,255,.55)]">
              <div className="flex items-center gap-1.5 border-b border-line bg-raised px-4 py-2.5" aria-hidden>
                <span className="h-2.5 w-2.5 rounded-full bg-line" />
                <span className="h-2.5 w-2.5 rounded-full bg-line" />
                <span className="h-2.5 w-2.5 rounded-full bg-line" />
              </div>
              <div className="relative overflow-hidden" style={{ aspectRatio: `${first.w} / ${first.h}` }}>
                <img
                  src={first.src}
                  width={first.w}
                  height={first.h}
                  alt={steps.map((s) => s.title).join(". ")}
                  className="absolute left-0 top-0 h-full w-full max-w-none"
                  style={{
                    transformOrigin: "0 0",
                    transform: device === "zoom" ? zoomTransform(steps[active]) : undefined,
                    transition: "transform 900ms cubic-bezier(.22,1,.36,1)",
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
