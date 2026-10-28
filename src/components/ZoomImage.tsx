"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { img } from "@/lib/images";

export function ZoomImage({ k, alt, native = false, className = "" }: { k: string; alt: string; native?: boolean; className?: string }) {
  const im = img(k);
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Enlarge image: ${alt}`}
        className={`mx-auto block w-full cursor-zoom-in ${className}`}
        style={native ? { maxWidth: im.w } : undefined}
      >
        <img src={im.src} width={im.w} height={im.h} alt={alt} loading="lazy" decoding="async" className="h-auto w-full" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={alt}
            className="fixed inset-0 z-[100] overflow-auto bg-ink/95 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
          >
            <button ref={closeRef} type="button" onClick={() => setOpen(false)} className="fixed right-5 top-5 z-10 rounded-full bg-raised px-4 py-2 text-sm">
              Close
            </button>
            <div className="min-h-full p-4 pt-16 md:p-10 md:pt-20">
              <motion.img
                initial={{ scale: 0.97 }}
                animate={{ scale: 1 }}
                src={im.src}
                alt={alt}
                width={im.w}
                height={im.h}
                style={{ width: im.w > 700 ? `min(max(100%, 1000px), ${im.w}px)` : `min(100%, ${im.w}px)` }}
                className="mx-auto h-auto max-w-none rounded-xl"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
