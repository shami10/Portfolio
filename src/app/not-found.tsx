import Link from "next/link";
import { btnPrimary, container } from "@/lib/ui";

export default function NotFound() {
  return (
    <div className={`${container} pt-40`}>
      <h1 className="h-display text-5xl md:text-7xl">This page doesn’t exist.</h1>
      <p className="mt-4 text-lg text-sub">The link may be old or mistyped. The work is a good place to start.</p>
      <Link href="/work/" className={`${btnPrimary} mt-8`}>See the work</Link>
    </div>
  );
}
