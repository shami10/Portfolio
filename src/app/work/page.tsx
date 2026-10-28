import type { Metadata } from "next";
import { WorkGrid } from "@/components/WorkGrid";
import { container } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Work",
  description: "Product design, UX improvement, dashboard, mobile app and website projects, with the thinking behind them.",
};

export default function WorkPage() {
  return (
    <div className={`${container} pt-36`}>
      <h1 className="h-display max-w-4xl text-5xl md:text-7xl">Selected work, thoughtful decisions, real design challenges.</h1>
      <p className="mt-6 max-w-2xl text-xl text-sub">
        A selection of product design, UX improvement, dashboard, mobile app and website projects that show how I approach problems and shape digital experiences. Each is labeled as client work, a live product or an independent concept.
      </p>
      <div className="mt-14">
        <WorkGrid />
      </div>
    </div>
  );
}
