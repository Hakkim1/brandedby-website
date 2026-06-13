"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Layers, LayoutGrid, Image as ImageIcon, Video } from "lucide-react";
import { ScrambleText } from "@/components/Navbar";

export default function HakkimProfilePage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const skills = [
    { name: "Brand Identity Design", level: 95 },
    { name: "Logo Design", level: 90 },
    { name: "Graphic Design", level: 92 },
    { name: "Video Editing & Direction", level: 85 },
    { name: "Photography", level: 80 },
    { name: "Brand Strategy (coming soon)", level: 70 },
  ];

  const works = [
    { id: 1, name: "Minimalist Identity V1", type: "Brand Identity", color: "from-purple/40 to-surface" },
    { id: 2, name: "Vector Monogram logo", type: "Logo Design", color: "from-purple/30 to-surface" },
    { id: 3, name: "Visual Board Grid", type: "Graphic Design", color: "from-surface-2 to-purple/20" },
    { id: 4, name: "Editorial Brand Shoot", type: "Photography", color: "from-surface-3 to-purple/20" },
  ];

  const filteredWorks = works.filter((w) => activeFilter === "All" || w.type === activeFilter);

  return (
    <div className="blueprint-grid min-h-screen pt-12 pb-24 relative z-10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Back navigation */}
        <Link
          href="/team"
          className="inline-flex items-center gap-2 font-body text-xs font-semibold text-purple hover:text-purple-light transition-colors py-4 mb-8 cursor-pointer uppercase tracking-wider"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Team</span>
        </Link>

        {/* Profile Split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-b border-border pb-16">
          {/* Left: Bio Info */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <span className="font-body text-xs font-bold text-purple bg-purple-dim/30 border border-purple/15 px-3 py-1.5 rounded-none w-max">
              Creative Director
            </span>
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-primary leading-tight">
              Hakkim Ibrahim
            </h1>
            <p className="font-body text-sm font-semibold text-muted">
              Founder & Creative Director · Brandedby Studios
            </p>

            <div className="italic font-accent text-lg sm:text-xl text-purple-light leading-relaxed border-l-2 border-purple pl-6 py-2 my-4">
              "I started this because I understand the loneliness of building something with no guidance. I've been the new business that didn't know what branding was. I've run a studio alone until it broke me. I've come back. And now I want to make sure the founders who come to us never have to learn the hard way — because we already did it for them."
            </div>

            <p className="text-secondary text-sm md:text-base leading-relaxed max-w-2xl font-normal">
              Hakkim manages the visual direction, graphic blueprints, and creative pipelines at Brandedby Studios. Having spent years developing design systems for multiple brands in the Indian new business ecosystem, he specializes in crafting identities that carry a true visual strategy rather than simple cosmetic styling.
            </p>
          </div>

          {/* Right: Expertise Metrics */}
          <div className="lg:col-span-4 liquid-glass rounded-none p-8 flex flex-col gap-6 self-start shadow-md">
            <span className="font-body text-xs font-bold text-purple tracking-widest uppercase">
              Skills Profiler
            </span>
            <div className="flex flex-col gap-4">
              {skills.map((s) => (
                <div key={s.name} className="flex flex-col gap-1.5">
                  <div className="flex justify-between font-body text-xs font-semibold">
                    <span className="text-primary">{s.name}</span>
                    <span className="text-purple">{s.level}%</span>
                  </div>
                  <div className="w-full h-1 bg-border/40 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple to-purple-light"
                      style={{ width: `${s.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Portfolio Showcase Grid */}
        <div className="pt-16">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-8">
            <span className="font-body text-xs sm:text-sm font-bold text-purple tracking-widest uppercase block">
              Creative Showcase
            </span>
            <div className="flex flex-wrap gap-2">
              {["All", "Brand Identity", "Logo Design", "Graphic Design", "Photography"].map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`font-body text-xs font-semibold px-4 py-2 border rounded-none transition-all duration-300 cursor-pointer ${
                    activeFilter === f
                      ? "bg-purple border-purple text-primary"
                      : "bg-surface border-border text-muted hover:text-secondary"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {filteredWorks.map((work) => (
              <div
                key={work.id}
                className="group p-6 bg-surface border border-border rounded-none flex flex-col justify-between min-h-64 hover:border-purple/40 transition-colors shadow-lg"
              >
                <div className={`w-full h-32 bg-gradient-to-br ${work.color} rounded-none flex items-center justify-center`}>
                  {work.type === "Brand Identity" && <LayoutGrid className="w-8 h-8 text-primary/30" />}
                  {work.type === "Logo Design" && <Layers className="w-8 h-8 text-primary/30" />}
                  {work.type === "Graphic Design" && <Video className="w-8 h-8 text-primary/30" />}
                  {work.type === "Photography" && <ImageIcon className="w-8 h-8 text-primary/30" />}
                </div>
                <div className="mt-4">
                  <span className="font-body text-xs font-bold text-purple tracking-wider block uppercase">
                    {work.type}
                  </span>
                  <h4 className="font-heading font-bold text-sm text-primary mt-1">
                    {work.name}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 p-8 border border-border bg-surface/30 rounded-none text-center max-w-3xl mx-auto glow-border shadow-xl">
          <span className="font-body text-sm font-bold text-purple tracking-widest uppercase block mb-2">
            Contact Founder
          </span>
          <h3 className="font-heading font-extrabold text-2xl text-primary mb-3">
            Want to work with me directly?
          </h3>
          <p className="text-secondary text-base max-w-md mx-auto mb-6">
            Book a call to go over your branding challenges directly.
          </p>
          <Link href="/contact" className="btn-cyber-purple px-8 py-3.5 inline-flex items-center gap-2">
            <span>Book a Discovery Call</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
