import { servicesOgImage, ogSize } from "@/lib/og";

export const alt = "Jeetu Prasad — Websites that bring you more customers";
export const size = ogSize;
export const contentType = "image/png";
export const runtime = "edge";

export default function Image() {
  return servicesOgImage();
}
