"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ScrambleText } from "@/components/Navbar";

export default function HakkimProfilePage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const skills = [
    "Brand Identity Design",
    "Logo Design",
    "Graphic Design",
    "Video Editing & Direction",
    "Photography",
    "Brand Strategy",
  ];

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
        <div className="border-b border-border pb-16">
          <div className="flex flex-col gap-6 max-w-4xl">
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
              "I started this because I understand the loneliness of building something with no guidance. I've been the new business that didn't know what branding was. I've run a studio alone until it broke me. I've come back. And now I want to make sure the founders who come to us never have to learn the hard way. We already did it for them."
            </div>

            <p className="text-secondary text-sm md:text-base leading-relaxed font-normal">
              Hakkim manages the visual direction, graphic blueprints, and creative pipelines at Brandedby Studios. Having spent years developing design systems for multiple brands in the Indian new business ecosystem, he specializes in crafting identities that carry a true visual strategy rather than simple cosmetic styling.
            </p>
          </div>
        </div>

        {/* Portfolio Showcase Grid */}
        <div className="pt-16">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-8">
            <span className="font-body text-xs sm:text-sm font-bold text-purple tracking-widest uppercase block">
              Skills & Expertise
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {skills.map((skill) => (
              <div
                key={skill}
                className="group p-8 bg-surface border border-border rounded-none flex items-center justify-center min-h-[120px] hover:border-purple/40 transition-colors shadow-lg"
              >
                <h4 className="font-heading font-bold text-base text-primary text-center">
                  {skill}
                </h4>
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
