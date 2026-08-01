import type { Metadata } from "next";
import { ProjectView } from "../components/ProjectView";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";
import { getProjects } from "../lib/content";

export const metadata: Metadata = { title: "工作台" };

export default function WorkbenchPage() {
  const projects = getProjects();
  const project = projects[0];
  return (
    <main>
      <SiteHeader active="workbench" />
      <section className="page-hero shell">
        <p className="eyebrow"><span /> REAL-WORLD WORKBENCH</p>
        <h1>工作台</h1>
        <p>把模糊的问题拆开，把能运行的东西重新拼起来。<br />这里放项目，也放解决问题的过程。</p>
        <span className="page-number">03 / PROJECTS</span>
      </section>

      {project && <ProjectView project={project} projects={projects} />}
      <SiteFooter />
    </main>
  );
}
