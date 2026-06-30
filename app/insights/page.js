"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Calendar, Tag } from "lucide-react";
import { insights } from "@/data/insights";
import { ScrambleText } from "@/components/Navbar";

export default function InsightsPage() {
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [featuredDate, setFeaturedDate] = useState("");
  const featured = insights[featuredIndex] || insights[0];
  const sliderRef = useRef(null);


  useEffect(() => {
    const totalCount = insights.length;
    if (totalCount > 0) {
      const now = new Date();
      // Stable date-based index calculation
      const dayVal = now.getFullYear() * 365 + (now.getMonth() + 1) * 31 + now.getDate();
      setFeaturedIndex(dayVal % totalCount);

      const formatted = now.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      setFeaturedDate(formatted);
    }
  }, []);

  const scrollSlider = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = sliderRef.current.clientWidth + 24; // scroll by page viewport width + gap
      sliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="blueprint-grid min-h-screen pt-12 pb-8 relative z-10">
      {/* Header section */}
      <section className="py-8 bg-surface/10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <span className="font-body text-xs font-bold text-purple tracking-widest uppercase block mb-4">
            Daily Insights
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tighter leading-tight max-w-4xl text-left">
            Learn What Most Founders Learn Too Late.
          </h1>
          <p className="text-secondary text-sm font-normal max-w-2xl mt-3">
            One branding insight, every day. For new business founders who want to understand what makes a brand actually work - before they get it wrong.
          </p>
        </div>
      </section>

      {/* Featured Insight Card Section */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 pt-12">
        <div className="border border-border rounded-none bg-surface p-8 md:p-12 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 p-4 font-body text-xs text-purple-light font-bold tracking-wider uppercase">
            Featured Insight
          </div>
          <div className="flex flex-col gap-6 max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="font-body text-xs font-semibold text-purple bg-purple/10 border border-purple/20 px-3 py-1 rounded-none">
                Today's Insight
              </span>
              <span className="font-body text-xs text-muted flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {featuredDate || featured.date}
              </span>
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-primary leading-tight tracking-tight">
              {featured.title}
            </h2>
            <p className="text-secondary text-sm sm:text-base leading-relaxed font-normal">
              {featured.excerpt}
            </p>
            <p className="text-muted text-xs sm:text-sm leading-relaxed font-normal opacity-85 line-clamp-3">
              {featured.body}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mt-6 pt-6 border-t border-border/60">
              <Link
                href={`/insights/${featured.slug}`}
                className="btn-cyber-purple flex items-center gap-2 group cursor-pointer"
              >
                <span>Read Full Article</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* Archive Horizontal Slider Section */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 pt-20 overflow-hidden">
        <div className="flex justify-between items-end mb-8">
          <div>
            <span className="font-body text-xs font-bold text-purple tracking-widest uppercase block mb-2">
              Insights Archive
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-primary tracking-tight">
              All Insights
            </h2>
          </div>
          
          {/* Slider navigation arrows */}
          <div className="flex gap-2.5">
            <button
              onClick={() => scrollSlider("left")}
              className="w-10 h-10 border border-border bg-surface hover:bg-purple hover:border-purple hover:text-white text-secondary rounded-none flex items-center justify-center cursor-pointer transition-colors font-body font-bold text-sm"
              aria-label="Scroll Left"
            >
              ←
            </button>
            <button
              onClick={() => scrollSlider("right")}
              className="w-10 h-10 border border-border bg-surface hover:bg-purple hover:border-purple hover:text-white text-secondary rounded-none flex items-center justify-center cursor-pointer transition-colors font-body font-bold text-sm"
              aria-label="Scroll Right"
            >
              →
            </button>
          </div>
        </div>

        {/* Horizontal scrollable cards container */}
        <div 
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto scroll-smooth w-full pb-8 select-none no-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {insights.map((item) => (
            <div
              key={item.slug}
              className="w-full md:w-[calc((100%-24px)/2)] lg:w-[calc((100%-72px)/4)] shrink-0 p-6 bg-surface border border-border rounded-none flex flex-col justify-between min-h-64 hover:border-purple/45 hover:shadow-lg transition-all duration-300"
            >
              <div>
                <div className="flex justify-between items-center mb-3 font-body text-[10px] font-semibold text-muted">
                  <span className="flex items-center gap-1 text-purple">
                    <Tag className="w-3.5 h-3.5" />
                    {item.category}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-purple" />
                    {item.date.split(",")[0]}
                  </span>
                </div>
                <h3 className="font-heading font-extrabold text-sm md:text-base text-primary line-clamp-2 mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-secondary text-[11px] sm:text-xs leading-relaxed font-normal line-clamp-3">
                  {item.excerpt}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-border/40 flex justify-between items-center">
                <Link
                  href={`/insights/${item.slug}`}
                  className="font-body text-xs font-bold text-purple flex items-center gap-1.5 hover:underline cursor-pointer group"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </Link>
                <div className="w-5 h-5 rounded-none border border-border flex items-center justify-center text-muted">
                  <BookOpen className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
