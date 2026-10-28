import { useId } from "react";
import logo from "@/data/logo.json";

export function Logo({ className = "" }: { className?: string }) {
  const id = "lg" + useId().replace(/:/g, "");
  const mark = (logo.mark as string).replace("url(#g)", `url(#${id})`);
  return (
    <svg viewBox={`0 0 ${58 + logo.wordW} 44`} className={className} role="img" aria-label="Ahtasham Anjum">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8E73FF" />
          <stop offset="1" stopColor="#5A3EE0" />
        </linearGradient>
      </defs>
      <g transform="scale(0.6875)" dangerouslySetInnerHTML={{ __html: mark }} />
      <path transform={`translate(58 ${22 + logo.wordH / 2})`} d={logo.wordPath} fill="currentColor" />
    </svg>
  );
}
