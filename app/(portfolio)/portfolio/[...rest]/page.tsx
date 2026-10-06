import { notFound } from "next/navigation";

// Any unknown /portfolio/* address renders the portfolio's own (neon) 404.
export default function PortfolioCatchAll() {
  notFound();
}
