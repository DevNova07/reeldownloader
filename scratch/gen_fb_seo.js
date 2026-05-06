
const fs = require('fs');

const rawH1s = `
Facebook Downloader
Facebook Reels Downloader
Facebook Story Downloader
Facebook Audio Downloader
FB Video Download
Facebook Video Downloader
Facebook Video Download
Download Facebook Video
Facebook Download Video
Facebook Video Download HD
Facebook Video Without Watermark
Facebook Reels Download
FB Video Downloader Online
Facebook Video Saver
How to Download Facebook Videos
Download Facebook Video Online
Save Facebook Video to Phone
Facebook Short Video Downloader
Private Story Downloader
Facebook Viral Reels
Trending Reels Downloader
Funny Videos Downloader
Facebook Photo Downloader
Facebook Profile Picture Viewer
Facebook Story Downloader
Facebook Downloader No Login
Private Video Downloader
Facebook Video Downloader APK
Facebook Link Downloader
Facebook Videos Without Watermark
Facebook Video Using Link
Facebook Downloader India
Facebook Reels No Watermark
Private Video Downloader HD
Facebook Downloader Mexico
Facebook Downloader Germany
Facebook Downloader France
Facebook Downloader Italy
Facebook Downloader Spain
Facebook Downloader Turkey
Facebook Downloader Russia
Facebook Downloader Japan
Facebook Downloader Korea
Facebook Downloader Vietnam
Facebook Downloader Thailand
Facebook Downloader Philippines
Facebook Downloader Egypt
Facebook Downloader Nigeria
Facebook Downloader South Africa
Facebook Downloader Canada
Facebook Downloader Australia
Facebook 4K Video Downloader
High Speed Facebook Downloader
No Ads Facebook Downloader
Unlimited Facebook Downloader
Safe Facebook Downloader
HD Audio Downloader
Facebook MP3 Converter
Facebook MP4 Converter
Facebook Gallery Saver
Facebook Story Download
FB Video Saver
Save FB Reels
Facebook Reels Downloader
`;

const rawSubs = `
Download Facebook Videos Without Watermark (HD)
Download Reels Without Watermark (HD)
Save Stories Online in HD Quality
Download Facebook Music & Audio MP3
Download Facebook Videos in HD Quality
Save Videos Online Fast & Free
Download Videos Without Watermark
Save Facebook Videos in HD
Download Videos Online Free
Download HD Facebook Videos Free
Save Videos in HD Quality
Download Reels Online Without Watermark
Download Videos Fast & Free
Save Facebook Videos Instantly
Learn to Save Videos Easily
Free Online Video Downloader
Download Videos on Mobile Fast
Download Short Videos in HD
Download Facebook Private Stories
Download Viral Reels in HD
Save Trending Facebook Reels
Download Funny Facebook Videos
Download Photos in HD Quality
View & Save Profile Pictures HD
Download Stories Without Login
Save Videos Without Account
Download Private Facebook Videos
Download Videos APK HD
Download Videos Using Links
Download HD Videos Online
Download Videos from URL Fast
Download Videos & Reels HD
Save Reels in HD Quality
Download Private Videos Online
Save Videos Fast & Free
Download Videos in HD
Save Facebook Videos Online
Download Videos Without Watermark
Save Reels & Videos HD
Download Videos Online Free
Save Facebook Content HD
Download Videos & Reels HD
Save Videos Without Login
Download Videos in HD Quality
Save Facebook Videos Fast
Download Videos Online HD
Save Reels Without Watermark
Download HD Videos Free
Save Facebook Videos HD
Download Videos Fast & Secure
Save Videos Online in HD
Download Ultra HD Videos
Download Videos at High Speed
Download Videos Without Ads
Unlimited Video Downloads Free
Secure Video Downloads Online
Download Facebook Audio MP3
Convert Videos to MP3 Online
Convert Videos to MP4 HD
Save Photos & Gallery Posts
Save Stories Online Free
Save Facebook Videos Fast
Download Facebook Reels HD
Download Reels Without Watermark
`;

const h1s = rawH1s.trim().split('\n');
const subs = rawSubs.trim().split('\n');

const getType = (h1) => {
  const h = h1.toLowerCase();
  if (h.includes('reel')) return 'reels';
  if (h.includes('story')) return 'stories';
  if (h.includes('video')) return 'videos';
  if (h.includes('photo') || h.includes('image') || h.includes('picture') || h.includes('profile')) return 'photos';
  if (h.includes('audio') || h.includes('mp3')) return 'audio';
  if (h.includes('private')) return 'private videos';
  return 'content';
};

const generateLongArticle = (h1, type) => {
  const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);
  const keyword = h1;
  
  return [
    {
      title: `The Ultimate Guide to ${keyword}`,
      content: `Welcome to the most comprehensive guide on how to ${keyword.toLowerCase()}. Facebook remains one of the world's largest repositories of video content, from viral reels to life-changing stories. However, saving these moments for offline viewing isn't always straightforward. SavClip provides the ultimate solution for downloading Facebook ${type} with maximum ease and zero quality loss.`
    },
    {
      title: `Why Use a Facebook ${capitalizedType} Downloader?`,
      content: `Whether you want to save a tutorial for offline study, keep a copy of a live stream, or archive a memorable story from a friend, a dedicated Facebook downloader is essential. SavClip allows you to download ${type} in their original high-definition resolution. Our tool is optimized to handle different Facebook formats, ensuring you get the best possible experience without any annoying watermarks.`
    },
    {
      title: `Key Features of SavClip FB Saver`,
      content: `SavClip is built to be the best. Our tool offers several high-end features: First, we support **full HD and 4K downloads**, giving you the highest quality available. Second, our servers are optimized for **lightning-fast speed**, so you don't have to wait. Third, your **privacy is guaranteed** as we don't require any login or personal information. Lastly, our interface is **100% mobile-friendly**, working perfectly on iPhones, Android devices, and desktops alike.`
    },
    {
      title: `How to ${keyword} in Seconds`,
      content: `Saving your favorite Facebook content is incredibly simple with SavClip. Step 1: Open Facebook and find the ${type.replace(/s$/, '')} you want to save. Click the 'Share' button and choose 'Copy Link'. Step 2: Open SavClip.com in your browser and paste the link into the search field. Step 3: Hit the 'Download' button and choose your preferred quality. Your ${type.replace(/s$/, '')} will be saved to your device's storage immediately.`
    },
    {
      title: `Is SavClip Safe for Facebook Downloads?`,
      content: `Absolutely. We understand that security is a major concern. SavClip is a web-based tool, meaning you don't need to download any suspicious software or extensions. We use SSL encryption to protect your connection and we never store your data or download history. You can use our tool with complete peace of mind to ${keyword.toLowerCase()} anytime, anywhere.`
    },
    {
      title: `The Future of Facebook Content Saving`,
      content: `As Facebook introduces more features like Watch and improved Reels, SavClip's developers are constantly working to keep our downloader updated. We aim to remain the #1 choice for Facebook users globally. building a permanent library of your favorite videos has never been easier. Join millions of users who trust SavClip for all their Facebook downloading needs.`
    }
  ];
};

const generateIntro = (h1, type) => {
  return `You can download Facebook ${type} with just one click. The tool is fast, secure, and completely free to use without any registration. Just paste the Facebook ${type.replace(/s$/, '')} URL above to save it directly to your gallery in seconds.`;
};

const results = {};

for (let i = 0; i < h1s.length; i++) {
  const h1 = h1s[i].trim().toLowerCase(); // Convert to lowercase as requested
  const sub = subs[i].trim();
  const type = getType(h1);
  const slug = h1.replace(/[^\w ]+/g, '').replace(/ +/g, '_');
  
  results[slug] = {
    title: h1,
    subtitle: sub,
    intro_seo: generateIntro(h1, type),
    article_content: generateLongArticle(h1, type),
    seo: {
      title: `${h1} – Download Facebook ${type.charAt(0).toUpperCase() + type.slice(1)} HD | SavClip`,
      desc: `Download ${h1.toLowerCase()} in HD quality without watermark. Fast, free and secure Facebook downloader online with no login required.`
    }
  };
}

console.log(JSON.stringify(results, null, 2));
