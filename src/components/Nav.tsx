"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "./Logo";

const links = [
  { href: "/", label: "Home" },
  { href: "/about/", label: "About" },
  { href: "/work/", label: "Work" },
  { href: "/contact/", label: "Contact" },
];

export function Nav() {
  const path = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const active = (href: string) => (href === "/" ? path === "/" : path.startsWith(href.replace(/\/$/, "")));

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-6 mt-3 flex max-w-[1240px] items-center justify-between rounded-full border border-line/80 bg-ink/75 py-2 pl-4 pr-3 backdrop-blur-md md:mx-10 lg:mx-auto lg:w-[calc(100%-5rem)]">
        <Link href="/" aria-label="Ahtasham Anjum, home" onClick={() => setOpen(false)} className="text-paper">
          <Logo className="h-8 w-auto" />
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={active(l.href) ? "page" : undefined}
              className={`rounded-full px-4 py-2 text-[15px] transition-colors ${active(l.href) ? "bg-raised text-paper" : "text-sub hover:text-paper"}`}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/contact/" className="ml-2 rounded-full bg-violet px-5 py-2 text-[15px] font-medium text-white transition-colors hover:bg-violet-soft">
            Let’s talk
          </Link>
        </nav>
        <button
          type="button"
          className="rounded-full border border-line px-4 py-2 text-sm md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="mx-6 mt-2 rounded-3xl border border-line bg-panel p-3 md:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              aria-current={active(l.href) ? "page" : undefined}
              className={`block rounded-2xl px-4 py-3 text-lg hover:bg-raised ${active(l.href) ? "bg-raised" : ""}`}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/contact/" onClick={() => setOpen(false)} className="mt-1 block rounded-2xl bg-violet px-4 py-3 text-center text-lg font-medium text-white">
            Let’s talk
          </Link>
        </nav>
      )}
    </header>
  );
}
