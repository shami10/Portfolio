const icons: Record<string, React.ReactNode> = {
  understand: (<><circle cx="14" cy="14" r="7" /><path d="m19.5 19.5 7 7" /></>),
  structure: (<><rect x="12" y="4" width="8" height="6" rx="1.5" /><rect x="3" y="22" width="8" height="6" rx="1.5" /><rect x="21" y="22" width="8" height="6" rx="1.5" /><path d="M16 10v5M7 22v-4h18v4" /></>),
  design: (<><rect x="4" y="5" width="24" height="22" rx="3" /><path d="M4 11h24M10 17h6M10 22h12" /></>),
  deliver: (<><rect x="4" y="5" width="24" height="22" rx="3" /><path d="m10 16 4 4 8-8" /></>),
};

export function Principles({ items }: { items: readonly { icon: string; title: string; text: string }[] }) {
  return (
    <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
      {items.map((s, i) => (
        <li key={s.title} className="relative rounded-[22px] border border-line bg-panel p-7">
          <div className="flex items-start justify-between">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#B8ACFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              {icons[s.icon]}
            </svg>
            <span className="h-display text-4xl text-line" aria-hidden>0{i + 1}</span>
          </div>
          <h3 className="h-display mt-8 text-2xl">{s.title}</h3>
          <p className="mt-3 text-[15px] leading-snug text-sub">{s.text}</p>
        </li>
      ))}
    </ol>
  );
}
