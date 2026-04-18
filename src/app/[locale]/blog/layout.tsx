import { Metadata } from "next";

export const metadata: Metadata = {
  title: "InstaSnap Blog - Social Media Tips & Guides",
  description: "Learn how to download videos, reels, and stories from Instagram, TikTok, Facebook, and more in original quality.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
