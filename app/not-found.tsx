import Link from "next/link";
import { SiteFooter, SiteHeader } from "./components/SiteChrome";

export default function NotFound() {
  return <main><SiteHeader active="home"/><section className="not-found shell"><span>⑨</span><p className="kicker">EXTRA STAGE / LOST SIGNAL</p><h1>这块冰面没有路。</h1><p>页面可能被移动、改名，或者只是暂时藏进了雾里。</p><div className="hero-actions centered"><Link className="button primary" href="/">回到湖畔</Link><Link className="button ghost" href="/notes">查看手记</Link></div></section><SiteFooter/></main>;
}
