"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";
import { useSiteMotion } from "./SiteMotion";

type Props = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
  /** Word shown on the curtain while the next page loads. */
  label?: string;
};

/** Internal services-site link that plays the curtain transition (or smooth-scrolls on the same page). */
export default function TransitionLink({ href, label, onClick, ...props }: Props) {
  const { navigate } = useSiteMotion();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }
    event.preventDefault();
    navigate(href, label);
  };

  return <Link href={href} onClick={handleClick} {...props} />;
}
