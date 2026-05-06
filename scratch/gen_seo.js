
const fs = require('fs');

const rawH1s = `
Download Instagram Reels
Instagram Story Downloader
Private Story Downloader
Instagram Reels Download
Instagram Video Download
Instagram Reels Downloader
Instagram Reels HD
Download Reels HD
Instagram Video Downloader
Download Instagram Reels
Save Instagram Reels
Short Video Downloader
Insta Reels Saver
Instagram Photo Download
Instagram DP Download
Instagram Profile Viewer
Highlights Downloader
Instagram Audio Download
Instagram IGTV Download
Reels Without Login
Private Video Downloader
Instagram Video APK
Bulk Instagram Downloader
Instagram Link Downloader
Video Converter Online
Reels to MP3
Reels Without Watermark
Download Instagram Stories
Bulk Video Downloader
Instagram DP HD
Private Video Download
Reels Download No Login
Video Downloader APK
Instagram Downloader India
Instagram Downloader USA
Instagram Downloader Brazil
Instagram Downloader Indonesia
Reels Download Bangladesh
4K Video Downloader
Bulk Reels Downloader
Private Video Saver
Anonymous Story Viewer
Instagram Downloader Mexico
Instagram Downloader Germany
Instagram Downloader France
Instagram Downloader Italy
Instagram Downloader Spain
Instagram Downloader Turkey
Instagram Downloader Russia
Instagram Downloader Japan
Instagram Downloader Korea
Instagram Downloader Vietnam
Instagram Downloader Thailand
Instagram Downloader Philippines
Instagram Downloader Egypt
Instagram Downloader Nigeria
Instagram Downloader South Africa
Instagram Downloader Canada
Instagram Downloader Australia
4K Instagram Downloader
High Speed Downloader
No Ads Downloader
Unlimited Downloader
Safe Instagram Downloader
HD Audio Downloader
MP3 Converter Downloader
MP4 Converter Downloader
Gallery Saver Downloader
Video Download HD
Photo Download HD
Story Download HD
Reels Without Watermark
Video Without Watermark
Instagram Reels Saver
Instagram Video Saver
Download Video Online
Download Reels Online
Insta Video Downloader
Insta Reels Downloader
Insta Story Downloader
Profile Picture Downloader
Carousel Downloader
Album Downloader
Thumbnail Downloader
Reel Converter
Save Instagram Video
Save Instagram Reels
Story Saver
Instagram Downloader
Reels MP4 Downloader
Download Instagram Video
Video MP4 Downloader
Online Video Downloader
Fast Video Downloader
Story Downloader
Download Instagram Story
Anonymous Story Viewer
Instagram Photo Downloader
Download Instagram Photo
Image Downloader
Save Instagram Photo
Instagram IGTV Downloader
Download Instagram IGTV
IGTV Download HD
IGTV Saver
Online IGTV Downloader
Profile Pic Downloader
Instagram Post Download
Reels Video Download
`;

const h1s = rawH1s.trim().split('\n');

const getType = (h1) => {
  const h = h1.toLowerCase();
  if (h.includes('reel')) return 'reels';
  if (h.includes('story')) return 'stories';
  if (h.includes('video')) return 'videos';
  if (h.includes('photo') || h.includes('image') || h.includes('dp') || h.includes('profile')) return 'photos';
  if (h.includes('igtv')) return 'IGTV videos';
  if (h.includes('highlights')) return 'highlights';
  if (h.includes('audio') || h.includes('mp3')) return 'audio';
  return 'content';
};

const generateLongArticle = (h1, type) => {
  const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);
  const keyword = h1;
  
  return [
    {
      title: `The Ultimate Guide to ${keyword}`,
      content: `Welcome to the most comprehensive guide on how to ${keyword.toLowerCase()}. In today's digital era, Instagram has become a powerhouse of creative content, ranging from breathtaking photography to engaging short-form videos. However, the platform's native limitations often prevent users from saving their favorite ${type} directly to their devices. That's where SavClip comes in – the world's most reliable and fastest tool for high-quality downloads.`
    },
    {
      title: `Why Use an ${capitalizedType} Downloader?`,
      content: `Have you ever come across a ${type.replace(/s$/, '')} that you wanted to watch offline or share with friends on other platforms? Whether it's for creative inspiration, educational purposes, or simply keeping a personal gallery of your favorite moments, an ${type} downloader is an essential tool. SavClip allows you to bypass restrictions and save ${type} in their original high-definition resolution without any watermarks or quality loss.`
    },
    {
      title: `Key Features of SavClip ${capitalizedType} Saver`,
      content: `SavClip is engineered for excellence. Our tool offers several industry-leading features that set it apart from the competition. First, we provide **original HD quality** – if the creator uploaded it in 4K, you'll get it in 4K. Second, our service is **fast and secure**, utilizing advanced encryption to ensure your downloads are private. Third, there is **no login required**, which means you never have to share your sensitive Instagram credentials with us. Lastly, SavClip is **cross-platform compatible**, working seamlessly on Android, iOS, Windows, and macOS.`
    },
    {
      title: `How to ${keyword} in 3 Simple Steps`,
      content: `Downloading content shouldn't be complicated. With SavClip, you can save any ${type} in seconds. Step 1: Open Instagram and locate the ${type.replace(/s$/, '')} you wish to save. Tap the three dots and select 'Copy Link'. Step 2: Navigate to SavClip.com and paste the URL into our search box. Step 3: Click the 'Download' button and choose your preferred resolution. Your file will be saved directly to your device's gallery instantly.`
    },
    {
      title: `Is it Safe to ${keyword}?`,
      content: `Security is our top priority. Unlike many other tools that require you to install suspicious APKs or log in with your social media accounts, SavClip operates entirely in your web browser. This web-based approach ensures that your device remains protected from malware. Furthermore, we do not track your download history or store personal data, making us the safest choice for ${keyword.toLowerCase()} enthusiasts worldwide.`
    },
    {
      title: `The Future of Instagram Content Saving`,
      content: `As Instagram continues to evolve with new formats like Reels and expanded Stories, SavClip is always one step ahead. We constantly update our algorithms to ensure 100% compatibility with the latest Instagram updates. Our mission is to provide the most user-friendly and powerful ${capitalizedType} downloader on the internet. Join millions of satisfied users and start building your offline library with SavClip today.`
    }
  ];
};

const generateIntro = (h1, type) => {
  return `You can download ${type} with just one click. The tool is fast, secure, and completely free to use without any registration. Just paste the ${type.replace(/s$/, '')} URL above to save Instagram ${type} directly to your gallery in seconds.`;
};

const results = {};

for (let i = 0; i < h1s.length; i++) {
  const h1 = h1s[i].trim();
  const type = getType(h1);
  const slug = h1.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '_');
  
  results[slug] = {
    title: h1,
    subtitle: `Download ${type.charAt(0).toUpperCase() + type.slice(1)} Without Watermark (HD)`,
    intro_seo: generateIntro(h1, type),
    article_content: generateLongArticle(h1, type),
    seo: {
      title: `${h1} – Download ${type.charAt(0).toUpperCase() + type.slice(1)} HD | SavClip`,
      desc: `Download ${h1.toLowerCase()} in HD quality without watermark. Fast, free and secure downloader online with no login required.`
    }
  };
}

console.log(JSON.stringify(results, null, 2));
