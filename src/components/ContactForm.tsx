"use client";
import { useRef, useState } from "react";
import { btnGhost, btnPrimary } from "@/lib/ui";

const KEY = "167d3f0a-3d78-447a-a52c-33da5727f95f";
const reasons = ["A full-time role", "A freelance project", "A collaboration", "Something else"];
type Errors = Partial<Record<"name" | "email" | "reason" | "message", string>>;

export function ContactForm({ email }: { email: string }) {
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  // Until a form service key is added, say so plainly instead of pretending the form works.
  if (!KEY) {
    return (
      <div className="rounded-[22px] border border-line bg-panel p-7" role="note">
        <h2 className="h-display text-2xl">The message form isn’t switched on yet</h2>
        <p className="mt-3 text-sub">Please email me directly and I’ll reply from there.</p>
        <a href={`mailto:${email}?subject=Portfolio enquiry`} className={`${btnPrimary} mt-6`}>Email me</a>
      </div>
    );
  }

  if (state === "success") {
    return (
      <div className="rounded-[22px] border border-line bg-panel p-7" role="status">
        <h2 className="h-display text-2xl">Thanks, your message was sent.</h2>
        <p className="mt-3 text-sub">I’ll reply by email as soon as I can.</p>
      </div>
    );
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    if (f.get("botcheck")) return; // honeypot: a person never ticks this
    const v = {
      name: String(f.get("name") ?? "").trim(),
      email: String(f.get("email") ?? "").trim(),
      reason: String(f.get("reason") ?? ""),
      message: String(f.get("message") ?? "").trim(),
    };
    const next: Errors = {};
    if (v.name.length < 2) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) next.email = "Please enter a valid email address.";
    if (!v.reason) next.reason = "Please choose a reason.";
    if (v.message.length < 10) next.message = "Please write a few words about what you need (at least 10 characters).";
    setErrors(next);
    const first = Object.keys(next)[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setState("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: KEY,
          from_name: "Portfolio contact form",
          subject: `Portfolio: ${v.reason}`,
          name: v.name,
          email: v.email,
          message: `${v.reason}\n\n${v.message}`,
        }),
      });
      const data = await res.json();
      setState(data.success ? "success" : "error");
    } catch {
      setState("error");
    }
  }

  const field = "mt-2 w-full rounded-xl border bg-ink px-4 py-3 text-paper placeholder:text-sub/60 focus:border-violet focus:outline-none";
  const err = (k: keyof Errors) => (errors[k] ? "border-coral" : "border-line");

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-6 rounded-[22px] border border-line bg-panel p-7 md:p-9">
      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="name">Name</label>
          <input id="name" name="name" autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-err" : undefined} className={`${field} ${err("name")}`} />
          {errors.name && <p id="name-err" className="mt-2 text-sm text-coral">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-err" : undefined} className={`${field} ${err("email")}`} />
          {errors.email && <p id="email-err" className="mt-2 text-sm text-coral">{errors.email}</p>}
        </div>
      </div>
      <div>
        <label htmlFor="reason">What would you like to talk about?</label>
        <select id="reason" name="reason" defaultValue="" aria-invalid={!!errors.reason} aria-describedby={errors.reason ? "reason-err" : undefined} className={`${field} ${err("reason")}`}>
          <option value="" disabled>Choose one</option>
          {reasons.map((r) => (<option key={r} value={r}>{r}</option>))}
        </select>
        {errors.reason && <p id="reason-err" className="mt-2 text-sm text-coral">{errors.reason}</p>}
      </div>
      <div>
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" rows={6} aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-err" : undefined} className={`${field} ${err("message")}`} />
        {errors.message && <p id="message-err" className="mt-2 text-sm text-coral">{errors.message}</p>}
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={state === "sending"} className={`${btnPrimary} disabled:opacity-60`}>
          {state === "sending" ? "Sending…" : "Send message"}
        </button>
        <div aria-live="polite" className="text-sm">
          {state === "error" && (
            <span className="text-coral">
              Something went wrong and your message was not sent. Please try again, or{" "}
              <a className="underline" href={`mailto:${email}`}>email me directly</a>.
            </span>
          )}
        </div>
      </div>
    </form>
  );
}
