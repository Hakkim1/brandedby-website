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
                className="group relative bg-surface border border-border rounded-none overflow-hidden flex flex-col justify-between shadow-lg cursor-pointer"
              >
                {/* Image Block */}
                <div className="w-full h-64 md:h-80 overflow-hidden relative">
                  <img
                    src={project.coverImage}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-bg/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="font-body text-xs font-semibold uppercase tracking-wider text-primary bg-bg/85 border border-border px-5 py-2.5 rounded-none">
                      View Case Study
                    </span>
                  </div>
                </div>

                {/* Text Info */}
                <div className="p-6 border-t border-border flex justify-between items-center bg-surface-2/30">
                  <div>
                    <span className="font-body text-xs uppercase tracking-widest text-purple font-bold block mb-1">
                      {project.category}
                    </span>
                    <h4 className="font-heading font-extrabold text-lg text-primary">
                      {project.name}
                    </h4>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-body text-xs text-muted border border-border bg-surface-3 px-2 py-0.5 rounded-none"
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
