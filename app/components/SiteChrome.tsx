"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { bgmTracks } from "../../config/media";
import { profile } from "../../config/profile";
import { getSearchEntries } from "../lib/content";

type Section = "home" | "notes" | "room" | "workbench" | "about";

const links: { href: string; label: string; key: Section }[] = [
  { href: "/", label: "01 湖畔", key: "home" },
  { href: "/notes", label: "02 手记", key: "notes" },
  { href: "/room-nine", label: "⑨ 放映室", key: "room" },
  { href: "/workbench", label: "03 工作台", key: "workbench" },
  { href: "/about", label: "04 关于", key: "about" },
];

export function SiteHeader({ active }: { active: Section }) {
  const [theme, setTheme] = useState<"light" | "night">(() => {
    if (typeof window === "undefined") return "light";
    return window.localStorage.getItem("mln-theme") === "night" ? "night" : "light";
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [bgmOpen, setBgmOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [trackIndex, setTrackIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(() => {
    if (typeof window === "undefined") return 0.45;
    const saved = Number(window.localStorage.getItem("mln-bgm-volume"));
    return Number.isFinite(saved) && saved >= 0 && saved <= 1 ? saved : 0.45;
  });
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playingRef = useRef(false);
  const searchEntries = useMemo(() => getSearchEntries(), []);
  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return searchEntries;
    return searchEntries.filter((entry) => `${entry.title} ${entry.summary} ${entry.type} ${entry.keywords}`.toLowerCase().includes(needle));
  }, [query, searchEntries]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("mln-theme", theme);
  }, [theme]);

  useEffect(() => {
    const track = bgmTracks[trackIndex];
    if (!track) return;
    const audio = new Audio(track.src);
    const savedVolume = Number(window.localStorage.getItem("mln-bgm-volume"));
    audio.volume = Number.isFinite(savedVolume) ? savedVolume : 0.45;
    audio.addEventListener("ended", () => { playingRef.current = true; setTrackIndex((value) => (value + 1) % bgmTracks.length); });
    audioRef.current = audio;
    if (playingRef.current) audio.play().catch(() => { playingRef.current = false; setPlaying(false); });
    return () => { audio.pause(); audioRef.current = null; };
  }, [trackIndex]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
    window.localStorage.setItem("mln-bgm-volume", String(volume));
  }, [volume]);

  useEffect(() => {
    function close(event: KeyboardEvent) {
      if (event.key === "Escape") { setSearchOpen(false); setBgmOpen(false); }
    }
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  async function togglePlayback() {
    const audio = audioRef.current;
    if (!audio || !bgmTracks.length) return;
    if (playing) { audio.pause(); playingRef.current = false; setPlaying(false); }
    else { await audio.play().catch(() => undefined); playingRef.current = true; setPlaying(true); }
  }

  return (
    <>
      <header className="site-header shell">
        <Link className="wordmark" href="/" aria-label="Misty Lake Notes home">
          <span className="mark-nine">⑨</span>
          <span>MISTY LAKE<br /><small>PERSONAL DOUJIN WEB</small></span>
        </Link>
        <nav className={menuOpen ? "open" : ""} aria-label="主导航">
          {links.map((link) => <Link onClick={() => setMenuOpen(false)} className={active === link.key ? "active" : ""} href={link.href} key={link.key}>{link.label}</Link>)}
        </nav>
        <div className="header-tools" aria-label="网站工具">
          <button className={searchOpen ? "active" : ""} type="button" onClick={() => { setSearchOpen(!searchOpen); setBgmOpen(false); }} aria-label="打开站内搜索" aria-expanded={searchOpen}>SEARCH</button>
          <button className={bgmOpen ? "active" : ""} type="button" onClick={() => { setBgmOpen(!bgmOpen); setSearchOpen(false); }} aria-label="打开背景音乐播放器" aria-expanded={bgmOpen}>BGM{playing ? " ♪" : ""}</button>
          <button type="button" onClick={() => setTheme(theme === "light" ? "night" : "light")} aria-label="切换昼夜主题">◐</button>
          <button className="menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label="展开导航">{menuOpen ? "×" : "≡"}</button>
        </div>
      </header>
      {searchOpen && <div className="tool-popover search-popover" role="dialog" aria-label="站内搜索">
        <div className="tool-heading"><span>SEARCH / ALL ARCHIVES</span><button onClick={() => setSearchOpen(false)} aria-label="关闭搜索">×</button></div>
        <label><span className="sr-only">输入搜索词</span><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索手记、项目、游戏……" /></label>
        <div className="search-results">{results.length ? results.slice(0, 12).map((entry) => <Link onClick={() => setSearchOpen(false)} href={entry.href} key={`${entry.type}-${entry.href}`}><small>{entry.type}</small><b>{entry.title}</b><span>{entry.summary}</span><i>↗</i></Link>) : <p>冰面上没有找到相关记录。</p>}</div>
      </div>}
      {bgmOpen && <div className="tool-popover bgm-popover" role="dialog" aria-label="背景音乐播放器">
        <div className="tool-heading"><span>BGM PLAYER / DEFAULT OFF</span><button onClick={() => setBgmOpen(false)} aria-label="关闭播放器">×</button></div>
        {bgmTracks.length ? <>
          <div className="track-info"><small>NOW PLAYING</small><b>{bgmTracks[trackIndex]?.title}</b><span>{bgmTracks[trackIndex]?.artist}</span></div>
          <div className="player-controls"><button onClick={() => setTrackIndex((trackIndex - 1 + bgmTracks.length) % bgmTracks.length)} aria-label="上一首">◀</button><button onClick={togglePlayback}>{playing ? "PAUSE" : "PLAY"}</button><button onClick={() => setTrackIndex((trackIndex + 1) % bgmTracks.length)} aria-label="下一首">▶</button></div>
          <label className="volume-control">VOL <input type="range" min="0" max="1" step="0.05" value={volume} onChange={(event) => setVolume(Number(event.target.value))}/></label>
        </> : <div className="empty-player"><b>NO DISC INSERTED</b><p>播放器功能已经完成。把有公开播放权的音频放入 <code>public/audio</code>，再在音乐配置中登记即可。</p></div>}
      </div>}
    </>
  );
}

export function SiteFooter() {
  return (
    <footer>
      <div className="shell footer-inner">
        <div><span className="mark-nine">⑨</span><b>MISTY LAKE NOTES<br/><small>PERSONAL DOUJIN WEB</small></b></div>
        <p>今日は湖も完全には凍っていない。<br/>今天的冰湖也没有完全冻结。</p>
        <div className="footer-links">
          <a href={`mailto:${profile.email}`}>EMAIL ↗</a>
          <a href={profile.github} target="_blank" rel="noreferrer">GITHUB ↗</a>
          {profile.resume && <a href={profile.resume} download>RESUME ↓</a>}
        </div>
      </div>
    </footer>
  );
}

export function NineSecret() {
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);

  function tap() {
    const next = count + 1;
    if (next >= 9) {
      setOpen(true);
      setCount(0);
    } else setCount(next);
  }

  return (
    <>
      <button className="hero-nine" onClick={tap} aria-label={`神秘的数字九，已点击 ${count} 次`}><span>⑨</span><small>CLICK × 9</small></button>
      {count > 0 && <span className="nine-count" aria-live="polite">{count} / ⑨</span>}
      {open && (
        <div className="secret-modal" role="dialog" aria-modal="true" aria-label="⑨号秘密">
          <button type="button" onClick={() => setOpen(false)} aria-label="关闭">×</button>
          <span>❄</span>
          <p>「笨蛋才不是缺点，<br />是保持好奇的超能力。」</p>
          <small>SECRET ⑨ UNLOCKED</small>
        </div>
      )}
    </>
  );
}
