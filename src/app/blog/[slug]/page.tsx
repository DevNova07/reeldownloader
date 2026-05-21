import { BLOG_POSTS } from "@/lib/blog-data";
import { notFound } from "next/navigation";
import { Calendar, User, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { type Locale } from "@/i18n";
import dynamic from "next/dynamic";
import { getSeoAlternates } from "@/lib/seo";
import type { Metadata } from "next";

const RichArticle = dynamic(() => import("@/components/shared/RichArticle").then(m => m.RichArticle));

export async function generateMetadata(props: { params: Promise<{ locale: Locale, slug: string }> }): Promise<Metadata> {
  const params = await props.params;
  const { locale, slug } = params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Post Not Found – SavClip",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: `${post.title} – SavClip`,
    description: post.excerpt,
    alternates: getSeoAlternates(`blog/${slug}`, locale),
  };
}


export default async function BlogPostPage(props: { params: Promise<{ locale: Locale, slug: string }> }) {
  const params = await props.params;
  const { locale, slug } = params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) notFound();

  return (
    <div className="min-h-screen bg-white dark:bg-black pt-24 pb-20">
      <article className="max-w-4xl mx-auto px-4">
        <Link href={`/blog`} className="inline-flex items-center gap-2 text-neutral-400 font-black uppercase tracking-widest text-[10px] mb-12 hover:text-pink-600 transition-colors">
          <ChevronLeft className="w-4 h-4" /> Back to Blog
        </Link>

        <header className="mb-16">
          <div className="flex items-center gap-6 text-[10px] font-black text-pink-600 uppercase tracking-widest mb-6">
            <span className="px-3 py-1 bg-pink-600/10 rounded-full">{post.category}</span>
            <span className="flex items-center gap-1.5 text-neutral-400"><Calendar className="w-3 h-3" /> {post.date}</span>
            <span className="flex items-center gap-1.5 text-neutral-400"><User className="w-3 h-3" /> By {post.author}</span>
          </div>
          <h1 className="text-3xl sm:text-6xl font-black text-neutral-900 dark:text-white uppercase italic tracking-tighter leading-tight">
            {post.title}
          </h1>
        </header>

        <div className="aspect-video bg-neutral-100 dark:bg-neutral-900 rounded-4xl mb-16 overflow-hidden border border-neutral-100 dark:border-neutral-800" />

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <RichArticle 
            sections={[
              { type: "paragraph", content: post.content },
              { type: "heading", level: 2, content: "Mastering the Art of Content Extraction" },
              { type: "paragraph", content: "Using tools like SavClip allows you to preserve the high-quality resolution of the original post without compromises. In today's social media landscape, archiving your favorite moments or business assets is crucial." },
              { type: "list", items: [
                "Copy the URL of any social media post.",
                "Paste it into the SavClip search bar.",
                "Download in Full HD or 4K instantly."
              ]}
            ]}
          />
        </div>
      </article>
    </div>
  );
}
