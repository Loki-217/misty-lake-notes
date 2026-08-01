import type { Metadata } from "next";
import Link from "next/link";
import { MarkdownArticle } from "../../components/MarkdownArticle";
import { SiteFooter, SiteHeader } from "../../components/SiteChrome";
import { getScreening, getScreenings } from "../../lib/content";

export function generateStaticParams() { return getScreenings().map((entry) => ({ slug: entry.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const entry = getScreening(slug); return { title: entry ? `${entry.title}｜⑨号放映室` : "条目未找到", description: entry?.summary }; }

export default async function ScreeningPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const entry = getScreening(slug);
  if (!entry) return <main className="room-page"><SiteHeader active="room"/><section className="empty-journal shell"><h1>条目没有找到</h1><Link className="button primary" href="/room-nine">返回放映室</Link></section><SiteFooter/></main>;
  return <main className="room-page"><SiteHeader active="room"/><article className="article-page screening-article shell"><div className="article-masthead"><p className="eyebrow">{entry.category} · {entry.tag}</p><span className="article-glyph">{entry.glyph}</span><h1>{entry.title}</h1><p>{entry.summary}</p></div><MarkdownArticle body={entry.body}/><Link className="back-link" href="/room-nine">← 返回⑨号放映室</Link></article><SiteFooter/></main>;
}
