import type { Kind } from "@/data/projects";

const dot: Record<Kind, string> = { live: "bg-live", client: "bg-violet-soft", concept: "bg-amber" };

export function Chip({ kind, label }: { kind: Kind; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-lg border border-line bg-panel px-3 py-1 text-[13px] text-mist">
      <span className={`h-2 w-2 rounded-full ${dot[kind]}`} aria-hidden />
      {label}
    </span>
  );
}
