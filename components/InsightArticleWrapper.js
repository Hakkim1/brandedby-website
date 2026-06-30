"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag, BookOpen, ArrowRight } from "lucide-react";

export default function InsightArticleWrapper({ article, prevArticle, nextArticle }) {
  const [isClient, setIsClient] = useState(false);
  const [released, setReleased] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (article) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const releaseDate = new Date(article.date);
      releaseDate.setHours(0, 0, 0, 0);
      setReleased(releaseDate <= today);
    }
  }, [article]);

  if (!article || (isClient && !released)) {
    return (
      <div className="blueprint-grid min-h-screen pt-24 text-center">
        <div className="max-w-md mx-auto py-20 bg-surface border border-border rounded-none shadow-lg">
          <span className="font-body text-sm font-bold text-purple tracking-widest uppercase block mb-4">
            Error 404
          </span>
          <h1 className="font-heading font-extrabold text-2xl text-primary mb-6">
            Article Not Yet Released
          </h1>
          <Link href="/insights" className="btn-cyber-purple px-6 py-2.5 font-semibold">
            Back to Insights
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="blueprint-grid min-h-screen pt-12 pb-24 relative z-10">
      <div className="max-w-[900px] mx-auto px-6">
        {/* Back Link */}
        <Link
          href="/insights"
          className="inline-flex items-center gap-2 font-body text-xs font-semibold text-purple hover:text-purple-light transition-colors py-4 mb-8 cursor-pointer uppercase tracking-wider"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Insights</span>
        </Link>

        {/* Article Header */}
        <div className="pb-8 mb-12">
          <div className="flex items-center gap-4 font-body text-xs text-muted mb-4">
            <span className="flex items-center gap-1.5 font-semibold text-purple">
              <Tag className="w-3.5 h-3.5" />
              {article.category}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-purple" />
              {article.date}
            </span>
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-primary leading-tight tracking-tight mb-6">
            {article.title}
          </h1>

          <p className="text-secondary text-sm sm:text-base font-normal leading-relaxed border-l-2 border-purple pl-4 text-purple-light">
            {article.excerpt}
          </p>
        </div>

        {/* Article Body */}
        <article className="prose prose-invert max-w-none text-secondary text-sm md:text-base leading-relaxed font-normal flex flex-col gap-6">
          {article.body.split('\n\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
          <p className="mt-4 pt-4 border-t border-border/40 text-purple-light font-medium italic">
            Building a brand takes consistent effort and a structured approach.
            By aligning your strategy before your creative execution, you can
            make sure your business communicates trust immediately. At Brandedby
            Studios, we work with founders to design identities that scale
            naturally. Reach out to us to do a complete visual check.
          </p>
        </article>

        {/* Navigation bottom */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-16 pt-8 border-t border-border/60">
          <Link
            href={`/insights/${prevArticle.slug}`}
            className="p-6 bg-surface border border-border rounded-none flex flex-col items-start gap-2 hover:border-purple/40 transition-colors text-left cursor-pointer shadow-md"
          >
            <span className="font-body text-xs font-bold text-purple uppercase tracking-wider">
              Previous Article
            </span>
            <span className="font-heading font-bold text-sm text-primary line-clamp-1">
              {prevArticle.title}
            </span>
          </Link>

          <Link
            href={`/insights/${nextArticle.slug}`}
            className="p-6 bg-surface border border-border rounded-none flex flex-col items-end gap-2 hover:border-purple/40 transition-colors text-right cursor-pointer shadow-md"
          >
            <span className="font-body text-xs font-bold text-purple uppercase tracking-wider">
              Next Article
            </span>
            <span className="font-heading font-bold text-sm text-primary line-clamp-1">
              {nextArticle.title}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
