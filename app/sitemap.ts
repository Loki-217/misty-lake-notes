import type { MetadataRoute } from "next";
import { getNotes, getProjects, getScreenings } from "./lib/content";

const baseUrl = "https://misty-lake-notes.khalil-lau.chatgpt.site";

export default function sitemap(): MetadataRoute.Sitemap {
  const fixed = ["", "/notes", "/room-nine", "/workbench", "/about"];
  return [
    ...fixed.map((path) => ({ url: `${baseUrl}${path}`, changeFrequency: "monthly" as const, priority: path === "" ? 1 : .7 })),
    ...getNotes().map((entry) => ({ url: `${baseUrl}/notes/${entry.slug}`, lastModified: entry.date, changeFrequency: "yearly" as const, priority: .6 })),
    ...getScreenings().map((entry) => ({ url: `${baseUrl}/room-nine/${entry.slug}`, changeFrequency: "yearly" as const, priority: .5 })),
    ...getProjects().map((entry) => ({ url: `${baseUrl}/workbench/${entry.slug}`, changeFrequency: "yearly" as const, priority: .8 })),
  ];
}
