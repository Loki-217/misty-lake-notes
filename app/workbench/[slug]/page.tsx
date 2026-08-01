import type { Metadata } from "next";
import Link from "next/link";
import { ProjectView } from "../../components/ProjectView";
import { SiteFooter, SiteHeader } from "../../components/SiteChrome";
import { getProject, getProjects } from "../../lib/content";

export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return { title: project ? `${project.title}｜工作台` : "未找到项目" };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const projects = getProjects();
  const project = getProject(slug);
  if (!project) return <main><SiteHeader active="workbench"/><section className="empty-journal shell"><h1>项目没有找到</h1><Link className="button primary" href="/workbench">返回工作台</Link></section><SiteFooter/></main>;
  return (
    <main>
      <SiteHeader active="workbench" />
      <section className="page-hero compact-page-hero shell">
        <p className="eyebrow"><span /> REAL-WORLD WORKBENCH</p>
        <h1>工作台</h1>
        <p>项目目录与开发记录。</p>
        <span className="page-number">03 / PROJECTS</span>
      </section>
      <ProjectView project={project} projects={projects} />
      <SiteFooter />
    </main>
  );
}
