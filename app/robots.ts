import { MetadataRoute } from "next";
import { headers } from "next/headers";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const headersList = await headers();
  const host = headersList?.get("host") || "";

  const robots = {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/_next/static/chunks/", "/_next/static/css/", "/_next/static/media/", "/_next/data/", "/api/"],
    },
    sitemap: `https://${host}/sitemap.xml`,
  };

  return robots;
}
