import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/" }, sitemap: "https://misty-lake-notes.khalil-lau.chatgpt.site/sitemap.xml" };
}
