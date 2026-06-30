import { insights } from "@/data/insights";
import InsightArticleWrapper from "@/components/InsightArticleWrapper";

// Explicit static paths generator for compiler compliance
export async function generateStaticParams() {
  return insights.map((item) => ({
    slug: item.slug,
  }));
}

export default function InsightDetailsPage({ params }) {
  const { slug } = params;
  const articleIndex = insights.findIndex((item) => item.slug === slug);
  const article = insights[articleIndex];

  if (!article) {
    return null; // Next.js handles 404 naturally or wrapper handles it
  }

  const prevArticle = insights[(articleIndex - 1 + insights.length) % insights.length];
  const nextArticle = insights[(articleIndex + 1) % insights.length];

  return (
    <InsightArticleWrapper
      article={article}
      prevArticle={prevArticle}
      nextArticle={nextArticle}
    />
  );
}
