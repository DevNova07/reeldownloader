import { getSeoAlternates } from "@/lib/seo";
import { getDictionary } from "@/i18n";
import InstagramPage from "@/components/templates/InstagramPage";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    title: "Instagram Reels Downloader – Download Reels Without Watermark HD | SavClip",
    description: "Download Instagram reels without watermark in HD quality. Fast, free and secure Instagram reels downloader online with no login required.",
    alternates: getSeoAlternates("instagram/reels", locale),
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const fullDict = await getDictionary(locale);
  const { platforms, ...rest } = fullDict;
  const dict = {
    ...rest,
    platforms: {
      instagram: platforms?.instagram
    }
  };
  const reels = platforms?.instagram?.reels;
  const contentWithSlug = { 
    ...reels, 
    title: "Instagram Reels Downloader", 
    subtitle: "Download Reels Without Watermark", 
    intro_seo: "You can download reels with just one click. The tool is fast, secure, and completely free to use without any registration. Just paste the reel URL above to save Instagram reels directly to your gallery in seconds.",
    article_content: [
      {
        title: "The Ultimate Guide to Instagram Reels Downloader",
        content: "Welcome to the most comprehensive guide on how to download Instagram reels. In today's digital era, Instagram has become a powerhouse of creative content, ranging from breathtaking photography to engaging short-form videos. However, the platform's native limitations often prevent users from saving their favorite reels directly to their devices. That's where SavClip comes in – the world's most reliable and fastest tool for high-quality downloads."
      },
      {
        title: "Why Use an Reels Downloader?",
        content: "Have you ever come across a reel that you wanted to watch offline or share with friends on other platforms? Whether it's for creative inspiration, educational purposes, or simply keeping a personal gallery of your favorite moments, an reels downloader is an essential tool. SavClip allows you to bypass restrictions and save reels in their original high-definition resolution without any watermarks or quality loss."
      },
      {
        title: "Key Features of SavClip Reels Saver",
        content: "SavClip is engineered for excellence. Our tool offers several industry-leading features that set it apart from the competition. First, we provide **original HD quality** – if the creator uploaded it in 4K, you'll get it in 4K. Second, our service is **fast and secure**, utilizing advanced encryption to ensure your downloads are private. Third, there is **no login required**, which means you never have to share your sensitive Instagram credentials with us. Lastly, SavClip is **cross-platform compatible**, working seamlessly on Android, iOS, Windows, and macOS."
      },
      {
        title: "How to download instagram reels in 3 Simple Steps",
        content: "Downloading content shouldn't be complicated. With SavClip, you can save any reels in seconds. Step 1: Open Instagram and locate the reel you wish to save. Tap the three dots and select 'Copy Link'. Step 2: Navigate to SavClip.com and paste the URL into our search box. Step 3: Click the 'Download' button and choose your preferred resolution. Your file will be saved directly to your device's gallery instantly."
      },
      {
        title: "Is it Safe to download instagram reels?",
        content: "Security is our top priority. Unlike many other tools that require you to install suspicious APKs or log in with your social media accounts, SavClip operates entirely in your web browser. This web-based approach ensures that your device remains protected from malware. Furthermore, we do not track your download history or store personal data, making us the safest choice for download instagram reels enthusiasts worldwide."
      }
    ],
    slug: "instagram/reels" 
  };

  return <InstagramPage content={contentWithSlug} locale={locale} dict={dict} themeColor="pink" activeTab="reels" />;
}
