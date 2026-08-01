import type { Metadata } from "next";
import { ScreeningGrid } from "../components/ContentFilters";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";
import { getScreenings } from "../lib/content";

export const metadata: Metadata = { title: "⑨号放映室" };

export default function RoomNinePage() {
  const interests = getScreenings();
  return (
    <main className="room-page">
      <SiteHeader active="room" />
      <section className="page-hero shell dark-hero">
        <p className="eyebrow"><span /> SCREENING ROOM NO. ⑨</p>
        <h1>⑨号放映室</h1>
        <p>游戏、动画、音乐，以及一些没有实用价值、<br />但我愿意认真对待的东西。</p>
        <span className="page-number">02 / INTERESTS</span>
      </section>
      <ScreeningGrid entries={interests} />
      <section className="quote-strip"><p>“Whatever happens, happens.”</p><span>— SPIKE SPIEGEL</span></section>
      <SiteFooter />
    </main>
  );
}
