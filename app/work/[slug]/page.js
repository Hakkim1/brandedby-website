import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import projectsData from "@/data/projects-data.json";

// Required for next export static generation
export function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export default function ProjectCaseStudyPage({ params }) {
  const { slug } = params;

  // Find current project
  const projectIndex = projectsData.findIndex((p) => p.slug === slug);
  const project = projectsData[projectIndex];

  if (!project) {
    return (
      <div className="blueprint-grid min-h-screen flex items-center justify-center bg-bg relative z-10">
        <div className="text-center p-8 bg-surface border border-border max-w-md shadow-xl">
          <h1 className="font-heading font-extrabold text-2xl text-primary mb-2">Project Not Found</h1>
          <p className="text-secondary text-sm mb-6">The case study you are looking for does not exist or has been moved.</p>
          <Link href="/work" className="btn-cyber-purple px-6 py-2.5 inline-flex items-center gap-2">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Portfolio</span>
          </Link>
        </div>
      </div>
    );
  }

  // Get next project for bottom navigation
  const nextProject = projectsData[(projectIndex + 1) % projectsData.length];

  return (
    <div className="blueprint-grid min-h-screen pt-12 pb-24 relative z-10">
      {/* Top Breadcrumb & Back Navigation */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 pt-8 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-6">
          <Link href="/work" className="inline-flex items-center gap-2 text-xs font-semibold text-muted hover:text-purple transition-colors group">
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Portfolio</span>
          </Link>
          <div className="text-xs text-muted font-mono">
            <span>Portfolio</span>
            <span className="mx-2">/</span>
            <span className="text-secondary">{project.category}</span>
            <span className="mx-2">/</span>
            <span className="text-purple font-semibold">{project.caseStudy.client}</span>
          </div>
        </div>
      </section>

      {/* Case Hero Header */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 pt-8 pb-12">
        <span className="font-body text-xs font-bold text-purple tracking-widest uppercase block mb-3">
          {project.category} Case Study
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl md:text-6xl tracking-tighter leading-tight max-w-4xl text-left text-primary">
          {project.name}
        </h1>
        <p className="text-secondary text-base font-normal max-w-3xl mt-4 leading-relaxed">
          {project.description}
        </p>
      </section>

      {/* Client & Project Scope Board */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 border border-border bg-surface/30">
          <div className="p-6 border-r border-b md:border-b-0 border-border">
            <span className="text-[10px] font-mono tracking-widest text-muted block mb-1 uppercase">Client</span>
            <span className="font-heading font-extrabold text-lg text-primary">{project.caseStudy.client}</span>
          </div>
          <div className="p-6 border-b md:border-r md:border-b-0 border-border">
            <span className="text-[10px] font-mono tracking-widest text-muted block mb-1 uppercase">Year</span>
            <span className="font-heading font-extrabold text-lg text-primary">{project.caseStudy.year}</span>
          </div>
          <div className="p-6 border-r border-border">
            <span className="text-[10px] font-mono tracking-widest text-muted block mb-1 uppercase">Scope & Role</span>
            <span className="font-heading font-extrabold text-sm text-primary block truncate" title={project.caseStudy.services}>
              {project.caseStudy.services}
            </span>
          </div>
          <div className="p-6 flex items-center justify-start md:justify-center">
            <a 
              href={project.behanceUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-cyber-purple px-5 py-2.5 inline-flex items-center gap-2 text-xs"
            >
              <span>View on Behance</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </section>

      {/* Case Study Written Context */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 border-t border-b border-border/40 py-16">
          <div className="lg:col-span-4">
            <h3 className="font-heading font-extrabold text-2xl text-primary tracking-tight mb-4">
              The Client Challenge
            </h3>
            <p className="text-secondary text-sm leading-relaxed font-normal">
              {project.caseStudy.challenge}
            </p>
          </div>
          
          <div className="lg:col-span-5">
            <h3 className="font-heading font-extrabold text-2xl text-primary tracking-tight mb-4">
              Our Strategic Solution
            </h3>
            <p className="text-secondary text-sm leading-relaxed font-normal">
              {project.caseStudy.solution}
            </p>
          </div>

          <div className="lg:col-span-3">
            <h3 className="font-heading font-extrabold text-2xl text-primary tracking-tight mb-4">
              Results & Impact
            </h3>
            <p className="text-secondary text-sm leading-relaxed font-normal">
              {project.caseStudy.results}
            </p>
            <div className="mt-6 pt-6 border-t border-border/40 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="text-[10px] font-mono text-purple bg-purple/5 border border-purple/20 px-2 py-0.5">
                  #{tag.replace(/\s+/g, '')}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case Slides Vertical Presentation */}
      <section className="bg-surface-2/20 border-t border-b border-border py-16">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="text-center mb-10">
            <span className="font-mono text-[10px] text-muted tracking-widest uppercase block mb-1">Visual presentation</span>
            <h3 className="font-heading font-extrabold text-xl text-primary">Design Blueprint Flow</h3>
          </div>
          
          <div className="flex flex-col gap-6 items-center">
            {project.slides.map((slide, sIdx) => (
              <div 
                key={sIdx} 
                className="w-full bg-surface border border-border shadow-md overflow-hidden relative"
              >
                <img 
                  src={slide} 
                  alt={`${project.caseStudy.client} Slide ${sIdx + 1}`}
                  className="w-full h-auto object-contain block"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Next Case Study Navigation Footer */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 pt-20">
        <div className="border border-border p-8 sm:p-12 bg-surface/50 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-mono text-muted uppercase tracking-widest block mb-2">Next Case Study</span>
            <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-primary tracking-tight">
              {nextProject.name}
            </h3>
            <span className="font-body text-xs text-purple font-semibold mt-1 block uppercase tracking-wider">
              {nextProject.category}
            </span>
          </div>
          <Link 
            href={`/work/${nextProject.slug}`} 
            className="btn-cyber-purple px-6 py-3.5 inline-flex items-center gap-2 text-sm group shrink-0"
          >
            <span>Explore Project</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
