"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Note, Screening } from "../lib/content";

export function NotesList({ notes }: { notes: Note[] }) {
  const categories = ["全部", ...Array.from(new Set(notes.map((note) => note.category)))];
  const [active, setActive] = useState("全部");
  const visible = active === "全部" ? notes : notes.filter((note) => note.category === active);
  if (!notes.length) return <EmptyNotes />;
  return (
    <section className="content-library shell">
      <div className="filter-bar" aria-label="手记分类">{categories.map((category) => <button className={category === active ? "active" : ""} key={category} onClick={() => setActive(category)}>{category}</button>)}</div>
      <div className="entry-list">{visible.map((note, index) => <Link href={`/notes/${note.slug}`} key={note.slug}><span>{String(index + 1).padStart(2, "0")}</span><div><small>{note.date} · {note.category}</small><h2>{note.title}</h2><p>{note.summary}</p></div><i>READ ↗</i></Link>)}</div>
    </section>
  );
}

function EmptyNotes() {
  return <section className="empty-journal shell"><div className="empty-symbol">✦</div><p className="kicker">FIRST ENTRY IS ON THE WAY</p><h2>第一页，还在等一个合适的晚上。</h2><p>复制文章模板、开始写作，把 draft 改为 false 后会自动出现在这里。</p><div className="hero-actions centered"><Link className="button primary" href="/room-nine">去放映室 <span>↗</span></Link><Link className="button ghost" href="/workbench">看看工作台 <span>↗</span></Link></div></section>;
}

export function ScreeningGrid({ entries }: { entries: Screening[] }) {
  const categories = useMemo(() => ["全部", ...Array.from(new Set(entries.map((entry) => entry.category)))], [entries]);
  const [active, setActive] = useState("全部");
  const visible = active === "全部" ? entries : entries.filter((entry) => entry.category === active);
  return (
    <section className="screening-library shell">
      <div className="filter-bar dark" aria-label="放映室分类">{categories.map((category) => <button className={category === active ? "active" : ""} key={category} onClick={() => setActive(category)}>{category}</button>)}</div>
      <div className="interest-grid">{visible.map((item, index) => <Link className="interest-card" href={`/room-nine/${item.slug}`} key={item.slug}><div className="interest-glyph">{item.glyph}</div><div className="interest-copy"><p>{String(index + 1).padStart(2, "0")} · {item.tag}</p><h2>{item.title}</h2><span>{item.summary}</span><b>ENTER ↗</b></div></Link>)}</div>
    </section>
  );
}
