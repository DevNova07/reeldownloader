import { getSeoAlternates } from "@/lib/seo";
import { getDictionary } from "@/i18n";
import InstagramPage from "@/components/templates/InstagramPage";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    title: "Instagram Photo Downloader HD Online | SavClip",
    description: "Download Instagram photos in HD quality online free. Fast Instagram photo downloader without login required.",
    alternates: getSeoAlternates("instagram/photo", locale),
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
  const photo = platforms?.instagram?.photo;
  const contentWithSlug = { 
    ...photo, 
    title: "Instagram Photo Downloader", 
    subtitle: "Download Photos Without Watermark", 
    intro_seo: "You can download single images or entire carousel posts with just one click. The tool is fast, secure, and completely free to use without any registration. Just paste the image URL above to save Instagram photos directly to your gallery in seconds.",
    article_content: [
      {
        title: "The Ultimate Guide to Instagram Photo Downloader",
        content: "Welcome to the most comprehensive guide on how to download Instagram photos. In today's digital era, Instagram has become a powerhouse of creative content, ranging from breathtaking photography to engaging carousels. However, the platform's native limitations often prevent users from saving their favorite photos directly to their devices. That's where SavClip comes in – the world's most reliable and fastest tool for high-quality downloads."
      },
      {
        title: "Why Use an Photo Downloader?",
        content: "Have you ever come across a photo that you wanted to watch offline or share with friends on other platforms? Whether it's for creative inspiration, educational purposes, or simply keeping a personal gallery of your favorite moments, an photo downloader is an essential tool. SavClip allows you to bypass restrictions and save photos in their original high-definition resolution without any watermarks or quality loss."
      },
      {
        title: "Key Features of SavClip Photo Saver",
        content: "SavClip is engineered for excellence. Our tool offers several industry-leading features that set it apart from the competition. First, we provide **original HD quality** – if the creator uploaded it in high resolution, you'll get it in high resolution. Second, our service is **fast and secure**, utilizing advanced encryption to ensure your downloads are private. Third, there is **no login required**, which means you never have to share your sensitive Instagram credentials with us. Lastly, SavClip is **cross-platform compatible**, working seamlessly on Android, iOS, Windows, and macOS."
      },
      {
        title: "How to download instagram photos in 3 Simple Steps",
        content: "Downloading content shouldn't be complicated. With SavClip, you can save any photos in seconds. Step 1: Open Instagram and locate the photo you wish to save. Tap the three dots and select 'Copy Link'. Step 2: Navigate to SavClip.com and paste the URL into our search box. Step 3: Click the 'Download' button and choose your preferred resolution. Your file will be saved directly to your device's gallery instantly."
      },
      {
        title: "Is it Safe to download instagram photos?",
        content: "Security is our top priority. Unlike many other tools that require you to install suspicious APKs or log in with your social media accounts, SavClip operates entirely in your web browser. This web-based approach ensures that your device remains protected from malware. Furthermore, we do not track your download history or store personal data, making us the safest choice for download instagram photos enthusiasts worldwide."
      }
    ],
    slug: "instagram/photo" 
  };

  return <InstagramPage content={contentWithSlug} locale={locale} dict={dict} themeColor="pink" activeTab="photo" />;
}
