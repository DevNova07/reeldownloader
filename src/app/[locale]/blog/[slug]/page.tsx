import { getSeoAlternates } from "@/lib/seo";
import { getBlogPostBySlug, blogPosts } from "@/data/blog";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Share2, Facebook, Twitter, Linkedin } from "lucide-react";
import { ReadingProgressBar } from "@/components/shared/ReadingProgressBar";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = getBlogPostBySlug(resolvedParams.slug);
  
  if (!post) {
    return {
    metadataBase: new URL("https://savclip.net"), title: 'Post Not Found' };
  }
  
  return {
    title: `${post.title} | SavClip Blog`,
    description: post.excerpt,
  };
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = getBlogPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  // Simple markdown-to-html converter for blog content
  const htmlContent = post.content
    .replace(/^##\s+(.*)$/gm, '<h2 class="text-3xl font-black mt-12 mb-6 text-neutral-900 dark:text-white">$1</h2>')
    .replace(/^###\s+(.*)$/gm, '<h3 class="text-xl font-bold mt-4 mb-4 text-neutral-800 dark:text-neutral-200">$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-black text-pink-600 dark:text-pink-400">$1</strong>')
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-pink-600 hover:text-pink-500 underline decoration-2 underline-offset-4">$1</a>')
    .replace(/^>\s+(.*)$/gm, '<blockquote class="border-l-4 border-pink-500 pl-4 py-2 my-6 bg-pink-50 dark:bg-pink-900/10 italic text-neutral-700 dark:text-neutral-300">$1</blockquote>')
    .replace(/^(?!<h|<ul|<ol|<li|<blockquote)(.*$)/gm, '<p class="mb-6 leading-relaxed text-lg text-neutral-600 dark:text-neutral-400">$1</p>')
    .replace(/<p><\/p>/g, '') // Remove empty paragraphs

  const relatedPosts = blogPosts
    .filter(p => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  return (
    <div className="bg-white dark:bg-black min-h-screen">
      <ReadingProgressBar />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb & Global Back */}
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-sm font-bold text-neutral-500 hover:text-pink-600 transition-colors dark:text-neutral-400 dark:hover:text-pink-400 mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all articles
        </Link>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 xl:gap-24">
          
          {/* Main Article */}
          <article className="prose prose-neutral dark:prose-invert max-w-none">
            {/* Header Content */}
            <header className="mb-12 border-b border-neutral-100 pb-10 dark:border-neutral-800">
              <div className="flex items-center gap-4 mb-6">
                <span className="inline-block rounded-full bg-pink-100 px-3 py-1 text-xs font-black uppercase tracking-widest text-pink-600 dark:bg-pink-500/20 dark:text-pink-400">
                  {post.category}
                </span>
                <span className="flex items-center gap-1.5 text-sm font-medium text-neutral-500 dark:text-neutral-400">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
              
              <h1 className="mb-2 text-4xl font-black tracking-tight text-neutral-900 dark:text-white sm:text-5xl lg:text-6xl leading-[1.1]">
                {post.title}
              </h1>
              
              <p className="text-xl text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed max-w-3xl hidden sm:block">
                {post.excerpt}
              </p>
              
              {/* Author Info */}
              <div className="mt-4 flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-linear-to-tr from-pink-500 to-rose-500 flex items-center justify-center text-white font-black text-lg">
                  IS
                </div>
                <div>
                  <p className="text-sm font-bold text-neutral-900 dark:text-white">{post.author}</p>
                  <p className="text-xs text-neutral-500">{post.readTime}</p>
                </div>
              </div>
            </header>

            {/* Generated Content */}
            <div 
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: htmlContent }} 
            />

            {/* Footer / Share */}
            <div className="mt-16 border-t border-neutral-100 pt-8 dark:border-neutral-800 flex items-center justify-between">
               <div className="flex items-center gap-3">
                 <span className="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                   <Share2 className="h-4 w-4" /> Share Article
                 </span>
                 <button className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800 text-[#1877F2] hover:bg-[#1877F2] hover:text-white transition-all">
                   <Facebook className="h-4 w-4" />
                 </button>
                 <button className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800 text-[#1DA1F2] hover:bg-[#1DA1F2] hover:text-white transition-all">
                   <Twitter className="h-4 w-4" />
                 </button>
                 <button className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800 text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white transition-all">
                   <Linkedin className="h-4 w-4" />
                 </button>
               </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-10 lg:pl-8 lg:border-l border-neutral-100 dark:border-neutral-800">
            {/* Call to Action Sticky Ad */}
            <div className="sticky top-24 rounded-3xl bg-linear-to-b from-pink-600 to-rose-600 p-8 shadow-2xl text-center">
              <h3 className="text-2xl font-black text-white mb-2">Ready to download?</h3>
              <p className="text-pink-100 text-sm mb-6 font-medium">SavClip is the fastest, safest way to save social media content in 4K resolution.</p>
              <Link 
                href="/"
                className="inline-flex w-full items-center justify-center rounded-xl bg-white px-6 py-4 text-sm font-black uppercase tracking-widest text-pink-600 shadow-xl transition-all hover:scale-105 active:scale-95"
              >
                Try it now
              </Link>
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div>
                <h3 className="text-lg font-black uppercase tracking-widest text-neutral-900 dark:text-white mb-6 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-pink-600" />
                  Related Reads
                </h3>
                <div className="space-y-6">
                  {relatedPosts.map((relatedPost) => (
                    <Link 
                      key={relatedPost.slug} 
                      href={`/blog/${relatedPost.slug}`}
                      className="group block"
                    >
                      <span className="text-xs font-bold text-pink-600 dark:text-pink-400 mb-1 block">
                        {relatedPost.category}
                      </span>
                      <h4 className="font-bold text-neutral-800 dark:text-neutral-200 group-hover:text-pink-600 transition-colors leading-snug">
                        {relatedPost.title}
                      </h4>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
