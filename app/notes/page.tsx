import type { Metadata } from "next";
import { NotesList } from "../components/ContentFilters";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";
import { getNotes } from "../lib/content";

export const metadata: Metadata = { title: "冰湖手记" };

const shelves = [
  { number: "01", name: "日常碎片", english: "DAILY FRAGMENTS", desc: "短短的近况、途中捡到的句子，以及没必要展开的心情。" },
  { number: "02", name: "长篇手记", english: "LAKESIDE JOURNALS", desc: "值得坐下来慢慢讲的生活、选择和阶段性思考。" },
  { number: "03", name: "技术复盘", english: "DEV LOGS", desc: "项目背后的判断、踩过的坑，以及最后留下来的方法。" },
];

export default function NotesPage() {
  const notes = getNotes();
  return (
    <main>
      <SiteHeader active="notes" />
      <section className="page-hero shell">
        <p className="eyebrow"><span /> LAKESIDE JOURNAL</p>
        <h1>冰湖手记</h1>
        <p>生活不是一条完整的叙事。这里收集那些值得留下、<br />又不一定有结论的片段。</p>
        <span className="page-number">01 / NOTES</span>
      </section>
      <section className="shelf-grid shell">
        {shelves.map((item) => (
          <article className="shelf-card" key={item.number}>
            <span>{item.number}</span><small>{item.english}</small>
            <h2>{item.name}</h2><p>{item.desc}</p>
          </article>
        ))}
      </section>
      <NotesList notes={notes} />
      <SiteFooter />
    </main>
  );
}
