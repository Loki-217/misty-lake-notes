import contentFiles from "./content.generated.json";

export type BaseEntry = {
  slug: string;
  title: string;
  summary: string;
  body: string;
  published: boolean;
};

export type Note = BaseEntry & {
  date: string;
  category: string;
  tags: string[];
  cover: string;
};

export type Screening = BaseEntry & {
  order: number;
  category: string;
  tag: string;
  glyph: string;
};

export type ProjectMetric = { value: string; unit: string; label: string };

export type Project = BaseEntry & {
  year: string;
  order: number;
  type: string;
  tagline: string;
  tech: string[];
  source: string;
  demo: string;
  metrics: ProjectMetric[];
};

const noteFiles: Record<string, string> = contentFiles.notes;
const screeningFiles: Record<string, string> = contentFiles.screenings;
const projectFiles: Record<string, string> = contentFiles.projects;

function slugFromPath(path: string) {
  return path.split("/").pop()?.replace(/\.md$/, "") ?? "entry";
}

function parseDocument(source: string) {
  const normalized = source.replace(/\r\n/g, "\n");
  if (!normalized.startsWith("---\n")) return { data: {} as Record<string, string>, body: normalized.trim() };
  const end = normalized.indexOf("\n---\n", 4);
  if (end < 0) return { data: {} as Record<string, string>, body: normalized.trim() };
  const data: Record<string, string> = {};
  for (const line of normalized.slice(4, end).split("\n")) {
    const split = line.indexOf(":");
    if (split < 0) continue;
    data[line.slice(0, split).trim()] = line.slice(split + 1).trim();
  }
  return { data, body: normalized.slice(end + 5).trim() };
}

function truthy(value: string | undefined) {
  return value !== "false" && value !== "no" && value !== "0";
}

export function getNotes(): Note[] {
  return Object.entries(noteFiles).map(([path, source]) => {
    const { data, body } = parseDocument(source);
    return {
      slug: slugFromPath(path), title: data.title || "未命名手记", summary: data.summary || "",
      body, published: truthy(data.published) && !truthy(data.draft), date: data.date || "",
      category: data.category || "未分类", tags: (data.tags || "").split(",").map((v) => v.trim()).filter(Boolean), cover: data.cover || "",
    };
  }).filter((entry) => entry.published).sort((a, b) => b.date.localeCompare(a.date));
}

export function getScreenings(): Screening[] {
  return Object.entries(screeningFiles).map(([path, source]) => {
    const { data, body } = parseDocument(source);
    return {
      slug: slugFromPath(path), title: data.title || "未命名条目", summary: data.summary || "", body,
      published: truthy(data.published), order: Number(data.order || 999), category: data.category || "其他",
      tag: data.tag || "SCREENING", glyph: data.glyph || "◇",
    };
  }).filter((entry) => entry.published).sort((a, b) => a.order - b.order);
}

export function getProjects(): Project[] {
  return Object.entries(projectFiles).map(([path, source]) => {
    const { data, body } = parseDocument(source);
    const metrics = (data.metrics || "").split(";;").filter(Boolean).map((metric) => {
      const [value = "", unit = "", label = ""] = metric.split("::");
      return { value, unit, label };
    });
    return {
      slug: slugFromPath(path), title: data.title || "未命名项目", summary: data.summary || "", body,
      published: truthy(data.published), year: data.year || "", order: Number(data.order || 999), type: data.type || "PROJECT",
      tagline: data.tagline || "", tech: (data.tech || "").split(",").map((v) => v.trim()).filter(Boolean),
      source: data.source || "", demo: data.demo || "", metrics,
    };
  }).filter((entry) => entry.published).sort((a, b) => a.order - b.order);
}

export function getNote(slug: string) { return getNotes().find((entry) => entry.slug === slug); }
export function getScreening(slug: string) { return getScreenings().find((entry) => entry.slug === slug); }
export function getProject(slug: string) { return getProjects().find((entry) => entry.slug === slug); }

export function getSearchEntries() {
  return [
    ...getNotes().map((entry) => ({ title: entry.title, summary: entry.summary, href: `/notes/${entry.slug}`, type: "手记", keywords: `${entry.category} ${entry.tags.join(" ")} ${entry.body}` })),
    ...getScreenings().map((entry) => ({ title: entry.title, summary: entry.summary, href: `/room-nine/${entry.slug}`, type: "放映室", keywords: `${entry.category} ${entry.tag} ${entry.body}` })),
    ...getProjects().map((entry) => ({ title: entry.title, summary: entry.summary, href: `/workbench/${entry.slug}`, type: "项目", keywords: `${entry.type} ${entry.tech.join(" ")} ${entry.body}` })),
  ];
}
