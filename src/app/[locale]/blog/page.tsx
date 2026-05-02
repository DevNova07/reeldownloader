"use client"

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { blogPosts, getAllCategories } from "@/data/blog";
import { Calendar, Clock, ChevronRight, Hash, Search, X } from "lucide-react";
import { PlatformTabs } from "@/components/shared/PlatformTabs";
import { SocialPlatformBar } from "@/components/layout/SocialPlatformBar";
import { cn } from "@/utils/cn";

export default function BlogPage() {
  const categories = getAllCategories();
  const [searchQuery, setSearchQuery] = React.useState("");

  // [/] Implement Minimalist Newsletter Signup on /blog
  const filteredPosts = blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      {/* 🌟 CINEMATIC FEATURED STORIES */}
      <section className="relative overflow-hidden bg-white dark:bg-black px-4 pt-10 pb-8 sm:px-6 lg:px-8 border-b border-neutral-100 dark:border-neutral-800">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom_right,rgba(236,72,153,0.05),transparent)] pointer-events-none" />
        <div className="relative z-10 mx-auto max-w-7xl text-center mb-10">
          <SocialPlatformBar activeId="none" />
          <div className="mt-8">
            <h1 className="text-4xl font-black tracking-tighter text-neutral-900 dark:text-white sm:text-7xl uppercase italic">
              INSIDE <span className="text-pink-600">SNAP</span>
            </h1>
            <p className="mx-auto mt-2 max-w-lg text-[10px] font-black uppercase tracking-[0.4em] text-neutral-400 hidden sm:block">The Ultimate Social Media Download Guide</p>
          </div>
        </div>

        {/* Highlighted Hero Card */}
        <div className="relative mx-auto max-w-5xl">
            <Link 
              href={`/blog/${blogPosts[0].slug}`}
              className="group relative flex flex-col overflow-hidden rounded-none bg-[#facc15] shadow-2xl transition-all hover:scale-[1.01] border border-black/5"
            >
              <div className="absolute inset-0 z-0">
                 <div className="absolute inset-0 bg-linear-to-r from-[#facc15] via-[#facc15]/40 to-transparent z-10" />
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.4),transparent_70%)] z-10" />
                 <Image 
                   src={blogPosts[0].image || "/images/blog-hero.webp"} 
                   alt={blogPosts[0].title}
                   width={1200}
                   height={800}
                   className="h-full w-full object-cover opacity-30 transition-transform duration-700 group-hover:scale-105 filter grayscale"
                 />
              </div>

              <div className="relative z-20 flex flex-col justify-end p-8 min-h-[400px] md:min-h-[500px] md:p-16">
                 <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-black/5 px-4 py-2 backdrop-blur-md border border-black/10">
                    <span className="relative flex h-2 w-2">
                       <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black/20 opacity-75"></span>
                       <span className="relative inline-flex rounded-full h-2 w-2 bg-black"></span>
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-black/80">Premium Guide</span>
                 </div>
                 
                 <h2 className="max-w-3xl text-3xl font-black tracking-tight text-black md:text-5xl lg:text-5xl leading-[1.1]">
                    {blogPosts[0].title}
                 </h2>
                 <p className="mt-4 max-w-xl text-sm font-bold text-black/60 line-clamp-2 md:text-base leading-relaxed italic">
                    {blogPosts[0].excerpt}
                 </p>
                 
                 <div className="mt-10 flex items-center gap-4">
                    <div className="inline-flex h-12 items-center gap-6 rounded-full bg-black px-8 text-xs font-black uppercase tracking-tight text-white transition-all group-hover:bg-neutral-800">
                      Read full Guide
                      <ChevronRight className="h-4 w-4" />
                    </div>
                    <div className="hidden md:flex items-center gap-6 text-xs font-bold text-black/40">
                      <span className="flex items-center gap-2 font-black uppercase tracking-widest"><Clock className="h-4 w-4 text-black" /> {blogPosts[0].readTime}</span>
                    </div>
                 </div>
              </div>
            </Link>
        </div>
      </section>

      {/* 🏷️ PREMIUM STICKY TOPICS BAR */}
      <section className="sticky top-16 z-40 w-full border-b border-neutral-100 bg-white/80 backdrop-blur-xl dark:border-neutral-800 dark:bg-black/80">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
            <div className="flex shrink-0 items-center gap-2 pr-4 border-r border-neutral-100 dark:border-neutral-800">
               <Hash className="h-4 w-4 text-pink-600" />
               <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Filter Topics</span>
            </div>
            
            <div className="flex items-center gap-2 pl-2">
              <Link 
                href="/blog" 
                className="shrink-0 rounded-full bg-neutral-900 px-5 py-2 text-xs font-black uppercase tracking-tight text-white shadow-lg shadow-neutral-200 active:scale-95 transition-all dark:bg-white dark:text-black dark:shadow-none"
              >
                All Stories
              </Link>
              {categories.map((category) => (
                <button 
                  key={category}
                  onClick={() => setSearchQuery(category)}
                  className="shrink-0 rounded-full bg-white px-5 py-2 text-xs font-black uppercase tracking-tight text-neutral-500 border border-neutral-100 hover:border-pink-200 hover:text-pink-600 dark:bg-neutral-900/50 dark:text-neutral-400 dark:border-neutral-800 dark:hover:border-pink-500/50 transition-all active:scale-90"
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="ml-auto relative hidden md:block">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-400" />
               <input 
                 type="text" 
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 placeholder="Search guides..."
                 className="w-48 rounded-full border border-neutral-100 bg-neutral-50 px-9 py-2 text-[10px] font-black uppercase tracking-widest outline-none focus:border-pink-200 focus:w-64 transition-all dark:bg-neutral-900 dark:border-neutral-800"
               />
               {searchQuery && (
                 <button 
                   onClick={() => setSearchQuery("")}
                   className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-900"
                 >
                   <X className="h-3.5 w-3.5" />
                 </button>
               )}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 bg-neutral-50/50 dark:bg-black/50 flex-1">
        <div className="mx-auto max-w-7xl">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20 opacity-30">
               <Search className="h-16 w-16 mx-auto mb-4" />
               <p className="text-sm font-black uppercase tracking-widest">No matching stories found</p>
               <button onClick={() => setSearchQuery("")} className="mt-4 text-xs font-bold text-pink-600 underline">Clear search</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <React.Fragment key={post.slug}>
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col justify-between rounded-none bg-white p-6 shadow-sm border border-neutral-100 hover:shadow-xl hover:border-pink-200 transition-all duration-300 hover:-translate-y-1 dark:bg-neutral-900/80 dark:border-neutral-800 dark:hover:border-pink-500/30"
                  >
                    <div>
                      <div className="mb-4 inline-block rounded-full bg-pink-50 px-3 py-1 text-xs font-black uppercase tracking-widest text-pink-600 dark:bg-pink-500/10 dark:text-pink-400">
                        {post.category}
                      </div>
                      <h2 className="mb-3 text-2xl font-black text-neutral-900 dark:text-white line-clamp-2 leading-tight group-hover:text-pink-600 transition-colors">
                        {post.title}
                      </h2>
                      <p className="mb-6 text-sm text-neutral-500 dark:text-neutral-400 line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between border-t border-neutral-100 pt-4 dark:border-neutral-800">
                      <div className="flex items-center gap-4 text-xs font-bold text-neutral-400">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" />
                          {post.readTime}
                        </span>
                      </div>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-400 group-hover:bg-pink-600 group-hover:text-white transition-colors dark:bg-neutral-800">
                        <ChevronRight className="h-4 w-4" />
                      </div>
                    </div>
                  </Link>

                  {/* 📬 NEWSLETTER INTEGRATION (After 3 items) */}
                  {index === 2 && (
                    <div className="col-span-full my-8">
                       <div className="relative overflow-hidden rounded-none bg-black p-8 md:p-16 text-center shadow-2xl">
                          {/* Decorative elements */}
                          <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-pink-600/20 blur-[100px] pointer-events-none" />
                          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-64 w-64 rounded-full bg-pink-900/20 blur-[100px] pointer-events-none" />
                          
                          <div className="relative z-10 flex flex-col items-center max-w-2xl mx-auto">
                             <div className="mb-6 rounded-full bg-white/10 px-4 py-2 border border-white/10">
                               <span className="text-[10px] font-black uppercase tracking-[0.3em] text-pink-500">Join the inner circle</span>
                             </div>
                             
                             <h3 className="text-3xl font-black text-white md:text-5xl tracking-tighter uppercase italic leading-none mb-4">
                               Never Miss a <span className="text-pink-600">Viral</span> Strategy
                             </h3>
                             <p className="text-sm font-medium text-neutral-400 uppercase tracking-widest max-w-md mb-10 brightness-125">
                               Get the latest social media guides, case studies, and trends delivered once a week.
                             </p>
                             
                             <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center bg-white/5 p-2 rounded-2xl border border-white/5 backdrop-blur-md">
                                <input 
                                  type="email" 
                                  placeholder="ENTER YOUR EMAIL" 
                                  className="flex-1 bg-transparent px-6 py-4 text-xs font-black uppercase tracking-widest text-white outline-none placeholder:text-neutral-600"
                                />
                                <button className="h-12 rounded-xl bg-pink-600 px-10 text-[10px] font-black uppercase tracking-widest text-white transition-all hover:bg-pink-500 hover:scale-[1.02] active:scale-95 shadow-lg shadow-pink-600/20">
                                  SUBSCRIBE
                                </button>
                             </div>
                             <p className="mt-4 text-[9px] font-black uppercase tracking-widest text-neutral-600">No spam. Only high-performance content.</p>
                          </div>
                       </div>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
