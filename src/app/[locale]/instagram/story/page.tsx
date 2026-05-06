import { getSeoAlternates } from "@/lib/seo";
import { getDictionary } from "@/i18n";
import InstagramPage from "@/components/templates/InstagramPage";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    title: "Instagram Story Downloader – Download Stories Without Watermark | SavClip",
    description: "Download Instagram stories without watermark in HD quality. Free Instagram story downloader online for mobile and desktop users.",
    alternates: getSeoAlternates("instagram/story", locale),
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
  const story = platforms?.instagram?.story;
  const contentWithSlug = { 
    ...story, 
    title: "Instagram Story Downloader", 
    subtitle: "Download Stories Without Watermark", 
    intro_seo: "You can download stories with just one click. The tool is fast, secure, and completely free to use without any registration. Just paste the story link above to save Instagram stories directly to your gallery in seconds.",
    article_content: [
      {
        title: "The Ultimate Guide to Instagram Story Downloader",
        content: "Welcome to the most comprehensive guide on how to download Instagram stories. In today's digital era, Instagram has become a powerhouse of creative content, ranging from breathtaking photography to engaging stories. However, the platform's native limitations often prevent users from saving their favorite stories directly to their devices. That's where SavClip comes in – the world's most reliable and fastest tool for high-quality downloads."
      },
      {
        title: "Why Use an Story Downloader?",
        content: "Have you ever come across a story that you wanted to watch offline or share with friends on other platforms? Whether it's for creative inspiration, educational purposes, or simply keeping a personal gallery of your favorite moments, an story downloader is an essential tool. SavClip allows you to bypass restrictions and save stories in their original high-definition resolution without any watermarks or quality loss."
      },
      {
        title: "Key Features of SavClip Story Saver",
        content: "SavClip is engineered for excellence. Our tool offers several industry-leading features that set it apart from the competition. First, we provide **original HD quality** – if the creator uploaded it in high resolution, you'll get it in high resolution. Second, our service is **fast and secure**, utilizing advanced encryption to ensure your downloads are private. Third, there is **no login required**, which means you never have to share your sensitive Instagram credentials with us. Lastly, SavClip is **cross-platform compatible**, working seamlessly on Android, iOS, Windows, and macOS."
      },
      {
        title: "How to download instagram stories in 3 Simple Steps",
        content: "Downloading content shouldn't be complicated. With SavClip, you can save any stories in seconds. Step 1: Open Instagram and locate the story you wish to save. Tap the three dots and select 'Copy Link'. Step 2: Navigate to SavClip.com and paste the URL into our search box. Step 3: Click the 'Download' button and choose your preferred resolution. Your file will be saved directly to your device's gallery instantly."
      },
      {
        title: "Is it Safe to download instagram stories?",
        content: "Security is our top priority. Unlike many other tools that require you to install suspicious APKs or log in with your social media accounts, SavClip operates entirely in your web browser. This web-based approach ensures that your device remains protected from malware. Furthermore, we do not track your download history or store personal data, making us the safest choice for download instagram stories enthusiasts worldwide."
      }
    ],
    slug: "instagram/story" 
  };

  return <InstagramPage content={contentWithSlug} locale={locale} dict={dict} themeColor="pink" activeTab="story" />;
}
