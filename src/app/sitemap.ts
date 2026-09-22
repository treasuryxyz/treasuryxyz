import type { MetadataRoute } from "next";
import { brand } from "@/lib/brand";
import { listings } from "@/lib/vault";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/vault", "/deposit", "/tokenomics"].map((path) => ({
    url: `${brand.url}${path}`,
    lastModified: new Date(),
  }));

  const items = listings.map((entry) => ({
    url: `${brand.url}/vault/${entry.id}`,
    lastModified: new Date(),
  }));

  return [...routes, ...items];
}
