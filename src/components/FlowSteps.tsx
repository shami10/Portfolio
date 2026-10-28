"use client";
import { motion } from "framer-motion";

export function FlowSteps({ steps }: { steps: { title: string; text: string }[] }) {
  return (
    <ol className={`grid gap-6 sm:grid-cols-2 ${steps.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
      {steps.map((s, i) => (
        <li key={s.title} className="relative rounded-2xl border border-line bg-panel p-6">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-raised text-sm text-mist" aria-hidden>
            {i + 1}
          </span>
          <h3 className="h-display mt-5 text-xl">{s.title}</h3>
          <p className="mt-2 text-[15px] leading-snug text-sub">{s.text}</p>
          {i < steps.length - 1 && (
            <motion.span
              aria-hidden
              className="absolute left-full top-10 hidden h-[2px] w-6 origin-left bg-violet lg:block"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.5, delay: 0.25 + i * 0.3, ease: "easeOut" }}
            >
              <span className="absolute -right-0.5 -top-[3px] h-2 w-2 rotate-45 border-r-2 border-t-2 border-violet" />
            </motion.span>
          )}
        </li>
      ))}
    </ol>
  );
}
