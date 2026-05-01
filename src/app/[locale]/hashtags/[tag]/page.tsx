import { getSeoAlternates } from "@/lib/seo";
import * as React from "react"
import { HashtagDetailView } from "./HashtagDetailView"
import { Metadata } from "next"

export async function generateMetadata(props: { params: Promise<{ locale: string, tag: string }> }): Promise<Metadata> {
  const { tag } = await props.params;
  const cleanTag = decodeURIComponent(tag);
  return {
    title: `Best #${cleanTag} Hashtags for Instagram & TikTok`,
    description: `Copy the best hashtags for #${cleanTag}. Grow your reach and get more likes with trending hashtags.`,
  };
}

export default async function HashtagDetailPage(props: { params: Promise<{ locale: string, tag: string }> }) {
  const { locale, tag } = await props.params;
  const cleanTag = decodeURIComponent(tag);
  
  return <HashtagDetailView locale={locale} tag={cleanTag} />
}
