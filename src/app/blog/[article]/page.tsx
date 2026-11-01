import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { featuredArticle, relatedArticles } from "@/domain/refonte/blog";
import { ArticlePage } from "@/components/refonte/content-pages";

const articles = [featuredArticle, ...relatedArticles];

export const dynamicParams = false;
export function generateStaticParams() { return articles.map(article => ({ article: article.id })); }

export async function generateMetadata({ params }: { params: Promise<{ article: string }> }): Promise<Metadata> {
  const { article: id } = await params;
  const found = articles.find(article => article.id === id);
  return { title: found ? `${found.title} · Koding Schools` : "Article · Koding Schools" };
}

export default async function Page({ params }: { params: Promise<{ article: string }> }) {
  const { article: id } = await params;
  const found = articles.find(article => article.id === id);
  if (!found) notFound();
  return <ArticlePage article={found} />;
}
