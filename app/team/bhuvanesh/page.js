"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ScrambleText } from "@/components/Navbar";

export default function BhuvaneshProfilePage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const skills = [
    { name: "Brand Strategy", level: 92 },
    { name: "Social Media Management", level: 90 },
    { name: "Performance Marketing & Paid Ads", level: 95 },
    { name: "Copywriting", level: 88 },
    { name: "Marketing Consulting", level: 85 },
  ];

  const works = [
    { id: 1, name: "SaaS Launch Strategy", type: "Strategy", color: "from-purple/30 to-surface" },
    { id: 2, name: "Paid Acquisition Campaign", type: "Performance Ads", color: "from-purple/40 to-surface" },
    { id: 3, name: "Copywriting Architecture", type: "Copywriting", color: "from-surface-2 to-purple/20" },
    { id: 4, name: "Consulting Operations Guide", type: "Consulting", color: "from-surface-3 to-purple/20" },
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
              Co-Founder & CMO
            </span>
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-primary leading-tight">
              Bhuvanesh
            </h1>
            <p className="font-body text-sm font-semibold text-muted">
              Co-Founder & CMO · Brandedby Studios
            </p>

            <div className="italic font-accent text-lg sm:text-xl text-purple-light leading-relaxed border-l-2 border-purple pl-6 py-2 my-4">
              "Growing up, I was always curious about why some ideas caught people's attention while others were forgotten. That curiosity eventually led me to marketing. Today, what excites me most isn't the campaigns we launch - it's helping businesses find clarity in who they are and confidence in how they show up. Brandedby Studios is the result of countless conversations, late nights, and a shared vision between two brothers who believed they could build something meaningful together."
            </div>

            <p className="text-secondary text-sm md:text-base leading-relaxed max-w-2xl font-normal">
              Bhuvanesh handles marketing execution, performance metrics, consulting, and growth systems at Brandedby Studios. He spent years instructing military units in cyber operations and security before turning his focus to the systems architecture of digital marketing. He structures campaign pipelines that focus on real conversion and ROI.
            </p>
          </div>

          {/* Right: Expertise Metrics */}
          <div className="lg:col-span-4 liquid-glass rounded-none p-8 flex flex-col gap-6 self-start shadow-md">
            <span className="font-body text-xs font-bold text-purple tracking-widest uppercase">
              Marketing Coordinates
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
                      className="h-full bg-gradient-to-r from-purple-light to-purple"
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
              Campaign Blueprints
            </span>
            <div className="flex flex-wrap gap-2">
              {["All", "Strategy", "Performance Ads", "Copywriting", "Consulting"].map((f) => (
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
                <div className={`w-full h-32 bg-gradient-to-br ${work.color} rounded-none`} />
                <div className="mt-4">
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
            Contact CMO
          </span>
          <h3 className="font-heading font-extrabold text-2xl text-primary mb-3">
            Want to grow your brand's reach?
          </h3>
          <p className="text-secondary text-base max-w-md mx-auto mb-6">
            Book a conversation to plan out your acquisition channels.
          </p>
          <Link href="/contact" className="btn-cyber px-8 py-3.5 inline-flex items-center gap-2">
            <span>Let's Talk Growth</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
