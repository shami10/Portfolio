"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { categoryLabels, projects, type Category } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";

const filters: ("All" | Category)[] = ["All", "Dashboard", "Mobile", "Web", "AI"];

export function WorkGrid() {
  const [f, setF] = useState<"All" | Category>("All");
  const list = projects.filter((p) => f === "All" || p.categories.includes(f));
  return (
    <>
      <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2">
        {filters.map((x) => (
          <button
            key={x}
            type="button"
            aria-pressed={f === x}
            onClick={() => setF(x)}
            className={`rounded-full border px-5 py-2 text-[15px] transition-colors ${f === x ? "border-violet bg-violet text-white" : "border-line text-sub hover:border-mist hover:text-paper"}`}
          >
            {x === "All" ? "All work" : categoryLabels[x]}
          </button>
        ))}
      </div>
      <motion.ul layout className="mt-12 grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((p) => (
            <motion.li
              key={p.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <ProjectCard p={p} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </>
  );
}
