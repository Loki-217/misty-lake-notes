import type { ReactNode } from "react";

function inline(text: string): ReactNode[] {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g).filter(Boolean);
  return parts.map((part, index) => {
    if (part.startsWith("`") && part.endsWith("`")) return <code key={index}>{part.slice(1, -1)}</code>;
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={index}>{part.slice(2, -2)}</strong>;
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) return <a key={index} href={link[2]} target={link[2].startsWith("http") ? "_blank" : undefined} rel="noreferrer">{link[1]}</a>;
    return part;
  });
}

export function MarkdownArticle({ body }: { body: string }) {
  const lines = body.split("\n");
  const blocks: ReactNode[] = [];
  let paragraph: string[] = [];
  let list: string[] = [];
  let code: string[] | null = null;

  const flushParagraph = () => {
    if (paragraph.length) blocks.push(<p key={`p-${blocks.length}`}>{inline(paragraph.join(" "))}</p>);
    paragraph = [];
  };
  const flushList = () => {
    if (list.length) blocks.push(<ul key={`ul-${blocks.length}`}>{list.map((item, i) => <li key={i}>{inline(item)}</li>)}</ul>);
    list = [];
  };

  for (const line of lines) {
    if (line.startsWith("```")) {
      flushParagraph(); flushList();
      if (code) { blocks.push(<pre key={`pre-${blocks.length}`}><code>{code.join("\n")}</code></pre>); code = null; }
      else code = [];
      continue;
    }
    if (code) { code.push(line); continue; }
    if (!line.trim()) { flushParagraph(); flushList(); continue; }
    if (line.startsWith("### ")) { flushParagraph(); flushList(); blocks.push(<h3 key={`h3-${blocks.length}`}>{inline(line.slice(4))}</h3>); continue; }
    if (line.startsWith("## ")) { flushParagraph(); flushList(); blocks.push(<h2 key={`h2-${blocks.length}`}>{inline(line.slice(3))}</h2>); continue; }
    if (line.startsWith("# ")) { flushParagraph(); flushList(); blocks.push(<h2 key={`h1-${blocks.length}`}>{inline(line.slice(2))}</h2>); continue; }
    if (line.startsWith("> ")) { flushParagraph(); flushList(); blocks.push(<blockquote key={`q-${blocks.length}`}>{inline(line.slice(2))}</blockquote>); continue; }
    if (/^[-*] /.test(line)) { flushParagraph(); list.push(line.slice(2)); continue; }
    paragraph.push(line.trim());
  }
  flushParagraph(); flushList();
  if (code) blocks.push(<pre key={`pre-${blocks.length}`}><code>{code.join("\n")}</code></pre>);
  return <div className="markdown-body">{blocks}</div>;
}
