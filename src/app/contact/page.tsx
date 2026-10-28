import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { opportunities, site } from "@/data/site";
import { btnGhost, container } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Ahtasham Anjum about Senior UI/UX, Lead UI/UX and Product Design roles, or a freelance collaboration.",
};

export default function Contact() {
  return (
    <div className={`${container} pt-36`}>
      <h1 className="h-display max-w-4xl text-5xl md:text-7xl">Let’s make something useful.</h1>
      <p className="mt-6 max-w-2xl text-xl text-sub">
        If you’re building a digital product, improving an existing experience, or looking for a UI/UX designer to join your team, I’d be happy to hear from you.
      </p>

      <div className="mt-16 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-7">
          <ContactForm email={site.email} />
        </div>
        <aside className="space-y-10 md:col-span-4 md:col-start-9">
          <div>
            <h2 className="text-lg text-mist">Direct contact</h2>
            <p className="mt-3"><a href={`mailto:${site.email}`} className="underline decoration-violet decoration-2 underline-offset-4 break-all">{site.email}</a></p>
            <p className="mt-2"><a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="underline decoration-line decoration-2 underline-offset-4 hover:decoration-violet">LinkedIn</a></p>
            <a href={site.resume} download className={`${btnGhost} mt-5`}>Download résumé</a>
          </div>
          <div>
            <h2 className="text-lg text-mist">What I’m looking for</h2>
            <ul className="mt-3 space-y-2 text-sub">
              {opportunities.map((o) => (<li key={o}>{o}</li>))}
            </ul>
          </div>
        </aside>
      </div>

      <p className="h-display mt-24 text-3xl text-mist md:text-4xl">Good products deserve thoughtful experiences.</p>
    </div>
  );
}
