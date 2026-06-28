"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrambleText } from "@/components/Navbar";

export default function TeamPage() {
  const team = [
    {
      name: "Hakkim Ibrahim",
      role: "Founder & Creative Director",
      slug: "hakkim",
      quote: "Every brand we touch should have a soul, not just a logo.",
      skills: ["Branding", "Graphic Design", "Video Editing", "Photography"],
      gradient: "linear-gradient(135deg, #7d68f8 0%, #14141E 100%)",
    },
    {
      name: "Bhuvanesh",
      role: "Co-Founder & CMO",
      slug: "bhuvanesh",
      quote: "Growth isn't accidental. We make it intentional.",
      skills: ["Full Stack Marketing", "Brand Consulting", "Ad Campaigns", "Copywriting"],
      gradient: "linear-gradient(135deg, #9f91fa 0%, #14141E 100%)",
    },
  ];

  return (
    <div className="blueprint-grid min-h-screen pt-12 pb-8 relative z-10">
      {/* Hero Header */}
      <section className="border-b border-border py-10 bg-surface/10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <span className="font-body text-sm font-bold text-purple tracking-widest uppercase block mb-4">
            Meet the Team
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl md:text-6xl tracking-tighter leading-tight max-w-4xl text-left">
            Two People. One Mission.
          </h1>
          <p className="text-secondary text-base font-normal max-w-2xl mt-6">
            We're not a large agency with departments you'll never meet. When you work with Brandedby Studios, you work with us — directly.
          </p>
        </div>
      </section>

      {/* Team Cards Grid */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {team.map((member) => (
            <div
              key={member.slug}
              className="bg-surface border border-border rounded-none flex flex-col p-6 justify-between relative overflow-hidden shadow-xl"
            >
              <div>
                {/* Photo placeholder */}
                <div
                  className="w-full h-52 rounded-none mb-4 overflow-hidden relative"
                  style={{ background: member.gradient }}
                >
                  <div className="absolute top-4 left-4 font-body text-xs font-semibold text-muted tracking-wide uppercase bg-bg/85 border border-border px-3.5 py-1.5 rounded-none shadow-md">
                    Founder Profile Avatar
                  </div>
                </div>

                <h3 className="font-heading font-extrabold text-2xl text-primary mb-1">
                  {member.name}
                </h3>
                <span className="font-body text-sm font-semibold text-purple block mb-4">
                  {member.role}
                </span>

                <p className="italic font-accent text-sm text-secondary leading-relaxed border-l-2 border-purple/40 pl-4 mb-3">
                  "{member.quote}"
                </p>

                <div className="flex flex-col gap-2 mb-4">
                  <span className="font-body text-sm font-bold text-muted uppercase tracking-wider mb-1">
                    Expertise
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill) => (
                      <span
                        key={skill}
                        className="font-body text-xs text-secondary bg-surface-2 border border-border px-3 py-1.5 rounded-none"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <Link
                href={`/team/${member.slug}`}
                className="btn-cyber-purple text-center flex items-center justify-center gap-2 group cursor-pointer w-full py-3.5 font-semibold"
              >
                <span>View Profile</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom redirection */}
      <section className="max-w-[1000px] mx-auto px-6 text-center mt-24">
        <p className="text-secondary text-base font-normal mb-6">
          We're always open to honest conversations. If you'd like to know more about how we work — just reach out.
        </p>
        <Link href="/contact" className="btn-cyber flex items-center gap-2 mx-auto w-max py-3 px-6">
          <span>Contact Us</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </section>
    </div>
  );
}
