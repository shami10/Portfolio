import type { Metadata } from "next";
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/figtree";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: { default: "Ahtasham Anjum, Senior UI/UX and Product Designer", template: "%s | Ahtasham Anjum" },
  description:
    "Portfolio of Ahtasham Anjum, a Senior UI/UX and Product Designer with 9 years of experience designing web and mobile products, dashboards and AI-powered experiences.",
  icons: { icon: "/icon.svg" },
  openGraph: {
    title: "Ahtasham Anjum, Senior UI/UX and Product Designer",
    description: "Case studies in mobile apps, dashboards and web design.",
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-violet focus:px-4 focus:py-2">
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
