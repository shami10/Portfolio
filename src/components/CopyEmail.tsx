"use client";
import { useState } from "react";
import { btnGhost } from "@/lib/ui";

export function CopyEmail({ email }: { email: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className={btnGhost}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(email);
          setDone(true);
          setTimeout(() => setDone(false), 2000);
        } catch {
          window.location.href = `mailto:${email}`;
        }
      }}
    >
      <span aria-live="polite">{done ? "Email copied" : "Copy email"}</span>
    </button>
  );
}
