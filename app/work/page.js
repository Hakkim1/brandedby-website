"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrambleText } from "@/components/Navbar";

import projectsData from "@/data/projects-data.json";

export default function WorkPage() {
  const [activeTab, setActiveTab] = useState("All");

  const filterTabs = ["All", "Brand Identity", "Logo Design", "Social Media"];

  // Map user tabs to project categories
  const filteredProjects = projectsData.filter((project) => {
    if (activeTab === "All") return true;
    if (Array.isArray(project.categories)) {
      return project.categories.includes(activeTab);
    }
    return project.category === activeTab;
  });

  return (
    <div className="blueprint-grid min-h-screen pt-12 pb-24 relative z-10">
      {/* Header section */}
      <section className="border-b border-border py-20 bg-surface/10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <span className="font-body text-xs font-bold text-purple tracking-widest uppercase block mb-4">
            Our Portfolio
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl md:text-6xl tracking-tighter leading-tight max-w-4xl text-left">
            Brands We've Built From the Ground Up.
          </h1>
          <p className="text-secondary text-base font-normal max-w-2xl mt-6">
            Each project here began with a founder who had a vision and needed someone to bring it to life. We were that someone.
          </p>
          <div className="mt-8 p-4 bg-surface/60 border border-border text-xs text-muted leading-relaxed rounded-none inline-block max-w-xl">
            ● CASE STUDY NOTE: The following cases outline design strategy and creative execution blueprints. Full source assets are linked.
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 pt-12">
        <div className="flex flex-wrap gap-3 border-b border-border/40 pb-6">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`font-body text-xs font-semibold py-2 px-5 border rounded-none transition-all duration-300 cursor-pointer ${
                activeTab === tab
                  ? "bg-purple border-purple text-primary"
                  : "bg-surface border-border text-muted hover:border-border-hover hover:text-secondary"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 pt-12">
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20 bg-surface/30 border border-border rounded-none">
            <span className="font-body text-sm text-muted uppercase tracking-widest block">
              No projects found in this category
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Link
                key={project.id}
                href={`/work/${project.slug}`}
                className="group relative bg-surface border border-border rounded-none overflow-hidden flex flex-col justify-between shadow-lg cursor-pointer aspect-square"
              >
                {/* Image Block */}
                <div className="w-full flex-1 min-h-0 overflow-hidden relative">
                  <img
                    src={project.coverImage}
                    alt={project.name}
                    className="w-full h-[108%] object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>

                {/* Text Info */}
                <div className="p-5 h-[155px] flex justify-between items-center bg-surface-2/30 border-t border-border shrink-0">
                  <div className="flex-1 min-w-0 pr-4">
                    <span className="font-body text-[10px] sm:text-xs uppercase tracking-widest text-purple font-bold block mb-1 truncate">
                      {Array.isArray(project.categories) ? project.categories.join(" / ") : project.category}
                    </span>
                    <h4 className="font-heading font-extrabold text-base sm:text-lg text-primary line-clamp-2 leading-tight" title={project.name}>
                      {project.name}
                    </h4>
                    <div className="flex flex-wrap gap-1.5 mt-2 overflow-hidden h-[24px]">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="font-body text-[10px] text-muted border border-border bg-surface-3 px-2 py-0.5 rounded-none whitespace-nowrap"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-none border border-border flex items-center justify-center group-hover:border-purple group-hover:bg-purple/10 transition-colors shrink-0">
                    <ArrowRight className="w-3.5 h-3.5 text-secondary group-hover:text-purple transition-colors" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Bottom CTA */}
      <section className="mt-24 py-20 max-w-[1000px] mx-auto px-6 text-center liquid-glass rounded-none shadow-xl">
        <span className="font-body text-xs font-bold text-purple tracking-widest uppercase block mb-4">
          Project Call
        </span>
        <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-primary leading-tight mb-4">
          Have a project in mind?
        </h2>
        <p className="text-secondary text-base max-w-md mx-auto mb-6">
          Let's talk about what your brand needs. 30 minutes to lay down the map.
        </p>
        <Link href="/contact" className="btn-cyber-purple px-8 py-3.5 inline-flex items-center gap-2">
          <span>Book Your Free Call</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </section>
    </div>
  );
}
