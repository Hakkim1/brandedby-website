"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";
import { ScrambleText } from "@/components/Navbar";

const StoryCanvas = dynamic(() => import("@/components/StoryCanvas"), { ssr: false });

export default function StoryPage() {
  const [activeChapter, setActiveChapter] = useState(0);

  const chapters = [
    {
      id: "01",
      title: "Two Different Worlds, One Shared Hunger",
      tagline: "Searching without a map",
      metaphor: "Two Separate Worlds",
      text: [
        "We came from different places. Different years in college. Different backgrounds.",
        "But we had the same hunger — the kind that doesn't sit still, that keeps asking 'what else?' and 'what if?' when everyone else is satisfied with the answer they've been given.",
        "Neither of us had a map. Neither of us had someone to tell us where we were going.",
        "We were both, in our own words, searching."
      ]
    },
    {
      id: "02",
      title: "A Professor, A Phone Number, A Beginning",
      tagline: "Connecting across classes",
      metaphor: "Communication Line",
      text: [
        "A professor connected us — a simple act that neither of us could have planned.",
        "One phone number. Two people who had never met.",
        "For five to six months, we tried to meet in between classes, schedules, semesters — and kept missing each other. But we kept talking. Every day, on WhatsApp, we exchanged thoughts, ideas, questions, rabbit holes.",
        "We didn't know it then, but we were already building something.",
        "When we finally met in person — it felt less like meeting a stranger and more like recognizing someone you already knew."
      ]
    },
    {
      id: "03",
      title: "The Conversations That Built Us",
      tagline: "Sharing knowledge, building brotherhood",
      metaphor: "Intertwined Brotherhood",
      text: [
        "We didn't talk the way most people our age talked.",
        "We talked about businesses. About branding. About marketing. About what the future could look like if you actually built something instead of waiting for it to arrive.",
        "We roamed around college with our seniors, both of us absorbing everything we could. We shared everything we learned — no keeping score, no gatekeeping. If one of us figured something out, the other knew it by evening.",
        "That's how we operated. That's how we still operate.",
        "Our families noticed before we did. His family welcomed the other like a second son. So did ours. The bond stopped being a friendship long before we gave it a name. We became brothers."
      ]
    },
    {
      id: "04",
      title: "The Lockdown That Tested Everything",
      tagline: "420 hours of commanders in battle",
      metaphor: "Anchored in Battle",
      text: [
        "Then COVID came. College closed. We went back to our homes — separated by distance for seven months, with no idea when we'd be back.",
        "Most bonds don't survive that kind of silence. Ours refused to.",
        "Every evening at 5 PM — without fail, without exception — we called each other. Two hours. Every single day. For seven months.",
        "The format was simple: whatever each of us had learned that day, we shared. No wasted time. No small talk. Just two people pouring everything they had into the call and walking away smarter than they arrived.",
        "Those 420 hours of calls weren't just about knowledge. When things got dark — and for both of us, that period had its dark stretches — we were each other's anchor. We kept each other honest. We kept each other moving.",
        "We were each other's commander in our hardest battles."
      ]
    },
    {
      id: "05",
      title: "Bangalore, Broken Promises, and Walking Away Together",
      tagline: "Knowing what we are worth",
      metaphor: "Clean Break & Departure",
      text: [
        "When lockdown ended, we came to Bangalore.",
        "We joined a company together. Same office. Same mission. Two people building side by side.",
        "They didn't pay us our salaries.",
        "We both quit. Same day. Same decision.",
        "No bitterness. No looking back. Just a shared understanding that some doors are worth closing — and that we were worth more than what was being offered."
      ]
    },
    {
      id: "06",
      title: "The Years We Built Separately",
      tagline: "Cybersecurity and design foundations",
      metaphor: "Parallel Pillars",
      text: [
        "Our paths split after that.",
        "One of us went to Kerala to teach cybersecurity to military personnel — taking everything he knew and pouring it into shaping others.",
        "The other built a design studio from scratch — client after client, brand after brand, learning what it really means to run something alone.",
        "We both grew. We both struggled. We both kept going.",
        "For four years, we lived parallel lives — different industries, different cities, same hunger that had always connected us."
      ]
    },
    {
      id: "07",
      title: "One Conversation That Changed Everything",
      tagline: "The return to Bangalore",
      metaphor: "Reconnecting Paths",
      text: [
        "He moved back to Bangalore.",
        "We sat down and talked — the same way we always had. Seriously. About where we were. About where we wanted to be. About how a job, no matter how good, would never get us there fast enough.",
        "One day, we both just said: let's build this. Together.",
        "Two roles. Two strengths. One studio.",
        "Creative direction and brand design on one side.",
        "Full stack marketing on the other.",
        "Brandedby Studios was born."
      ]
    },
    {
      id: "08",
      title: "Why We Do This",
      tagline: "For every founder starting with nothing",
      metaphor: "Unified Brandedby",
      text: [
        "Eight years of friendship. Eight years of conversations that went deeper than most people go in a lifetime. Eight years of learning, failing, rebuilding — side by side and separately.",
        "When we started our journeys, nobody guided us. Nobody told us what branding was, why it mattered, or how to build something that people would actually trust.",
        "We learned it the hard way — together.",
        "So when a new business founder comes to us with no clear direction, no brand, and no idea where to begin — we don't just understand their situation. We've lived it.",
        "That's why Brandedby Studios exists.",
        "Not to make pretty logos. Not to just run campaigns. But to be the people we never had — the ones who sit down with you, understand your business, and build something real."
      ]
    }
  ];

  return (
    <div className="blueprint-grid min-h-screen pt-12 pb-24 relative z-10">
      {/* Hero Header */}
      <section className="border-b border-border py-20 bg-surface/10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <span className="font-body text-xs font-bold text-purple tracking-widest uppercase block mb-4">
            Our Story
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl md:text-6xl tracking-tighter leading-tight max-w-4xl text-left">
            Eight years ago, two strangers were connected. Today, they build brands together.
          </h1>
          <p className="text-secondary text-base font-normal max-w-2xl mt-6">
            We went through college together, failed together, built separately, lost salaries together, and chose each other again. This is the cinematic story of Hakkim and Bhuvanesh.
          </p>
        </div>
      </section>

      {/* Main Narrative Split Screen */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 pt-20">
        {/* Left Side: Chapter Navigation Menu */}
        <div className="lg:col-span-4 flex flex-col gap-4 border-r border-border/40 pr-6 lg:h-[70vh] lg:sticky lg:top-28 overflow-y-auto">
          <span className="font-body text-sm font-bold text-muted tracking-widest uppercase mb-4 block">
            Story Timeline
          </span>
          {chapters.map((ch, idx) => {
            const isActive = activeChapter === idx;
            return (
              <button
                key={ch.id}
                onClick={() => setActiveChapter(idx)}
                className={`text-left p-4 border transition-all duration-300 rounded-none flex items-center gap-4 cursor-pointer ${
                  isActive
                    ? "bg-surface border-purple text-primary"
                    : "bg-transparent border-border hover:border-border-hover text-muted hover:text-secondary"
                }`}
              >
                <span className="font-body text-xs font-bold text-purple">{ch.id}</span>
                <span className="font-heading font-bold text-sm uppercase tracking-wide">
                  {ch.title.split(",")[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Center Side: Active Chapter Text details */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="font-body text-sm font-semibold text-purple bg-purple/10 border border-purple/20 px-3 py-1 rounded-none">
              Chapter {chapters[activeChapter].id}
            </span>
            <span className="font-body text-sm text-muted uppercase tracking-wider">
              {chapters[activeChapter].tagline}
            </span>
          </div>

          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-primary tracking-tight leading-snug">
            {chapters[activeChapter].title}
          </h2>

          <div className="flex flex-col gap-4 text-secondary text-sm sm:text-base leading-relaxed font-normal">
            {chapters[activeChapter].text.map((paragraph, pIdx) => (
              <p key={pIdx}>{paragraph}</p>
            ))}
          </div>

          {activeChapter === 7 && (
            <div className="mt-6 p-6 border border-purple/20 bg-purple-dim/40 rounded-none italic font-accent text-sm text-purple-light leading-relaxed">
              "For every new business that starts with nothing. Just like we did."
            </div>
          )}
        </div>

        {/* Right Side: Shape Canvas Metaphor */}
        <div className="lg:col-span-3 flex flex-col items-center justify-center liquid-glass rounded-none p-4 self-start lg:sticky lg:top-28">
          <span className="font-body text-xs text-muted font-bold tracking-wider uppercase mb-2">
            Metaphor Visualizer
          </span>
          <StoryCanvas activeChapter={activeChapter} />
          <span className="font-body text-xs text-purple font-bold uppercase tracking-wider text-center mt-2">
            ● Metaphor: {chapters[activeChapter].metaphor}
          </span>
        </div>
      </section>

      {/* WHY US - AFTER THE STORY */}
      <section className="border-t border-border mt-24 pt-24 bg-surface/10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-4 font-body text-xs font-bold text-purple tracking-widest uppercase">
            The Honest Answer
          </div>
          <div className="lg:col-span-8">
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl tracking-tight leading-none">
              Why Brandedby Studios?
            </h2>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-8 bg-surface border border-border rounded-none shadow-md">
            <h4 className="font-heading font-bold text-base text-primary mb-3">
              We've sat where you're sitting.
            </h4>
            <p className="text-secondary text-sm sm:text-base leading-relaxed font-normal">
              We've launched without a brand. We've lost clients because our identity didn't communicate trust. We're not selling you a service. We're sharing everything we wish someone had told us.
            </p>
          </div>

          <div className="p-8 bg-surface border border-border rounded-none shadow-md">
            <h4 className="font-heading font-bold text-base text-primary mb-3">
              We think before we design.
            </h4>
            <p className="text-secondary text-sm sm:text-base leading-relaxed font-normal">
              Before we open a design tool, we research your business, your market, and your audience. Every decision has a reason. You'll never receive something from us that we can't explain.
            </p>
          </div>

          <div className="p-8 bg-surface border border-border rounded-none shadow-md">
            <h4 className="font-heading font-bold text-base text-primary mb-3">
              Two disciplines, not one.
            </h4>
            <p className="text-secondary text-sm sm:text-base leading-relaxed font-normal">
              Most studios give you design. Most agencies give you marketing. We give you both — a Creative Director who builds the brand and a CMO who grows it. Under one roof.
            </p>
          </div>
        </div>
      </section>

      {/* Quote Banner & Team link redirection */}
      <section className="py-24 max-w-[1000px] mx-auto px-6 text-center flex flex-col items-center gap-8">
        <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl italic tracking-tight leading-tight text-gradient-purple">
          "We didn't just build a studio. We built a brotherhood first. And now, we build brands."
        </h2>
        <Link
          href="/team"
          className="btn-cyber-purple flex items-center gap-2 group mt-4"
        >
          <span>Meet the Team</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </section>
    </div>
  );
}
