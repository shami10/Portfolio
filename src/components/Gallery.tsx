import type { GalleryItem } from "@/data/projects";
import { ZoomImage } from "./ZoomImage";

const grid = {
  phones: "grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4",
  tablet: "grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3",
  wide: "grid gap-x-8 gap-y-12 md:grid-cols-2",
} as const;

export function Gallery({ items, layout }: { items: GalleryItem[]; layout: keyof typeof grid }) {
  const single = items.length === 1;
  return (
    <div className={single ? "mx-auto grid max-w-[340px]" : grid[layout]}>
      {items.map((it) => (
        <figure key={it.image}>
          <div className={`overflow-hidden ${layout === "phones" ? "" : "rounded-2xl border border-line bg-panel"}`}>
            <ZoomImage k={it.image} alt={it.caption} native={layout !== "wide"} />
          </div>
          <figcaption className="mt-3 text-[15px] leading-snug text-sub">{it.caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}
