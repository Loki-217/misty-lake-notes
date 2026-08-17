import Link from "next/link";
import { NineSecret, SiteFooter, SiteHeader } from "./components/SiteChrome";
import { getNotes, getProjects, getScreenings } from "./lib/content";
import { profile } from "../config/profile";
import { statusItems } from "../config/status";

export default function Home() {
  const publishedNotes = getNotes();
  const screenings = getScreenings();
  const projects = getProjects();
  const recent = [
    ...publishedNotes.slice(0, 2).map((note) => ({ type: note.category, date: note.date, title: note.title, excerpt: note.summary, mark: "记", href: `/notes/${note.slug}` })),
    ...screenings.slice(0, Math.max(0, 2 - publishedNotes.length)).map((entry) => ({ type: entry.category, date: "SCREENING", title: entry.title, excerpt: entry.summary, mark: entry.glyph, href: `/room-nine/${entry.slug}` })),
    ...projects.slice(0, 1).map((project) => ({ type: "工作台", date: project.year, title: `${project.title}：${project.tagline}`, excerpt: project.summary, mark: "码", href: `/workbench/${project.slug}` })),
  ].slice(0, 3);
  return (
    <main>
      <div className="danmaku-field" aria-hidden="true"><i/><i/><i/><i/><i/><i/><i/><i/><i/></div>

      <SiteHeader active="home" />

      <section className="hero shell" aria-labelledby="hero-title">
        <div className="booklet-spine" aria-hidden="true"><span>MLN—009</span><b>MISTY LAKE PRESS</b><small>2026</small></div>
        <div className="hero-panel">
          <div className="hero-copy">
            <p className="eyebrow"><span>✦</span> PERSONAL DOUJIN WEB / SIDE A</p>
            <h1 id="hero-title">Misty<br /><em>Lake Notes</em></h1>
            <p className="hero-kana">霧 の 湖 畔 通 信</p>
            <p className="hero-lead">Hi, I&apos;m {profile.name}.<br />{profile.intro}</p>
            <div className="hero-actions">
              <a className="button primary" href="#now"><span>▶</span> PLAY SIDE A</a>
              <Link className="button ghost" href="/workbench"><span>01</span> WORKBENCH</Link>
            </div>
          </div>

          <div className="hero-art">
            <div className="hero-illustration" role="img" aria-label="琪露诺 Fumo 玩偶的复古同人志封面视觉" />
            <div className="spell-ring ring-one" />
            <div className="spell-ring ring-two" />
            <NineSecret />
            <p className="fairy-label">FUMO 09 / LAKE GUIDE<br/><b>THE STRONGEST? DEFINITELY.</b></p>
          </div>
          <div className="cover-stamp">⑨<br/><small>EXTRA STAGE</small></div>
          <p className="cover-credit">
            3D SCAN: <a href="https://sketchfab.com/3d-models/project-cirno-fumo-3d-scan-efd2a7f4dbf048c1a18438db7f86c4b9" target="_blank" rel="noreferrer">RENAFOX</a> · <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noreferrer">CC BY 4.0</a><br/>
            DESIGN + WORDS + CODE: JASON
          </p>
        </div>
        <div className="obi-strip"><b>NEW RELEASE</b><span>日常 / 游戏 / 东方 / 技术</span><i>湖边的不定期个人通信</i></div>
      </section>

      <section className="now-section shell" id="now" aria-labelledby="now-title">
        <div className="section-heading">
          <div>
            <p className="kicker">SIDE A · CURRENT SIGNAL</p>
            <h2 id="now-title">此刻的我</h2>
          </div>
          <p>LINER NOTES / 不是履历，只是现在。<br />Last updated · {profile.updatedAt}</p>
        </div>
        <div className="now-grid">
          {statusItems.map((item) => (
            <article className={`now-card ${item.tone}`} key={item.label}>
              <span className="card-index">{item.index}</span>
              <p>{item.label}</p>
              <h3>{item.value}</h3>
              <small>{item.note}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="notes-section shell" aria-labelledby="notes-title">
        <div className="section-heading notes-heading">
          <div>
            <p className="kicker">SIDE B · RECENT NOTES</p>
            <h2 id="notes-title">最近记录</h2>
          </div>
          <Link href="/notes">全部记录 <span>→</span></Link>
        </div>
        <div className="notes-grid">
          {recent.map((note, index) => (
            <Link className={`note-card note-${index + 1}`} href={note.href} key={note.title}>
              <div className="note-meta"><span>{note.type}</span><time>{note.date}</time></div>
              <div className="note-mark" aria-hidden="true">{note.mark}</div>
              <h3>{note.title}</h3>
              <p>{note.excerpt}</p>
              <span className="read-more">READ NOTE ↗</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="routes-section shell" aria-labelledby="routes-title">
        <p className="kicker">SELECT MODE / PLAYER 1</p>
        <h2 id="routes-title">从哪里开始逛？</h2>
        <div className="route-list">
          <Link href="/notes"><span>01</span><b>看看我的生活</b><small>日常、随想与途中捡到的碎片</small><i>↗</i></Link>
          <Link href="/room-nine"><span>02</span><b>聊聊游戏和幻想乡</b><small>东方、游戏、音乐与不必要的认真</small><i>↗</i></Link>
          <Link href="/workbench"><span>03</span><b>看看我做过什么</b><small>项目、技术与现实世界的工作台</small><i>↗</i></Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
