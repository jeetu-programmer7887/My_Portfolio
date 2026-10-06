// Browser + phone + growth chart, redrawn from the services deck cover.
// Colours come from theme tokens, so it adapts to light and dark automatically.
export default function HeroIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 560 470"
      role="img"
      aria-label="A business website shown on a laptop browser and a phone, with a rising sales chart"
      className={className}
    >
      {/* halo + blob */}
      <rect x="60" y="8" width="470" height="440" rx="200" className="fill-none stroke-line" strokeWidth="2" />
      <rect x="110" y="34" width="380" height="390" rx="185" className="fill-accent" />

      {/* browser window */}
      <g>
        <rect x="34" y="112" width="350" height="240" rx="16" className="fill-surface" />
        <path d="M34 128a16 16 0 0 1 16-16h318a16 16 0 0 1 16 16v14H34z" className="fill-surface-2" />
        <circle cx="54" cy="127" r="5" className="fill-accent" />
        <circle cx="70" cy="127" r="5" className="fill-accent-soft" />
        <circle cx="86" cy="127" r="5" className="fill-line" />
        <rect x="112" y="120" width="190" height="14" rx="7" className="fill-surface" />

        {/* hero block */}
        <rect x="52" y="156" width="314" height="96" rx="10" className="fill-surface-2" />
        <rect x="68" y="174" width="128" height="12" rx="6" className="fill-ink" />
        <rect x="68" y="194" width="98" height="12" rx="6" className="fill-ink" />
        <rect x="68" y="216" width="120" height="6" rx="3" className="fill-ink-muted" opacity="0.5" />
        <rect x="68" y="228" width="92" height="6" rx="3" className="fill-ink-muted" opacity="0.5" />
        <rect x="248" y="166" width="104" height="76" rx="8" className="fill-accent-soft" />
        <path d="M248 232l30-30 22 20 18-14 34 26v8a8 8 0 0 1-8 8h-88a8 8 0 0 1-8-8z" className="fill-accent" />

        {/* cards */}
        {[52, 160, 268].map((x) => (
          <g key={x}>
            <rect x={x} y="264" width="98" height="72" rx="10" className="fill-surface stroke-line" strokeWidth="2" />
            <rect x={x + 12} y="276" width="20" height="20" rx="5" className="fill-surface-2" />
            <rect x={x + 12} y="306" width="66" height="7" rx="3.5" className="fill-ink" />
            <rect x={x + 12} y="319" width="46" height="5" rx="2.5" className="fill-ink-muted" opacity="0.5" />
          </g>
        ))}
      </g>

      {/* phone */}
      <g>
        <rect x="372" y="172" width="132" height="246" rx="22" className="fill-ink" />
        <rect x="382" y="186" width="112" height="218" rx="14" className="fill-surface" />
        <rect x="420" y="178" width="36" height="5" rx="2.5" className="fill-ink-muted" opacity="0.6" />
        <rect x="392" y="198" width="92" height="62" rx="8" className="fill-accent-soft" />
        <path d="M392 252l22-22 16 14 14-10 40 26v0a8 8 0 0 1-8 8h-76a8 8 0 0 1-8-8z" className="fill-accent" />
        <rect x="392" y="272" width="70" height="8" rx="4" className="fill-ink" />
        <rect x="392" y="286" width="54" height="8" rx="4" className="fill-ink" />
        <rect x="392" y="302" width="88" height="5" rx="2.5" className="fill-ink-muted" opacity="0.5" />
        <rect x="392" y="312" width="70" height="5" rx="2.5" className="fill-ink-muted" opacity="0.5" />
        <rect x="392" y="326" width="92" height="20" rx="10" className="fill-accent" />
        <rect x="392" y="354" width="42" height="38" rx="6" className="fill-surface-2" />
        <rect x="442" y="354" width="42" height="38" rx="6" className="fill-surface-2" />
      </g>

      {/* growth chart */}
      <g>
        <rect x="14" y="300" width="120" height="96" rx="14" className="fill-surface stroke-line" strokeWidth="2" />
        <rect x="32" y="360" width="14" height="20" rx="3" className="fill-accent-soft" />
        <rect x="54" y="348" width="14" height="32" rx="3" className="fill-accent-soft" />
        <rect x="76" y="332" width="14" height="48" rx="3" className="fill-accent" />
        <rect x="98" y="316" width="14" height="64" rx="3" className="fill-accent" />
      </g>

      {/* check badge */}
      <circle cx="470" cy="96" r="34" className="fill-surface" />
      <path d="M454 97l11 11 21-23" className="fill-none stroke-accent" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
