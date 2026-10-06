import { portfolioOgImage, ogSize } from "@/lib/og";

export const alt = "Jeetu Prasad — Full Stack Developer portfolio";
export const size = ogSize;
export const contentType = "image/png";
export const runtime = "edge";

export default function Image() {
  return portfolioOgImage();
}
