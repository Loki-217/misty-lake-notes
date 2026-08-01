import Link from "next/link";
import type { Project } from "../lib/content";
import { MarkdownArticle } from "./MarkdownArticle";

export function ProjectView({ project, projects }: { project: Project; projects: Project[] }) {
  return (
    <>
      <section className="project-selector shell" aria-label="项目目录">
        <div className="project-selector-intro">
          <p className="kicker">PROJECT DIRECTORY</p>
          <h2>{String(projects.length).padStart(2, "0")} 个项目</h2>
          <p>选择一个项目，下方册页会切换为对应内容。每个项目都有可单独分享的网址。</p>
        </div>
        <div className="project-tabs" role="list">
          {projects.map((item, index) => (
            <Link className={item.slug === project.slug ? "active" : ""} href={`/workbench/${item.slug}`} key={item.slug} role="listitem">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <b>{item.title}</b>
              <small>{item.year || "—"}</small>
              <i aria-hidden="true">{item.slug === project.slug ? "▶" : "◇"}</i>
            </Link>
          ))}
        </div>
      </section>

      <section className="project-feature shell" id="project-detail">
        <div className="project-topline">
          <span>SELECTED PROJECT · {project.year}</span>
          <div>
            {project.demo && <a href={project.demo} target="_blank" rel="noreferrer">LIVE DEMO ↗</a>}
            {project.source && <a href={project.source} target="_blank" rel="noreferrer">VIEW SOURCE ↗</a>}
          </div>
        </div>
        <div className="project-layout">
          <div className="project-copy">
            <p className="project-type">{project.type.toUpperCase()}</p>
            <h2>{project.title}</h2>
            <h3>{project.tagline}</h3>
            <p>{project.summary}</p>
            <div className="tech-list">{project.tech.map((tech) => <span key={tech}>{tech.toUpperCase()}</span>)}</div>
          </div>
          <div className="project-visual" aria-label={`${project.title} project diagram`}>
            <div className="browser-frame"><div className="browser-bar"><i/><i/><i/></div><div className="browser-content"><b>SELECT</b><span/><span/><span/></div></div>
            <div className="flow-arrow">→</div>
            <div className="data-stack"><span>title</span><span>rating</span><span>year</span><b>+37</b></div>
          </div>
        </div>
        {project.metrics.length > 0 && <div className="metric-grid">
          {project.metrics.map((metric) => <article key={`${metric.value}-${metric.label}`}><strong>{metric.value}</strong><span>{metric.unit}</span><p>{metric.label}</p></article>)}
        </div>}
        <MarkdownArticle body={project.body} />
      </section>
    </>
  );
}
