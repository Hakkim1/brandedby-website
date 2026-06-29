"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight, ChevronDown, Award, Lightbulb, Zap, Send } from "lucide-react";
import { ScrambleText } from "@/components/Navbar";
import projectsData from "@/data/projects-data.json";

// Dynamically import Three.js canvas to prevent server-side hydration mismatches
const HeroCanvas = dynamic(() => import("@/components/HeroCanvas"), { ssr: false });

export default function HomePage() {
  const [activeAccordion, setActiveAccordion] = useState(0);
  const [emailInput, setEmailInput] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [emailError, setEmailError] = useState("");

  const services = [
    {
      id: "01",
      name: "Brand Identity Design ★",
      desc: "Your brand's complete visual language. Logo, colors, typography, and the system that holds them all together. Built to last, designed to grow.",
      signature: true,
    },
    {
      id: "02",
      name: "Logo Design",
      desc: "A custom mark crafted to capture your essence and communicate your vision instantly. Unforgettable, functional, vector-perfect.",
      signature: false,
    },
    {
      id: "03",
      name: "Visual Guidelines",
      desc: "The rulebook that protects your brand. Color systems, spacing rules, and usage guides so anyone can build for your brand consistently.",
      signature: false,
    },
    {
      id: "04",
      name: "Social Media Kits",
      desc: "Ready-to-use templates and grids to ensure your visual voice stays premium, polished, and active across all platforms.",
      signature: false,
    },
    {
      id: "05",
      name: "Creative Direction",
      desc: "Strategic guidance on how to tell your brand story visually, setting the compass for all your visual outputs.",
      signature: false,
    },
    {
      id: "06",
      name: "Packaging Systems",
      desc: "Visual layouts and structural designs that turn simple packages into tactile brand experiences.",
      signature: false,
    },
    {
      id: "07",
      name: "Collateral Design",
      desc: "Banners, business cards, pitch decks, and all the print or digital touchpoints you need to conduct professional business.",
      signature: false,
    },
    {
      id: "08",
      name: "Website Design",
      desc: "A digital home for your brand that's as strong as the identity behind it.",
      signature: false,
    },
  ];

  const featuredWork = projectsData.slice(0, 3);

  const handleResourceSubmit = (e) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes("@")) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setEmailError("");
    setSubmitted(true);
  };

  return (
    <div className="blueprint-grid min-h-screen relative z-10">
      {/* 1. HERO SECTION */}
      <section className="relative h-[calc(100vh-76px)] min-h-[680px] sm:min-h-[750px] lg:min-h-[750px] flex flex-col justify-between pt-4 border-b border-border overflow-hidden">
        {/* Soft Premium Light-Theme Gradient Glows behind the Grid lines */}
        <div 
          className="absolute top-[15%] left-[15%] w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] blur-[140px] rounded-full pointer-events-none z-0" 
          style={{ backgroundColor: "rgba(125, 104, 248, 0.15)" }}
        />
        <div 
          className="absolute bottom-[20%] right-[10%] w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] blur-[130px] rounded-full pointer-events-none z-0" 
          style={{ backgroundColor: "rgba(159, 145, 250, 0.18)" }}
        />

        {/* Blueprint Repeating Dot Matrix Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.25] pointer-events-none z-0" 
          style={{
            backgroundImage: "radial-gradient(rgba(125, 104, 248, 0.12) 1px, transparent 1px)",
            backgroundSize: "24px 24px"
          }}
        />

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative z-10 pt-6 lg:pt-10 pb-4 flex-1 flex items-center">
          <div className="lg:col-span-7 flex flex-col gap-6 items-start justify-center">
            {/* Status Indicator */}
            <div className="flex items-center gap-2.5 px-3 py-1.5 bg-surface/85 backdrop-blur-md border border-border rounded-none font-mono text-[10px] sm:text-xs font-bold text-purple tracking-wider uppercase select-none shadow-[0_2px_10px_rgba(125, 104, 248, 0.03)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-none bg-purple opacity-75"></span>
                <span className="relative inline-flex rounded-none h-2 w-2 bg-purple"></span>
              </span>
              <span>Branding Incubator for Next-Gen New Businesses</span>
            </div>

            <h1 className="font-heading font-extrabold text-4xl sm:text-6xl md:text-7xl tracking-tighter leading-none text-left">
              <span className="block whitespace-nowrap">We Don't Just</span>
              <span className="block text-gradient-purple">Design Logos.</span>
              <span className="block">We Build</span>
              <span className="inline-block bg-purple text-white px-4 sm:px-6 py-1 sm:py-2 mt-2 sm:mt-3 rounded-none">
                Brands.
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-secondary text-base md:text-lg max-w-xl font-normal leading-relaxed">
              For new businesses who are ready to invest in something real. We've been where you are, and we know exactly what your brand needs.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-2 w-full sm:w-auto">
              <Link href="/contact" className="btn-cyber-purple text-center px-8 py-3.5">
                <span>Book a Free Call</span>
              </Link>
              <Link
                href="/work"
                className="btn-cyber text-center px-8 py-3.5 text-secondary border border-border hover:text-white"
              >
                <span>See Our Work</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Premium Studio Interactive Visualizer */}
          <div className="lg:col-span-5 relative w-full h-[340px] sm:h-[380px] lg:h-[500px] flex items-center justify-center overflow-visible select-none lg:pl-6">
            
            {/* Tech Blueprint Rings & Guides */}
            <div 
              className="absolute w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] lg:w-[320px] lg:h-[320px] rounded-full border border-dashed animate-[spin_60s_linear_infinite] pointer-events-none z-0" 
              style={{ borderColor: "rgba(125, 104, 248, 0.08)" }}
            />
            <div 
              className="absolute w-[180px] h-[180px] sm:w-[200px] sm:h-[200px] lg:w-[240px] lg:h-[240px] rounded-full border pointer-events-none z-0" 
              style={{ borderColor: "rgba(125, 104, 248, 0.04)" }}
            />
            <div 
              className="absolute w-[300px] h-[300px] sm:w-[340px] sm:h-[340px] lg:w-[380px] lg:h-[380px] rounded-full border border-dotted animate-[spin_120s_linear_infinite] pointer-events-none z-0" 
              style={{ borderColor: "rgba(125, 104, 248, 0.05)" }}
            />
            
            <HeroCanvas />
          </div>
        </div>

        {/* Crossing Marquee Strip inside Hero Section */}
        <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-transparent z-20 flex items-center justify-center mt-auto pb-4">
          {/* Row 1: Left to Right (-3.5deg tilt) */}
          <div className="absolute w-[115vw] left-[-7.5vw] bg-purple py-3 md:py-4 -rotate-[3.5deg] z-10 shadow-[0_10px_30px_rgba(125, 104, 248, 0.25)] border-y border-white/10">
            <div className="custom-marquee-container">
              <div className="custom-marquee-content animate-marquee flex gap-8 font-heading text-xl sm:text-2xl md:text-3xl font-black tracking-tighter uppercase text-white">
                {[...Array(4)].map((_, i) => (
                  <span key={i} className="flex gap-8 shrink-0 items-center">
                    <span>Brand Identity</span>
                    <span className="text-white/40">★</span>
                    <span>Logo Design</span>
                    <span className="text-white/40">★</span>
                    <span>Visual Strategy</span>
                    <span className="text-white/40">★</span>
                    <span>Social Media Branding</span>
                    <span className="text-white/40">★</span>
                    <span>New Business Packages</span>
                    <span className="text-white/40">★</span>
                    <span>Performance Marketing</span>
                    <span className="text-white/40">★</span>
                    <span>Print Design</span>
                    <span className="text-white/40">★</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Row 2: Right to Left (3.5deg tilt) */}
          <div className="absolute w-[115vw] left-[-7.5vw] bg-purple py-3 md:py-4 rotate-[3.5deg] z-20 shadow-[0_10px_35px_rgba(125, 104, 248, 0.35)] border-y border-white/10">
            <div className="custom-marquee-container">
              <div className="custom-marquee-content animate-marquee-reverse flex gap-8 font-heading text-xl sm:text-2xl md:text-3xl font-black tracking-tighter uppercase text-white">
                {[...Array(4)].map((_, i) => (
                  <span key={i} className="flex gap-8 shrink-0 items-center">
                    <span>Branding That Works</span>
                    <span className="text-white/40">★</span>
                    <span>Design With Purpose</span>
                    <span className="text-white/40">★</span>
                    <span>Built For Growth</span>
                    <span className="text-white/40">★</span>
                    <span>Strategy First</span>
                    <span className="text-white/40">★</span>
                    <span>Identity Systems</span>
                    <span className="text-white/40">★</span>
                    <span>Brand Discovery</span>
                    <span className="text-white/40">★</span>
                    <span>Creative Direction</span>
                    <span className="text-white/40">★</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MISSION STATEMENT */}
      <section className="py-24 bg-bg relative z-10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4 font-body text-xs sm:text-sm font-bold text-purple tracking-widest uppercase">
            Why We Exist
          </div>
          <div className="lg:col-span-8 flex flex-col gap-6">
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl tracking-tight leading-tight">
              Most new businesses launch without a brand. We've been there. That's why we exist.
            </h2>
            <p className="text-secondary text-sm md:text-base leading-relaxed font-normal max-w-2xl mt-4">
              We started with nothing. No guide, no mentor, no one to tell us what branding really meant. We built anyway. Failed. Rebuilt. And came back with something better: the knowledge to do it right for the founders who come after us.
            </p>
          </div>
        </div>
      </section>

      {/* 4. SERVICES ACCORDION */}
      <section className="py-24 bg-surface/10 relative z-10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-4 font-body text-xs sm:text-sm font-bold text-purple tracking-widest uppercase">
            What We Do
          </div>
          <div className="lg:col-span-8">
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl tracking-tight leading-none mb-4">
              Everything Your Brand Needs. Under One Roof.
            </h2>
            <p className="text-muted text-sm max-w-xl font-normal">
              From strategy to launch, we handle the creative and the growth.
            </p>
          </div>
        </div>

        {/* Accordion List */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col">
          {services.map((service, index) => {
            const isOpen = activeAccordion === index;
            return (
              <div
                key={service.id}
                onClick={() => setActiveAccordion(index)}
                className={`border-t last:border-b border-border/80 transition-all duration-300 cursor-pointer ${
                  isOpen ? "bg-surface/30 p-8" : "hover:bg-surface/10 p-6"
                }`}
              >
                <div className="flex justify-between items-center gap-4">
                  <div className="flex items-center gap-6">
                    <span className="font-mono text-xs text-muted">{service.id}</span>
                    <h3
                      className={`font-heading font-bold text-lg md:text-xl transition-colors ${
                        service.signature
                          ? "text-purple"
                          : isOpen
                          ? "text-primary"
                          : "text-secondary"
                      }`}
                    >
                      {service.name}
                    </h3>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-muted transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-purple" : ""
                    }`}
                  />
                </div>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-secondary text-xs md:text-sm max-w-2xl leading-relaxed pl-10 font-normal">
                      {service.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. FEATURED WORK */}
      <section className="py-24 bg-bg relative z-10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-4 font-body text-xs sm:text-sm font-bold text-purple tracking-widest uppercase">
            Our Work
          </div>
          <div className="lg:col-span-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
            <div>
              <h2 className="font-heading font-extrabold text-3xl sm:text-5xl tracking-tight leading-none mb-4">
                Brands We've Built.
              </h2>
              <p className="text-muted text-sm font-normal max-w-md">
                A selection of our work. Each one a business we believed in.
              </p>
            </div>
            <Link
              href="/work"
              className="btn-cyber font-semibold flex items-center gap-2 group shrink-0"
            >
              <span>See All Projects</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Featured Projects Grid */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredWork.map((project) => (
            <Link
              key={project.id}
              href={`/work/${project.slug}`}
              className="group relative bg-surface border border-border rounded-none glow-border overflow-hidden flex flex-col justify-between shadow-lg cursor-pointer animate-fade-in aspect-square"
            >
              {/* Image Block */}
              <div className="w-full aspect-[16/9] overflow-hidden relative shrink-0">
                <img
                  src={project.coverImage}
                  alt={project.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>

              {/* Text Info */}
              <div className="p-5 flex-1 flex justify-between items-center bg-surface-2/30 min-h-0">
                <div className="flex-1 min-w-0 pr-4">
                  <span className="font-body text-[10px] sm:text-xs font-bold uppercase tracking-wider text-purple block mb-1 truncate">
                    {project.category}
                  </span>
                  <h4 className="font-heading font-extrabold text-base sm:text-lg text-primary line-clamp-2 leading-tight">
                    {project.name}
                  </h4>
                  <div className="flex flex-wrap gap-1.5 mt-2 overflow-hidden h-[24px]">
                    {project.tags && project.tags.slice(0, 3).map((tag) => (
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
      </section>

      {/* 6. WHY BRANDEDBY STUDIOS */}
      <section className="py-24 bg-surface/10 relative z-10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-4 font-body text-xs sm:text-sm font-bold text-purple tracking-widest uppercase">
            Why Us
          </div>
          <div className="lg:col-span-8">
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl tracking-tight leading-none mb-4">
              We've Sat Where You're Sitting.
            </h2>
            <p className="text-muted text-sm font-normal">
              And that changes everything about how we work with you.
            </p>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-surface border border-border rounded-none flex flex-col gap-6 shadow-md">
            <div className="w-10 h-10 rounded-none bg-purple-dim flex items-center justify-center border border-purple/20 text-purple">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="font-heading font-bold text-lg text-primary">
              01. Built From Experience, Not Theory
            </h4>
            <p className="text-secondary text-sm sm:text-base leading-relaxed font-normal">
              We've launched without a brand. We've felt what it costs. Everything we do for you is informed by what we wish someone had done for us.
            </p>
          </div>

          <div className="p-8 bg-surface border border-border rounded-none flex flex-col gap-6 shadow-md">
            <div className="w-10 h-10 rounded-none bg-purple-dim flex items-center justify-center border border-purple/20 text-purple">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className="font-heading font-bold text-lg text-primary">
              02. We Work Until It's Right
            </h4>
            <p className="text-secondary text-sm sm:text-base leading-relaxed font-normal">
              No revision limits. No clock watching. We stop when you're genuinely proud of your brand, not when a counter hits zero.
            </p>
          </div>

          <div className="p-8 bg-surface border border-border rounded-none flex flex-col gap-6 shadow-md">
            <div className="w-10 h-10 rounded-none bg-purple-dim flex items-center justify-center border border-purple/20 text-purple">
              <Lightbulb className="w-5 h-5" />
            </div>
            <h4 className="font-heading font-bold text-lg text-primary">
              03. You Leave Understanding Your Brand
            </h4>
            <p className="text-secondary text-sm sm:text-base leading-relaxed font-normal">
              When we finish, you don't just own a logo. You understand it: why it looks the way it does, what it communicates, and how to use it with confidence.
            </p>
          </div>
        </div>
      </section>

      {/* 7. INSIGHTS HUB PREVIEW */}
      <section className="py-24 bg-bg relative z-10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-4 font-body text-xs sm:text-sm font-bold text-purple tracking-widest uppercase">
            Learn Branding
          </div>
          <div className="lg:col-span-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
            <div>
              <h2 className="font-heading font-extrabold text-3xl sm:text-5xl tracking-tight leading-none mb-4">
                Your Brand Is Always Talking. Even When You're Not.
              </h2>
              <p className="text-muted text-sm font-normal max-w-md">
                Every day we share one insight about branding. For new business founders who want to understand the game before they play it.
              </p>
            </div>
            <Link
              href="/insights"
              className="btn-cyber font-semibold flex items-center gap-2 group shrink-0"
            >
              <span>Read All Insights</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* 3 Bento Cards for latest insights */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-surface border border-border rounded-none glow-border flex flex-col justify-between min-h-64 shadow-md">
            <div>
              <span className="font-body text-xs font-bold text-purple uppercase tracking-wider">
                Insight 01
              </span>
              <h4 className="font-heading font-bold text-lg text-primary mt-3 mb-2">
                Why your logo isn't your brand
              </h4>
            </div>
            <Link
              href="/insights/why-your-brand-is-invisible"
              className="font-body text-sm font-semibold text-purple flex items-center gap-2 mt-4 hover:underline"
            >
              <span>Read Insight →</span>
            </Link>
          </div>

          <div className="p-8 bg-surface border border-border rounded-none glow-border flex flex-col justify-between min-h-64 shadow-md">
            <div>
              <span className="font-body text-xs font-bold text-purple uppercase tracking-wider">
                Insight 02
              </span>
              <h4 className="font-heading font-bold text-lg text-primary mt-3 mb-2">
                The color mistake most new businesses make
              </h4>
            </div>
            <Link
              href="/insights/psychology-of-color-in-new business-brands"
              className="font-body text-sm font-semibold text-purple flex items-center gap-2 mt-4 hover:underline"
            >
              <span>Read Insight →</span>
            </Link>
          </div>

          <div className="p-8 bg-surface border border-border rounded-none glow-border flex flex-col justify-between min-h-64 shadow-md">
            <div>
              <span className="font-body text-xs font-bold text-purple uppercase tracking-wider">
                Insight 03
              </span>
              <h4 className="font-heading font-bold text-lg text-primary mt-3 mb-2">
                What brand consistency actually means
              </h4>
            </div>
            <Link
              href="/insights/positioning-vs-branding"
              className="font-body text-sm font-semibold text-purple flex items-center gap-2 mt-4 hover:underline"
            >
              <span>Read Insight →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 8. FREE RESOURCE capture banner */}
      <section className="py-24 bg-surface/10 relative z-10">
        <div className="max-w-[1000px] mx-auto px-6 text-center flex flex-col items-center gap-6">
          <span className="font-body text-xs sm:text-sm font-bold text-purple tracking-widest uppercase">Free Resource</span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl tracking-tight leading-tight">
            Don't Know Where to Start With Your Brand?
          </h2>
          <p className="text-secondary text-sm md:text-base leading-relaxed max-w-xl font-normal">
            We made a free guide for new business founders. Everything we wish someone had handed us at the beginning. No fluff. Just clarity.
          </p>

          <form onSubmit={handleResourceSubmit} className="mt-4 w-full max-w-md flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="email"
                placeholder="your@email.com"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                disabled={submitted}
                className="w-full bg-surface border border-border focus:border-purple/60 focus:outline-none p-3 text-sm text-primary placeholder-muted font-body rounded-none"
              />
              {emailError && <div className="absolute top-full left-0 mt-1 text-xs text-purple">{emailError}</div>}
            </div>
            <button
              type="submit"
              disabled={submitted}
              className="btn-cyber-purple flex items-center justify-center gap-2 py-3 px-6 shrink-0 cursor-pointer"
            >
              {submitted ? (
                <span>Sent Successfully!</span>
              ) : (
                <>
                  <span>Get the Guide</span>
                  <Send className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
          {submitted ? (
            <p className="text-xs sm:text-sm text-purple font-body font-medium mt-2">
              Check your inbox! We've sent the guide.
            </p>
          ) : (
            <p className="text-xs text-muted font-body mt-2">
              No spam. Just one guide. Unsubscribe anytime.
            </p>
          )}
        </div>
      </section>

      {/* 9. BOOK A DISCOVERY CALL */}
      <section className="py-24 relative z-10 bg-bg">
        <div className="max-w-[1000px] mx-auto px-6 text-center flex flex-col items-center gap-6">
          <span className="font-body text-xs sm:text-sm font-bold text-purple tracking-widest uppercase">Let's Talk</span>
          <h2 className="font-heading font-extrabold text-4xl sm:text-6xl tracking-tight leading-tight">
            Let's Talk About <br />
            <span className="text-gradient-purple">Your Brand.</span>
          </h2>
          <p className="text-secondary text-sm md:text-base leading-relaxed max-w-xl font-normal">
            No pitch. No pressure. Just a real 30-minute conversation about your business and how we can help.
          </p>
          <div className="font-body text-xs sm:text-sm text-muted uppercase tracking-wider border-y border-border py-4 px-6 flex flex-wrap justify-center gap-6 mt-4">
            <span>● Free</span>
            <span>● 30 Minutes</span>
            <span>● Available Evenings After 6:30 PM IST</span>
          </div>
          <Link href="/contact" className="btn-cyber-purple px-8 py-4 text-base font-semibold mt-6">
            <ScrambleText text="Book Your Free Call" />
          </Link>
          <p className="text-xs text-muted font-body mt-2">
            We respond to messages during the day. Calls available after 6:30 PM IST.
          </p>
        </div>
      </section>
    </div>
  );
}
