import { notFound } from "next/navigation";

// Any unknown address outside /portfolio renders the services-style 404
// (app/(services)/(fallback)/not-found.tsx). Unknown /portfolio/* addresses are caught
// by app/(portfolio)/portfolio/[...rest] and get the neon 404 instead.
export default function ServicesCatchAll() {
  notFound();
}
