import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";
import { profile } from "../../config/profile";
import { statusItems } from "../../config/status";

export const metadata: Metadata = { title: "关于 Jason" };

export default function AboutPage() {
  return (
    <main>
      <SiteHeader active="about" />
      <section className="about-hero shell">
        <div className="about-title"><p className="eyebrow"><span /> OBSERVATION LOG</p><h1>关于 {profile.name}</h1></div>
        <div className="about-intro"><strong>比起一份写满标签的自我介绍，<br />我更想让你从这些碎片里认识我。</strong><p>目前在求职，也在思考接下来要去哪里。喜欢把技术做成真正可用的东西；离开工作台之后，会回到游戏、音乐和幻想乡里。</p></div>
      </section>
      <section className="about-collage shell">
        <article className="profile-card"><span>SUBJECT NO. ⑨</span><div className="profile-nine">⑨</div><h2>{profile.name.toUpperCase()}</h2><p>Developer · Gamer · Daydreamer</p></article>
        <article className="fact-card large"><span>FAVORITE WORLD</span><h3>幻想乡</h3><p>第一次进去之后，<br />就一直没有真正离开。</p></article>
        <article className="fact-card red"><span>FAVORITE FAIRY</span><h3>CIRNO</h3><p>最强的冰精。大概。</p></article>
        <article className="fact-card"><span>CURRENT QUEST</span><h3>{statusItems[0].value}</h3><p>寻找一份值得认真投入的工作，和一群愿意把事情做好的同伴。</p></article>
        <article className="fact-card music"><span>NOW PLAYING</span><h3>{statusItems[2].value}</h3><p>音乐是湖面的另一种天气。</p></article>
      </section>
      <section className="contact-band">
        <div className="shell"><p className="kicker">SEND A SIGNAL</p><h2>有话想说？欢迎来信。</h2><a href={`mailto:${profile.email}`}>{profile.email} ↗</a></div>
      </section>
      <SiteFooter />
    </main>
  );
}
