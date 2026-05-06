import { getSeoAlternates } from "@/lib/seo";
import { getDictionary } from "@/i18n";
import FacebookPage from "@/components/templates/FacebookPage";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    title: "Facebook Private Video Downloader – Download Private Videos HD | SavClip",
    description: "Download Facebook private videos securely in HD quality. Fast, free and secure Facebook private video downloader online with no login required.",
    alternates: getSeoAlternates("facebook/private", locale),
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const fullDict = await getDictionary(locale);
  const { platforms, ...rest } = fullDict;
  const dict = {
    ...rest,
    platforms: {
      facebook: platforms?.facebook
    }
  };
  const privateTool = platforms?.facebook?.private;
  const contentWithSlug = { 
    ...privateTool, 
    title: "facebook private video downloader", 
    subtitle: "download private videos online", 
    intro_seo: "You can download Facebook private videos with just one click. The tool is fast, secure, and completely free to use without any registration. Just paste the private video link above to save it directly to your gallery in seconds.",
    article_content: [
      {
        title: "The Ultimate Guide to Facebook Private Video Downloader",
        content: "Welcome to the most comprehensive guide on how to download Facebook private videos. Facebook remains one of the world's largest repositories of video content, from viral reels to life-changing stories. However, saving these moments for offline viewing isn't always straightforward. SavClip provides the ultimate solution for downloading Facebook private videos with maximum ease and zero quality loss."
      },
      {
        title: "Why Use a Facebook Private Video Downloader?",
        content: "Whether you want to save a tutorial for offline study, keep a copy of a live stream, or archive a memorable story from a friend, a dedicated Facebook downloader is essential. SavClip allows you to download private videos in their original high-definition resolution. Our tool is optimized to handle different Facebook formats, ensuring you get the best possible experience without any annoying watermarks."
      },
      {
        title: "Key Features of SavClip FB Saver",
        content: "SavClip is built to be the best. Our tool offers several high-end features: First, we support **full HD and 4K downloads**, giving you the highest quality available. Second, our servers are optimized for **lightning-fast speed**, so you don't have to wait. Third, your **privacy is guaranteed** as we don't require any login or personal information. Lastly, our interface is **100% mobile-friendly**, working perfectly on iPhones, Android devices, and desktops alike."
      },
      {
        title: "How to download facebook private videos in Seconds",
        content: "Saving your favorite Facebook content is incredibly simple with SavClip. Step 1: Open Facebook and find the private video you want to save. Click the 'Share' button and choose 'Copy Link'. Step 2: Navigate to SavClip.com in your browser and paste the link into the search box. Step 3: Hit the 'Download' button and choose your preferred quality. Your private video will be saved to your device's storage immediately."
      },
      {
        title: "Is SavClip Safe for Facebook Downloads?",
        content: "Absolutely. We understand that security is a major concern. SavClip is a web-based tool, meaning you don't need to download any suspicious software or extensions. We use SSL encryption to protect your connection and we never store your data or download history. You can use our tool with complete peace of mind to download facebook private videos anytime, anywhere."
      }
    ],
    slug: "facebook/private" 
  };

  return <FacebookPage content={contentWithSlug} locale={locale} dict={dict} themeColor="cyan" activeTab="private" />;
}
