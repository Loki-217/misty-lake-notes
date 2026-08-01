import type { Metadata } from "next";
import Link from "next/link";
import { MarkdownArticle } from "../../components/MarkdownArticle";
import { SiteFooter, SiteHeader } from "../../components/SiteChrome";
import { getNote, getNotes } from "../../lib/content";

export function generateStaticParams() { return getNotes().map((note) => ({ slug: note.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const note = getNote(slug); return { title: note?.title || "手记未找到", description: note?.summary };
}

export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const note = getNote(slug);
  if (!note) return <main><SiteHeader active="notes"/><section className="empty-journal shell"><h1>手记没有找到</h1><Link className="button primary" href="/notes">返回手记</Link></section><SiteFooter/></main>;
  return <main><SiteHeader active="notes"/><article className="article-page shell"><div className="article-masthead"><p className="eyebrow">{note.category} · {note.date}</p><h1>{note.title}</h1><p>{note.summary}</p><div>{note.tags.map((tag) => <span key={tag}>#{tag}</span>)}</div></div><MarkdownArticle body={note.body}/><Link className="back-link" href="/notes">← 返回全部手记</Link></article><SiteFooter/></main>;
}
