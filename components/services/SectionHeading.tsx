interface SectionHeadingProps {
  /** Two-digit section number shown in the label pill. */
  num: string;
  label: string;
  title: React.ReactNode;
  intro?: string;
  /** Narrowest width the title wraps to, in ch. */
  titleWidth?: string;
  /** Set on dark (ink) panels. */
  inverse?: boolean;
}

/** Numbered label pill + large title, with an optional intro paragraph to the right. */
export default function SectionHeading({ num, label, title, intro, titleWidth = "16ch", inverse = false }: SectionHeadingProps) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-16 gap-y-6">
      <div className="flex-[1_1_480px]">
        <div
          data-reveal=""
          className={`caps inline-flex items-center gap-2.5 rounded-full border py-1.5 pl-1.5 pr-3.5 ${
            inverse ? "border-inv-line bg-inv-fill" : "border-line bg-surface shadow-sm"
          }`}
        >
          <span
            className={`rounded-full px-[9px] py-1 text-[10.5px] tracking-[.04em] ${
              inverse ? "bg-inv-accent text-ink" : "bg-accent text-accent-ink"
            }`}
          >
            {num}
          </span>
          {label}
        </div>
        <h2 data-reveal="" className="h-section mt-5" style={{ maxWidth: titleWidth }}>
          {title}
        </h2>
      </div>
      {intro && (
        <p data-reveal="" className="lede flex-[0_1_380px]">
          {intro}
        </p>
      )}
    </div>
  );
}
