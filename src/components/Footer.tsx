import Link from "next/link";
import { site } from "@/data/site";
import { container } from "@/lib/ui";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-line">
      <div className={`${container} grid gap-10 py-14 md:grid-cols-12`}>
        <div className="md:col-span-6">
          <Logo className="h-9 w-auto text-paper" />
          <p className="mt-5 max-w-sm text-sub">{site.statement}</p>
        </div>
        <nav aria-label="Footer" className="md:col-span-3">
          <ul className="space-y-2">
            {[["Home", "/"], ["About", "/about/"], ["Work", "/work/"], ["Contact", "/contact/"]].map(([l, h]) => (
              <li key={h}><Link href={h} className="text-sub transition-colors hover:text-paper">{l}</Link></li>
            ))}
          </ul>
        </nav>
        <ul className="space-y-2 md:col-span-3">
          <li><a href={`mailto:${site.email}`} className="text-sub transition-colors hover:text-paper">{site.email}</a></li>
          <li><a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="text-sub transition-colors hover:text-paper">LinkedIn</a></li>
          <li><a href={site.resume} download className="text-sub transition-colors hover:text-paper">Résumé (PDF)</a></li>
        </ul>
      </div>
      <div className={`${container} border-t border-line py-6 text-sm text-sub`}>© {new Date().getFullYear()} {site.name}. Based in {site.location}, open to remote roles.</div>
    </footer>
  );
}
