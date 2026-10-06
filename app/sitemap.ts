import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";
import { showcase } from "@/lib/showcase";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entry = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority,
  });

  return [
    // Services site
    entry("/", 1),
    entry("/services", 0.9),
    entry("/contact", 0.8),
    ...showcase.map((item) => entry(`/work/${item.slug}`, 0.7)),
    // Developer portfolio
    entry("/portfolio", 0.9),
    ...projects.map((project) => entry(`/portfolio/work/${project.slug}`, 0.6)),
  ];
}
