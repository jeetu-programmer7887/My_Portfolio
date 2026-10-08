import { ArrowUpRight, type LucideIcon } from "lucide-react";
import TransitionLink from "./motion/TransitionLink";

interface PillLinkProps {
  href: string;
  /** Curtain label when the link changes page. */
  label?: string;
  children: React.ReactNode;
  /** Pill + knob colours, e.g. "btn-accent" or "bg-inv-accent text-ink". */
  tone?: string;
  /** Knob colours (the round icon holder). */
  knob?: string;
  icon?: LucideIcon;
  className?: string;
}

/** Internal call-to-action: label on the left, round icon "knob" on the right. */
export default function PillLink({
  href,
  label,
  children,
  tone = "btn-accent",
  knob = "bg-accent-ink text-accent",
  icon: Icon = ArrowUpRight,
  className = "",
}: PillLinkProps) {
  return (
    <TransitionLink href={href} label={label} className={`btn-pill ${tone} ${className}`}>
      <span>{children}</span>
      <span className={`btn-knob ${knob}`}>
        <Icon size={17} aria-hidden="true" />
      </span>
    </TransitionLink>
  );
}
