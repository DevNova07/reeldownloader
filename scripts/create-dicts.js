/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '../src/dictionaries');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const baseDict = {
  en: {
    seo: {
      title: "SavClip - Best Instagram Video & Reels Downloader",
      description: "Download Instagram Reels, Stories, Posts, and Music easily with SavClip. Fast, free, and secure.",
      keywords: "instagram downloader, reels download, story downloader, download instagram post, instagram music downloader"
    },
    search: { 
      placeholder: "Paste link here...", 
      button: "DOWNLOAD",
      error_empty: "Please paste a link",
      error_invalid: "Invalid URL format"
    },
    tabs: { 
      video: "Video", 
      reels: "Reels", 
      story: "Stories", 
      audio: "Audio", 
      photo: "Photo", 
      music: "Music", 
      shorts: "Shorts", 
      movies: "Movies", 
      gif: "GIFs" 
    },
    features: {
      title: "Why Choose Our Downloader?",
      items: [
        { title: "Ultra Fast", desc: "Get your content in seconds with our high-speed servers." },
        { title: "Safe & Private", desc: "Your downloads are anonymous and secure." },
        { title: "HD Quality", desc: "Original highest resolution possible up to 4K." }
      ]
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        { q: "Is it free to use?", a: "Yes, SavClip is completely free with no hidden charges." },
        { q: "Do I need to login?", a: "No, you don't need to provide your credentials." },
        { q: "Can I download private stories?", a: "No, we only support public accounts." }
      ]
    },
    common: { 
      loading: "Processing Media...", 
      analyzing: "Analyzing Link...",
      recent: "Recent Searches", 
      clear: "Clear History",
      go_home: "Go back Home",
      under_development: "Our specialized tool is currently under development. Stay tuned!"
    },
    trust: {
      safe: "Safe & Private",
      fast: "Ultra Fast",
      watermark: "No Watermark"
    },
    banner: {
      badge: "Coming Soon",
      title: "Our Google Chrome Extension",
      desc: "Download any video or story with just one click directly from your browser. Stay tuned for the launch!"
    },
    categories: {
      insta: "Instagram",
      fb: "Facebook",
      snap: "Snapchat",
      tele: "Telegram",
      tiktok: "TikTok",
      yt: "YouTube",
      tw: "Twitter",
      blog: "Blog"
    },
    navbar: { services: "Services", home: "Home", language: "Language" },
    trending: { label: "Trending Now" },
    guide: {
      title: "How to Download {platform} Videos?",
      subtitle: "Follow these three simple steps to save any {platform} media in HD.",
      steps: [
        { title: "Copy Link", desc: "Open the app and copy the URL of the content you want to save." },
        { title: "Paste & Download", desc: "Paste the link into the search bar above and click 'Download'." },
        { title: "Save & Enjoy", desc: "Choose your preferred quality and the file will be saved directly." }
      ]
    },
    platforms: {
      instagram: { 
        title: "Instagram Video Download", 
        subtitle: "Download Instagram Reels, Stories, and Videos in HD.",
        reels: {
          title: "Instagram Reels Download",
          subtitle: "Download Instagram Reels in original HD quality without any limits.",
          howTo: {
            name: "How to Download Instagram Reels",
            description: "Download any Instagram Reel in HD quality with audio using SavClip.",
            steps: [
              "Open Instagram and find the Reel you want to download.",
              "Copy the Reel URL.",
              "Paste the link into the search box on SavClip.",
              "Click 'Download' and choose the quality to save the video."
            ]
          },
          seo: {
            title: "Why Use Our Instagram Reels Downloader?",
            desc: "Our Instagram Reels Downloader is built to provide the fastest way to save viral reels. Whether it's for offline archiving or sharing with friends, our tool makes it easy to get the highest quality video with audio included."
          }
        },
        story: {
          title: "Instagram Story Download",
          subtitle: "Download Instagram Stories and Highlights anonymously in HD.",
          howTo: {
            name: "How to Download Instagram Stories",
            description: "Save Instagram stories and highlights to your device for free.",
            steps: [
              "Open the Instagram story you want to save.",
              "Copy the profile link or the specific story link.",
              "Paste it into our story downloader above.",
              "Click 'Download' to save the story anonymously."
            ]
          },
          seo: {
            title: "Anonymous Instagram Story Downloader",
            desc: "View and download Instagram stories without the user knowing. Our tool is completely private and secure."
          }
        },
        howTo: {
          name: "How to Download Instagram Media",
          description: "Follow these simple steps to save videos, reels and stories from Instagram.",
          steps: [
            "Open Instagram and find the content you want to save.",
            "Copy the link to the post or reel.",
            "Paste the link into the search box on SavClip.",
            "Click 'Download' and the file will be saved to your device."
          ]
        },
        seo: {
          title: "Why Use Our Video Downloader?",
          desc: "Our Instagram Video Downloader is designed to provide the fastest and most reliable experience. Whether you want to save a clip or a tutorial, our tool makes it effortless.",
          features: [
            { title: "Fast & Unlimited", desc: "No queues or waiting times. Download as many as you want." },
            { title: "Any Device", desc: "Works perfectly on iPhone, Android, PC, and Mac." }
          ]
        }
      },
      facebook: { 
        title: "Facebook Video Download", 
        subtitle: "Download any Facebook video or reel in HD quality.",
        reels: {
          title: "Facebook Reels Download",
          subtitle: "Save any Facebook Reel in high resolution directly to your device.",
          howTo: {
            name: "How to Download Facebook Reels",
            description: "Follow these simple steps to save any Facebook Reel in HD.",
            steps: [
              "Open Facebook and find the Reel you want to save.",
              "Click on the 'Share' button and then 'Copy Link'.",
              "Paste the link into the search box on SavClip.",
              "Click 'Download' and the Reel will be saved to your device."
            ]
          },
          seo: {
            title: "Why Use Our Facebook Reels Downloader?",
            desc: "Our Facebook Reels Downloader is optimized to extract the highest bitrate video. Save viral reels for offline viewing without any quality loss."
          }
        },
        story: {
          title: "Facebook Story Download",
          subtitle: "Download Facebook stories and highlights anonymously in HD.",
          howTo: {
            name: "How to Download Facebook Stories",
            description: "Save Facebook stories and highlights to your device easily.",
            steps: [
              "Open the Facebook story you want to save.",
              "Copy the link to the story or the profile link.",
              "Paste it into our Facebook story downloader above.",
              "Click 'Download' to save the story content."
            ]
          },
          seo: {
            title: "Anonymous Facebook Story Downloader",
            desc: "Download Facebook stories privately. Our tool ensures you can save media without the uploader knowing."
          }
        },
        howTo: {
          name: "How to Download Facebook Videos & Reels",
          description: "Download high-quality Facebook videos and reels for free.",
          steps: [
            "Open Facebook and find the video or reel you want to save.",
            "Click on 'Share' and then 'Copy Link'.",
            "Paste the link into the search box on SavClip.",
            "Click 'Download' and the video will be saved to your device."
          ]
        },
        seo: {
          title: "Why Use Our Facebook Video Downloader?",
          desc: "Our Facebook Video Downloader allows you to save any video, reel, or story from Facebook in original high resolution. Perfect for saving offline content.",
          features: [
            { title: "HD Resolution", desc: "Download videos in 1080p, 2K, or even 4K if available." },
            { title: "No Login", desc: "You don't need to share your Facebook credentials to use our tool." }
          ]
        }
      },
      tiktok: { 
        title: "TikTok Video Download", 
        subtitle: "Download TikTok videos without watermark in high quality.",
        music: {
          title: "TikTok MP3 Download",
          subtitle: "Extract and download high-quality audio from any TikTok video.",
          howTo: {
            name: "How to Download TikTok Audio",
            description: "Save TikTok background music or sounds as MP3 files.",
            steps: [
              "Copy the link of the TikTok video containing the audio.",
              "Paste it into our TikTok music downloader above.",
              "Select the MP3 format for extraction.",
              "Download the high-bitrate audio file instantly."
            ]
          },
          seo: {
            title: "Best TikTok to MP3 Converter",
            desc: "Convert any TikTok video to high-quality audio. Perfect for creators looking for background music or viral sounds."
          }
        },
        story: {
          title: "TikTok Story Download",
          subtitle: "Download any TikTok story video without watermarks.",
          howTo: {
            name: "How to Download TikTok Stories",
            description: "Download TikTok stories in original quality easily.",
            steps: [
              "Open TikTok and find the story you want to save.",
              "Copy the story link.",
              "Paste it into our TikTok story downloader search box.",
              "Click 'Download' and save the video to your device."
            ]
          },
          seo: {
            title: "Safe TikTok Story Downloader",
            desc: "Save TikTok stories privately. Our tool ensures you can download media without watermarks."
          }
        },
        howTo: {
          name: "How to Download TikTok Videos",
          description: "Save TikTok videos without watermark for free.",
          steps: [
            "Open TikTok and find the video you want to download.",
            "Copy the link to the TikTok video.",
            "Paste it into the search box above.",
            "Click 'Download' to save the video without watermark."
          ]
        },
        seo: {
          title: "The Best TikTok Downloader",
          desc: "Our tool extracts the original video file without any watermark. It is the perfect tool for content creators and viewers alike.",
          features: [
            { title: "No Watermark", desc: "Get clean videos without any logos." },
            { title: "HD Processing", desc: "Original file quality is preserved during the download." }
          ]
        }
      },
      youtube: { 
        title: "YouTube Video Download", 
        subtitle: "Save YouTube videos, shorts and music for offline viewing.",
        shorts: {
          title: "YouTube Shorts Download",
          subtitle: "Download YouTube Shorts in high quality safely and quickly.",
          howTo: {
            name: "How to Download YouTube Shorts",
            description: "Save your favorite YouTube Shorts to your gallery.",
            steps: [
              "Copy the URL of the YouTube Short.",
              "Paste the link into the Shorts downloader above.",
              "Click 'Download' to process the video.",
              "Save the MP4 file to your device."
            ]
          },
          seo: {
            title: "Fast YouTube Shorts Downloader",
            desc: "Our dedicated Shorts downloader ensures you get the full resolution of every Short you save."
          }
        },
        music: {
          title: "YouTube Music Download",
          subtitle: "Download YouTube Music and audio in high-quality MP3 format.",
          howTo: {
            name: "How to Download YouTube Music",
            description: "Convert YouTube videos to high-quality audio files.",
            steps: [
              "Find the YouTube video or music you want to extract.",
              "Copy the video link.",
              "Paste it into our music downloader box.",
              "Choose the MP3 bitrate and click 'Download'."
            ]
          },
          seo: {
            title: "High-Quality YouTube to MP3",
            desc: "Extract crystal clear audio from any YouTube video. We support 320kbps for the best listening experience."
          }
        },
        movies: {
          title: "YouTube Movie Download",
          subtitle: "Download full-length public movies and documentaries from YouTube.",
          howTo: {
            name: "How to Download YouTube Movies",
            description: "Save long-form video content and movies for offline viewing.",
            steps: [
              "Locate the public movie or documentary on YouTube.",
              "Copy the video link from the browser.",
              "Paste the link into our movie downloader search bar.",
              "Select your preferred resolution and start the download."
            ]
          },
          seo: {
            title: "Free YouTube Movie Downloader",
            desc: "Save full documentaries and public domain movies from YouTube in 1080p or 4K. Perfect for long flights or offline travel."
          }
        },
        howTo: {
          name: "How to Download YouTube Videos & Shorts",
          description: "Download YouTube content in various formats including MP4 and MP3.",
          steps: [
            "Open YouTube and copy the link to the video or shorts.",
            "Paste the link into our downloader search bar.",
            "Select your preferred quality and format.",
            "Click 'Download' to save it to your local storage."
          ]
        },
        seo: {
          title: "Pro YouTube Downloader",
          desc: "Save your favorite YouTube videos and shorts in high quality. We support MP4 and high-bitrate MP3 for music lovers.",
          features: [
            { title: "Shorts Supported", desc: "Dedicated support for downloading YouTube Shorts safely." },
            { title: "Multiple Formats", desc: "Download in 720p, 1080p, and even 4K where available." }
          ]
        }
      },
      twitter: { 
        title: "Twitter / X Video Download", 
        subtitle: "Download videos and GIFs from Twitter (X) easily.",
        gif: {
          title: "Twitter GIF Download",
          subtitle: "Convert and save Twitter (X) GIFs as high-quality MP4 files.",
          howTo: {
            name: "How to Save Twitter GIFs",
            description: "Download GIFs from X / Twitter in usable video format.",
            steps: [
              "Copy the link to the Tweet containing the GIF.",
              "Paste it into our Twitter GIF downloader.",
              "Click 'Download' to convert the GIF to MP4.",
              "Save the file to your device."
            ]
          },
          seo: {
            title: "Twitter GIF to MP4 Converter",
            desc: "Twitter GIFs are actually small looped videos. Our tool allows you to save them as MP4 files for easy sharing."
          }
        },
        howTo: {
          name: "How to Download Twitter (X) Media",
          description: "Download videos and GIFs from Twitter in high quality.",
          steps: [
            "Find the Tweet containing the video or GIF you want to save.",
            "Copy the Tweet link (URL).",
            "Paste the link into the search box on SavClip.",
            "Click 'Download' to fetch and save the media."
          ]
        },
        seo: {
          title: "Fast Twitter Downloader",
          desc: "SavClip is the fastest way to save high-quality videos and GIFs from X (formerly Twitter). No registration required.",
          features: [
            { title: "GIF Support", desc: "Convert and download Twitter GIFs as MP4 files easily." },
            { title: "Safe & Private", desc: "Your downloads are anonymous and secure." }
          ]
        }
      },
      snapchat: { 
        title: "Snapchat Video Download", 
        subtitle: "Save Snapchat spotlights and stories in original quality.",
        howTo: {
          name: "How to Download Snapchat Stories",
          description: "Download Snapchat Spotlight and Story videos in original quality.",
          steps: [
            "Open Snapchat and locate the Spotlight or Story.",
            "Tap the 'Share' icon and copy the link.",
            "Enter the link into our Snapchat downloader above.",
            "Your video will be fetched and ready to save instantly."
          ]
        },
        seo: {
          title: "Premium Snapchat Downloader",
          desc: "Our tool ensures you get the highest resolution possible for Snapchat Spotlights. No more blurry screen recordings.",
          features: [
            { title: "Original Quality", desc: "No compression - download the source media directly." },
            { title: "Spotlight & Stories", desc: "Save any public video content from Snapchat effortlessly." }
          ]
        }
      },
      telegram: { 
        title: "Telegram Media Download", 
        subtitle: "Download videos and media from Telegram channels and groups.",
        howTo: {
          name: "How to Download Telegram Files",
          description: "Save media from Telegram channels and private groups easily.",
          steps: [
            "Right-click on the media or select 'Copy Link' in Telegram.",
            "Paste the Telegram message link into the box above.",
            "Our server will process the link and provide a direct download.",
            "Save the file directly to your device gallery."
          ]
        },
        seo: {
          title: "Secure Telegram Downloader",
          desc: "Download Telegram videos and files without needing to join channels or use specific bots. Fast, secure, and permanent.",
          features: [
            { title: "No Bots Required", desc: "Download directly via your browser instead of slow bots." },
            { title: "Batch Processing", desc: "Our high-bandwidth servers handle large files comfortably." }
          ]
        }
      }
    }
  }
};

const translations = {
  hi: {
    search: { 
      placeholder: "लिंक यहाँ पेस्ट करें...", 
      button: "डाउनलोड",
      error_empty: "कृपया एक लिंक पेस्ट करें",
      error_invalid: "अमान्य URL प्रारूप"
    },
    tabs: { video: "वीडियो", reels: "रील्स", story: "स्टोरी", audio: "ऑडियो", photo: "फोटो", music: "म्यूज़िक", shorts: "शॉर्ट्स", movies: "फिल्में", gif: "GIF" },
    features: { title: "हमारा डाउनलोडर ही क्यों चुनें?", items: [{ title: "सुपर-फ़ास्ट", desc: "हमारे तेज़ सर्वर से कुछ ही सेकंड में कंटेंट सेव करें।" }, { title: "सुरक्षित और निजी", desc: "आपकी डाउनलोड पूरी तरह से अनाम और सुरक्षित है।" }, { title: "HD क्वालिटी", desc: "सबसे अच्छी 4K रेजोल्यूशन में मीडिया पाएँ।" }] },
    faq: { title: "अक्सर पूछे जाने वाले प्रश्न", items: [{ q: "क्या यह मुफ़्त है?", a: "हाँ, SavClip पूरी तरह से मुफ़्त है और कोई छुपा हुआ चार्ज नहीं है।" }, { q: "क्या मुझे लॉगिन करना होगा?", a: "नहीं, आपको अपनी आईडी लॉगिन करने की ज़रूरत नहीं है।" }, { q: "क्या मैं प्राइवेट स्टोरी डाउनलोड कर सकता हूँ?", a: "नहीं, हम सिर्फ पब्लिक अकाउंट का कंटेंट सपोर्ट करते हैं।" }] },
    common: { 
      loading: "मीडिया प्रोसेस हो रहा है...", 
      analyzing: "लिंक का विश्लेषण हो रहा है...",
      recent: "हाल की खोजें", 
      clear: "इतिहास मिटाएँ",
      go_home: "होम पेज पर जाएं",
      under_development: "हमारा विशेष टूल अभी विकास के अधीन है। बने रहें!"
    },
    navbar: { services: "सेवाएँ", home: "होम", language: "भाषा" },
    trending: { label: "अभी ट्रेंडिंग में" },
    categories: {
      insta: "इंस्टाग्राम",
      fb: "फेसबुक",
      snap: "स्नैपचैट",
      tele: "टेलीग्राम",
      tiktok: "टिकटॉक",
      yt: "यूट्यूब",
      tw: "ट्विटर",
      blog: "ब्लॉग"
    },
    platforms: { 
      instagram: { 
        title: "इंस्टाग्राम वीडियो डाउनलोड", 
        subtitle: "इंस्टाग्राम रील्स, स्टोरी और वीडियो HD में डाउनलोड करें।",
        reels: {
          title: "इंस्टाग्राम रील्स डाउनलोड",
          subtitle: "इंस्टाग्राम रील्स को बिना किसी सीमा के मूल HD क्वालिटी में डाउनलोड करें।",
          howTo: {
            name: "इंस्टाग्राम रील्स कैसे डाउनलोड करें",
            description: "SavClip का उपयोग करके ऑडियो के साथ किसी भी इंस्टाग्राम रील को HD क्वालिटी में डाउनलोड करें।",
            steps: [
              "इंस्टाग्राम खोलें और वह रील ढूंढें जिसे आप डाउनलोड करना चाहते हैं।",
              "रील URL कॉपी करें।",
              "SavClip पर सर्च बॉक्स में लिंक पेस्ट करें।",
              "डाउनलोड पर क्लिक करें और वीडियो सेव करने के लिए क्वालिटी चुनें।"
            ]
          },
          seo: {
            title: "हमारा इंस्टाग्राम रील्स डाउनलोडर क्यों चुनें?",
            desc: "हमारा इंस्टाग्राम रील्स डाउनलोडर वायरल रील्स को सेव करने का सबसे तेज़ तरीका प्रदान करने के लिए बनाया गया है।"
          }
        },
        story: {
          title: "इंस्टाग्राम स्टोरी डाउनलोड",
          subtitle: "इंस्टाग्राम स्टोरी और हाइलाइट्स को गुमनाम रूप से HD में डाउनलोड करें।",
          howTo: {
            name: "इंस्टाग्राम स्टोरी कैसे डाउनलोड करें",
            description: "इंस्टाग्राम स्टोरी और हाइलाइट्स को मुफ्त में अपने डिवाइस पर सेव करें।",
            steps: [
              "वह इंस्टाग्राम स्टोरी खोलें जिसे आप सेव करना चाहते हैं।",
              "प्रोफ़ाइल लिंक या विशिष्ट स्टोरी लिंक कॉपी करें।",
              "इसे ऊपर हमारे स्टोरी डाउनलोडर में पेस्ट करें।",
              "स्टोरी को गुमनाम रूप से सेव करने के लिए 'डाउनलोड' पर क्लिक करें।"
            ]
          },
          seo: {
            title: "बेनाम इंस्टाग्राम स्टोरी डाउनलोडर",
            desc: "यूज़र को पता चले बिना इंस्टाग्राम स्टोरीज़ देखें और डाउनलोड करें। हमारा टूल पूरी तरह से निजी और सुरक्षित है।"
          }
        },
        howTo: {
          name: "इंस्टाग्राम मीडिया कैसे डाउनलोड करें",
          description: "इंस्टाग्राम से वीडियो, रील्स और स्टोरीज़ को सेव करने के लिए इन आसान चरणों का पालन करें।",
          steps: [
            "इंस्टाग्राम खोलें और वह कंटेंट ढूंढें जिसे आप सेव करना चाहते हैं।",
            "पोस्ट या रील का लिंक कॉपी करें।",
            "SavClip पर सर्च बॉक्स में लिंक पेस्ट करें।",
            "डाउनलोड पर क्लिक करें और फ़ाइल आपके डिवाइस पर सेव हो जाएगी।"
          ]
        },
        seo: {
          title: "हमारा वीडियो डाउनलोडर क्यों इस्तेमाल करें?",
          desc: "हमारा इंस्टाग्राम वीडियो डाउनलोडर सबसे तेज़ और सबसे विश्वसनीय अनुभव प्रदान करने के लिए डिज़ाइन किया गया है। चाहे आप क्लिप सेव करना चाहते हों या ट्यूटोरियल, हमारा टूल इसे आसान बनाता है।",
          features: [
            { title: "तेज़ और असीमित", desc: "कोई कतार या प्रतीक्षा समय नहीं। जितना चाहें उतना डाउनलोड करें।" },
            { title: "किसी भी डिवाइस पर", desc: "iPhone, Android, PC और Mac पर पूरी तरह से काम करता है।" }
          ]
        }
      }, 
      facebook: { 
        title: "फेसबुक वीडियो डाउनलोड", 
        subtitle: "कोई भी फेसबुक वीडियो या रील HD क्वालिटी में डाउनलोड करें।",
        reels: {
          title: "फेसबुक रील्स डाउनलोड",
          subtitle: "किसी भी फेसबुक रील को सीधे अपने डिवाइस पर उच्च रिज़ॉल्यूशन में सेव करें।",
          howTo: {
            name: "फेसबुक रील्स कैसे डाउनलोड करें",
            description: "किसी भी फेसबुक रील को HD में सेव करने के लिए इन आसान चरणों का पालन करें।",
            steps: [
              "फेसबुक खोलें और वह रील ढूंढें जिसे आप सेव करना चाहते हैं।",
              "शेयर बटन पर क्लिक करें और फिर 'लिंक कॉपी करें' चुनें।",
              "SavClip पर सर्च बॉक्स में लिंक पेस्ट करें।",
              "डाउनलोड पर क्लिक करें और रील आपके डिवाइस पर सेव हो जाएगी।"
            ]
          },
          seo: {
            title: "हमारा फेसबुक रील्स डाउनलोडर क्यों चुनें?",
            desc: "हमारा फेसबुक रील्स डाउनलोडर उच्चतम बिटरेट वीडियो निकालने के लिए अनुकूलित है।"
          }
        },
        story: {
          title: "फेसबुक स्टोरी डाउनलोड",
          subtitle: "फेसबुक स्टोरी और हाइलाइट्स को गुमनाम रूप से HD में डाउनलोड करें।",
          howTo: {
            name: "फेसबुक स्टोरी कैसे डाउनलोड करें",
            description: "फेसबुक स्टोरी और हाइलाइट्स को आसानी से अपने डिवाइस पर सेव करें।",
            steps: [
              "वह फेसबुक स्टोरी खोलें जिसे आप सेव करना चाहते हैं।",
              "स्टोरी का लिंक या प्रोफाइल लिंक कॉपी करें।",
              "इसे ऊपर हमारे फेसबुक स्टोरी डाउनलोडर में पेस्ट करें।",
              "स्टोरी कंटेंट सेव करने के लिए 'डाउनलोड' पर क्लिक करें।"
            ]
          },
          seo: {
            title: "बेनाम फेसबुक स्टोरी डाउनलोडर",
            desc: "फेसबुक स्टोरीज़ को निजी तौर पर डाउनलोड करें। हमारा टूल सुनिश्चित करता है कि आप अपलोडर को पता चले बिना मीडिया सेव कर सकें।"
          }
        },
        howTo: {
          name: "फेसबुक वीडियो और रील्स कैसे डाउनलोड करें",
          description: "हाई-क्वालिटी वाले फेसबुक वीडियो और रील्स मुफ्त में डाउनलोड करें।",
          steps: [
            "फेसबुक खोलें और वह वीडियो या रील ढूंढें जिसे आप सेव करना चाहते हैं।",
            "शेयर पर क्लिक करें और फिर लिंक कॉपी करें।",
            "SavClip पर सर्च बॉक्स में लिंक पेस्ट करें।",
            "डाउनलोड पर क्लिक करें और वीडियो आपके डिवाइस पर सेव हो जाएगा।"
          ]
        },
        seo: {
          title: "हमारा फेसबुक वीडियो डाउनलोडर क्यों इस्तेमाल करें?",
          desc: "हमारा फेसबुक वीडियो डाउनलोडर आपको फेसबुक से किसी भी वीडियो, रील या स्टोरी को मूल रिज़ॉल्यूशन में सेव करने की अनुमति देता है।",
          features: [
            { title: "HD रिज़ॉल्यूशन", desc: "1080p, 2K, या उपलब्ध होने पर 4K में वीडियो डाउनलोड करें।" },
            { title: "बिना लॉगिन", desc: "आपको हमारे टूल का उपयोग करने के लिए अपना फेसबुक लॉगिन साझा करने की आवश्यकता नहीं है।" }
          ]
        }
      }, 
      tiktok: { title: "टिकटॉक वीडियो डाउनलोड", subtitle: "बिना वॉटरमार्क के हाई क्वालिटी में टिकटॉक वीडियो डाउनलोड करें।" }, 
      youtube: { title: "यूट्यूब वीडियो डाउनलोड", subtitle: "यूट्यूब वीडियो, शॉर्ट्स और म्यूज़िक ऑफलाइन देखने के लिए सेव करें।" }, 
      twitter: { title: "ट्विटर / X वीडियो डाउनलोड", subtitle: "ट्विटर (X) से वीडियो और GIF आसानी से डाउनलोड करें।" }, 
      snapchat: { title: "स्नैपचैट वीडियो डाउनलोड", subtitle: "स्नैपचैट स्पॉटलाइट और स्टोरी ओरिजिनल क्वालिटी में सेव करें।" }, 
      telegram: { title: "टेलीग्राम वीडियो डाउनलोड", subtitle: "टेलीग्राम चैनल और ग्रुप से वीडियो और मीडिया डाउनलोड करें।" } 
    }
  },
  es: {
    search: { placeholder: "Pega el enlace aquí...", button: "DESCARGAR" },
    trending: { label: "Tendencias ahora" },
    tabs: { video: "Video", reels: "Reels", story: "Historias", audio: "Audio", photo: "Foto", music: "Música", shorts: "Shorts" },
    features: { title: "¿Por qué elegir nuestro descargador?", items: [{ title: "Ultra Rápido", desc: "Obtén tus archivos en segundos con nuestros servidores." }, { title: "Seguro y Privado", desc: "Tus descargas son anónimas y seguras." }, { title: "Calidad HD", desc: "Resolución original máxima hasta 4K." }] },
    platforms: { instagram: { title: "Descargar Videos de Instagram", subtitle: "Descarga Reels, Historias y Videos de Instagram en HD." }, facebook: { title: "Descargar Videos de Facebook", subtitle: "Descarga cualquier video o reel de Facebook en calidad HD." }, tiktok: { title: "Descargar Videos de TikTok", subtitle: "Descarga videos de TikTok sin marca de agua en alta calidad." }, youtube: { title: "Descargar Videos de YouTube", subtitle: "Guarda videos, shorts y música de YouTube para verlos sin conexión." }, twitter: { title: "Descargar Videos de Twitter / X", subtitle: "Descarga videos y GIFs de Twitter (X) fácilmente." }, snapchat: { title: "Descargar Videos de Snapchat", subtitle: "Guarda spotlights e historias de Snapchat en calidad original." }, telegram: { title: "Descargar Videos de Telegram", subtitle: "Descarga videos y medios de canales y grupos de Telegram." } }
  },
  ar: {
    search: { placeholder: "الصق الرابط هنا...", button: "تحميل" },
    trending: { label: "الرائج الآن" },
    tabs: { video: "فيديو", reels: "ريلز", story: "قصص", audio: "صوت", photo: "صورة", music: "موسيقى", shorts: "شورتس" },
    platforms: { instagram: { title: "تحميل فيديوهات انستقرام", subtitle: "تحميل ريلز وقصص وفيديوهات انستقرام بجودة HD." }, facebook: { title: "تحميل فيديوهات فيسبوك", subtitle: "تحميل أي فيديو أو ريل من فيسبوك بجودة عالية." }, tiktok: { title: "تحميل فيديوهات تيك توك", subtitle: "تحميل فيديوهات تيك توك بدون علامة مائية بجودة عالية." }, youtube: { title: "تحميل فيديوهات يوتيوب", subtitle: "حفظ فيديوهات وشورتس وموسيقى يوتيوب للمشاهدة بدون إنترنت." }, twitter: { title: "تحميل فيديوهات تويتر / X", subtitle: "تحميل فيديوهات وصور GIF من تويتر (X) بسهولة." }, snapchat: { title: "تحميل فيديوهات سناب شات", subtitle: "حفظ قصص وأضواء سناب شات بالجودة أصلية." }, telegram: { title: "تحميل فيديوهات تيليجرام", subtitle: "تحميل فيديوهات ووسائط من قنوات ومجموعات تيليجرام." } }
  },
  pt: {
    search: { placeholder: "Cole o link aqui...", button: "BAIXAR" },
    tabs: { video: "Vídeo", reels: "Reels", story: "Stories", audio: "Áudio", photo: "Foto", music: "Música", shorts: "Shorts" },
    platforms: { instagram: { title: "Baixar Vídeos do Instagram", subtitle: "Baixe Reels, Stories e Vídeos do Instagram em HD." }, facebook: { title: "Baixar Vídeos do Facebook", subtitle: "Baixe qualquer vídeo ou reel do Facebook em qualidade HD." }, tiktok: { title: "Baixar Vídeos do TikTok", subtitle: "Baixe vídeos do TikTok sem marca d'água em alta qualidade." }, youtube: { title: "Baixar Vídeos do YouTube", subtitle: "Salve vídeos, shorts e músicas do YouTube para ver offline." }, twitter: { title: "Baixar Vídeos do Twitter / X", subtitle: "Baixe vídeos e GIFs do Twitter (X) facilmente." }, snapchat: { title: "Baixar Vídeos do Snapchat", subtitle: "Salve spotlights e stories do Snapchat em qualidade original." }, telegram: { title: "Baixar Vídeos do Telegram", subtitle: "Baixe vídeos e mídia de canais e grupos do Telegram." } }
  },
  id: {
    search: { placeholder: "Tempel tautan di sini...", button: "UNDUH" },
    tabs: { video: "Video", reels: "Reels", story: "Cerita", audio: "Audio", photo: "Foto", music: "Musik", shorts: "Shorts" },
    platforms: { instagram: { title: "Unduh Video Instagram", subtitle: "Unduh Reels, Stories, dan Video Instagram dalam kualitas HD." }, facebook: { title: "Unduh Video Facebook", subtitle: "Unduh video atau reel Facebook apa pun dalam kualitas HD." }, tiktok: { title: "Unduh Video TikTok", subtitle: "Unduh video TikTok tanpa tanda air dalam kualitas tinggi." }, youtube: { title: "Unduh Video YouTube", subtitle: "Simpan video, shorts, dan musik YouTube untuk ditonton secara offline." }, twitter: { title: "Unduh Video Twitter / X", subtitle: "Unduh video dan GIF dari Twitter (X) dengan mudah." }, snapchat: { title: "Unduh Video Snapchat", subtitle: "Simpan spotlight dan story Snapchat dalam kualitas asli." }, telegram: { title: "Unduh Video Telegram", subtitle: "Unduh video dan media dari saluran dan grup Telegram." } }
  },
  fr: {
    search: { placeholder: "Collez le lien ici...", button: "TÉLÉCHARGER" },
    tabs: { video: "Vidéo", reels: "Reels", story: "Stories", audio: "Audio", photo: "Photo", music: "Musique", shorts: "Shorts" },
    platforms: { instagram: { title: "Télécharger Vidéos Instagram", subtitle: "Téléchargez Reels, Stories et Vidéos Instagram en HD." }, facebook: { title: "Télécharger Vidéos Facebook", subtitle: "Téléchargez n'importe quel vidéo ou reel Facebook en qualité HD." }, tiktok: { title: "Télécharger Vidéos TikTok", subtitle: "Téléchargez des vidéos TikTok sans filigrane en haute qualité." }, youtube: { title: "Télécharger Vidéos YouTube", subtitle: "Enregistrez des vidéos, shorts et musiques YouTube pour une lecture hors ligne." }, twitter: { title: "Télécharger Vidéos Twitter / X", subtitle: "Téléchargez facilement des vidéos et des GIFs de Twitter (X)." }, snapchat: { title: "Télécharger Vidéos Snapchat", subtitle: "Enregistrez les spotlights et les stories Snapchat en qualité originale." }, telegram: { title: "Télécharger Vidéos Telegram", subtitle: "Téléchargez des vidéos et des médias à partir des canaux et groupes Telegram." } }
  },
  ru: {
    search: { placeholder: "Вставьте ссылку сюда...", button: "СКАЧАТЬ" },
    tabs: { video: "Видео", reels: "Reels", story: "Истории", audio: "Аудио", photo: "Фото", music: "Музыка", shorts: "Shorts" },
    platforms: { instagram: { title: "Скачать видео из Instagram", subtitle: "Скачивайте Reels, Stories и видео из Instagram в HD." }, facebook: { title: "Скачать видео из Facebook", subtitle: "Скачивайте любое видео или рилс из Facebook в HD качестве." }, tiktok: { title: "Скачать видео из TikTok", subtitle: "Скачивайте видео из TikTok без водяного знака в высоком качестве." }, youtube: { title: "Скачать видео из YouTube", subtitle: "Сохраняйте YouTube видео, шортс и музыку для офлайн просмотра." }, twitter: { title: "Скачать видео из Twitter / X", subtitle: "Легко скачивайте видео и GIF из Twitter (X)." }, snapchat: { title: "Скачать видео из Snapchat", subtitle: "Сохраняйте Snapchat истории в оригинальном качестве." }, telegram: { title: "Скачать видео из Telegram", subtitle: "Скачивайте видео и медиа из Telegram каналов и групп." } }
  },
  ja: {
    search: { placeholder: "ここにリンクを貼り付け...", button: "ダウンロード" },
    tabs: { video: "動画", reels: "リール", story: "ストーリー", audio: "音声", photo: "写真", music: "音楽", shorts: "ショート" },
    platforms: { instagram: { title: "Instagram動画ダウンロード", subtitle: "Instagramのリール、ストーリーズ、動画をHDでダウンロード。" }, facebook: { title: "Facebook動画ダウンロード", subtitle: "Facebookの動画やリールをHD画質でダウンロード。" }, tiktok: { title: "TikTok動画ダウンロード", subtitle: "TikTok動画をロゴなしの高画質でダウンロード。" }, youtube: { title: "YouTube動画ダウンロード", subtitle: "YouTubeの動画、ショート、音楽をオフライン用に保存。" }, twitter: { title: "Twitter / X動画ダウンロード", subtitle: "Twitter (X) の動画やGIFを簡単にダウンロード。" }, snapchat: { title: "Snapchat動画ダウンロード", subtitle: "Snapchatのストーリーをオリジナル画質で保存。" }, telegram: { title: "Telegram動画ダウンロード", subtitle: "Telegramのチャンネルやグループから動画をダウンロード。" } }
  },
  tr: {
    search: { placeholder: "Linki buraya yapıştırın...", button: "İNDİR" },
    tabs: { video: "Video", reels: "Reels", story: "Hikaye", audio: "Ses", photo: "Fotoğraf", music: "Müzik", shorts: "Shorts" },
    platforms: { instagram: { title: "Instagram Video İndir", subtitle: "Instagram Reels, Hikayeler ve Videoları HD kalitesinde indirin." }, facebook: { title: "Facebook Video İndir", subtitle: "Herhangi bir Facebook videosunu veya reels'ını HD kalitesinde indirin." }, tiktok: { title: "TikTok Video İndir", subtitle: "TikTok videolarını filigransız olarak yüksek kalitede indirin." }, youtube: { title: "YouTube Video İndir", subtitle: "YouTube videolarını, shorts ve müziklerini çevrimdışı izlemek için kaydedin." }, twitter: { title: "Twitter / X Video İndir", subtitle: "Twitter (X) videolarını ve GIF'lerini kolayca indirin." }, snapchat: { title: "Snapchat Video İndir", subtitle: "Snapchat hikayelerini orijinal kalitesinde kaydedin." }, telegram: { title: "Telegram Video İndir", subtitle: "Telegram kanallarından ve gruplarından video ve medya indirin." } }
  },
  vi: {
    search: { placeholder: "Dán liên kết vào đây...", button: "TẢI XUỐNG" },
    tabs: { video: "Video", reels: "Reels", story: "Tin", audio: "Âm thanh", photo: "Ảnh", music: "Nhạc", shorts: "Shorts" },
    platforms: { instagram: { title: "Tải Video Instagram", subtitle: "Tải xuống Reels, Stories và Video Instagram ở chất lượng HD." }, facebook: { title: "Tải Video Facebook", subtitle: "Tải xuống bất kỳ video hoặc reels Facebook nào ở chất lượng HD." }, tiktok: { title: "Tải Video TikTok", subtitle: "Tải video TikTok không logo ở chất lượng cao." }, youtube: { title: "Tải Video YouTube", subtitle: "Lưu video, shorts và nhạc YouTube để xem ngoại tuyến." }, twitter: { title: "Tải Video Twitter / X", subtitle: "Tải xuống video và GIF từ Twitter (X) dễ dàng." }, snapchat: { title: "Tải Video Snapchat", subtitle: "Lưu tin Snapchat ở chất lượng gốc." }, telegram: { title: "Tải Video Telegram", subtitle: "Tải xuống video và media từ các kênh và nhóm Telegram." } }
  },
  th: {
    search: { placeholder: "วางลิงก์ที่นี่...", button: "ดาวน์โหลด" },
    tabs: { video: "วิดีโอ", reels: "รีลส์", story: "สตอรี่", audio: "เสียง", photo: "รูปภาพ", music: "เพลง", shorts: "ชอร์ตส์" },
    platforms: { instagram: { title: "ดาวน์โหลดวิดีโอ Instagram", subtitle: "ดาวน์โหลด Instagram Reels, Stories และ Videos ในระดับ HD" }, facebook: { title: "ดาวน์โหลดวิดีโอ Facebook", subtitle: "ดาวน์โหลดวิดีโอหรือรีลส์จาก Facebook ในระดับ HD" }, tiktok: { title: "ดาวน์โหลดวิดีโอ TikTok", subtitle: "ดาวน์โหลดวิดีโอ TikTok แบบไม่มีลายน้ำในระดับ HD" }, youtube: { title: "ดาวน์โหลดวิดีโอ YouTube", subtitle: "บันทึกวิดีโอ YouTube, shorts และเพลงเพื่อดูออฟไลน์" }, twitter: { title: "ดาวน์โหลดวิดีโอ Twitter / X", subtitle: "ดาวน์โหลดวิดีโอและ GIF จาก Twitter (X) ได้อย่างง่ายดาย" }, snapchat: { title: "ดาวน์โหลดวิดีโอ Snapchat", subtitle: "บันทึก Snapchat Spotlight และ Stories ในคุณภาพดั้งเดิม" }, telegram: { title: "ดาวน์โหลดวิดีโอ Telegram", subtitle: "ดาวน์โหลดวิดีโอและสื่อจากช่องและกลุ่ม Telegram" } }
  },
  hinglish: {
    search: { placeholder: "Link yahan paste karein...", button: "DOWNLOAD" },
    tabs: { video: "Video", reels: "Reels", story: "Story", audio: "Audio", photo: "Photo", music: "Music", shorts: "Shorts" },
    platforms: { instagram: { title: "Instagram Video Download", subtitle: "Insta Reels, Stories aur Videos ko HD mein download karein." }, facebook: { title: "Facebook Video Download", subtitle: "Koi bhi Facebook video ya reel HD quality mein download karein." }, tiktok: { title: "TikTok Video Download", subtitle: "Bina watermark ke high quality mein TikTok videos download karein." }, youtube: { title: "YouTube Video Download", subtitle: "YouTube videos, shorts aur music ko offline dekhne ke liye save karein." }, twitter: { title: "Twitter / X Video Download", subtitle: "Twitter (X) se videos aur GIFs asani se download karein." }, snapchat: { title: "Snapchat Video Download", subtitle: "Snapchat spotlights aur stories original quality mein save karein." }, telegram: { title: "Telegram Video Download", subtitle: "Telegram channels aur groups se video aur media download karein." } }
  },
  bn: {
    search: { placeholder: "লিঙ্ক এখানে পেস্ট করুন...", button: "ডাউনলোড" },
    tabs: { video: "ভিডিও", reels: "রিলস", story: "স্টোরি", audio: "অডিও", photo: "ফটো", music: "মিউজিক", shorts: "শর্টস" },
    platforms: { instagram: { title: "ইনস্টাগ্রাম ভিডিও ডাউনলোড", subtitle: "ইনস্টাগ্রাম রিলস, স্টোরি এবং ভিডিও HD-তে ডাউনলোড করুন।" }, facebook: { title: "ফেসবুক ভিডিও ডাউনলোড", subtitle: "যেকোনো ফেসবুক ভিডিও বা রিল HD কোয়ালিটিতে ডাউনলোড করুন।" }, tiktok: { title: "টিকটক ভিডিও ডাউনলোড", subtitle: "ওয়াটারমার্ক ছাড়া হাই কোয়ালিটিতে টিকটক ভিডিও ডাউনলোড করুন।" }, youtube: { title: "ইউটিউব ভিডিও ডাউনলোড", subtitle: "অফলাইনে দেখার জন্য ইউটিউব ভিডিও, শর্টস এবং মিউজিক সেভ করুন।" }, twitter: { title: "টুইটার / X ভিডিও ডাউনলোড", subtitle: "টুইটার (X) থেকে সহজে ভিডিও এবং GIF ডাউনলোড করুন।" }, snapchat: { title: "স্ন্যাপচ্যাট ভিডিও ডাউনলোড", subtitle: "স্ন্যাপচ্যাট স্পটলাইট এবং স্টোরি অরিজিনাল কোয়ালিটিতে সেভ করুন।" }, telegram: { title: "টেলিগ্রাম ভিডিও ডাউনলোড", subtitle: "টেলিগ্রাম চ্যানেল এবং গ্রুপ থেকে ভিডিও এবং মিডিয়া ডাউনলোড করুন।" } }
  },
  ta: {
    search: { placeholder: "இணைப்பை இங்கே ஒட்டவும்...", button: "பதிவிறக்கு" },
    tabs: { video: "வீடியோ", reels: "ரீல்ஸ்", story: "ஸ்டோரி", audio: "ஆடியோ", photo: "புகைப்படம்", music: "இசை", shorts: "ஷார்ட்ஸ்" },
    platforms: { instagram: { title: "இன்ஸ்டாகிராம் வீடியோ பதிவிறக்கம்", subtitle: "இன்ஸ்டாகிராம் ரீல்ஸ், ஸ்டோரிகள் மற்றும் வீடியோக்களை HD இல் பதிவிறக்கவும்." }, facebook: { title: "பேஸ்புக் வீடியோ பதிவிறக்கம்", subtitle: "எந்தவொரு பேஸ்புக் வீடியோ அல்லது ரீலையும் HD தரத்தில் பதிவிறக்கவும்." }, tiktok: { title: "டிக்டாக் வீடியோ பதிவிறக்கம்", subtitle: "வாட்டர்மார்க் இல்லாமல் உயர்தரத்தில் டிக்டாக் வீடியோக்களை பதிவிறக்கவும்." }, youtube: { title: "யூடியூப் வீடியோ பதிவிறக்கம்", subtitle: "ஆஃப்லைனில் பார்க்க யூடியூப் வீடியோக்கள், ஷார்ட்ஸ் மற்றும் இசையைச் சேமிக்கவும்." }, twitter: { title: "ட்விட்டர் / X வீடியோ பதிவிறக்கம்", subtitle: "ட்விட்டர் (X) இலிருந்து வீடியோக்கள் மற்றும் GIFகளை எளிதாகப் பதிவிறக்கவும்." }, snapchat: { title: "ஸ்னாப்சாட் வீடியோ பதிவிறக்கம்", subtitle: "ஸ்னாப்சாட் ஸ்பாட்லைட்கள் மற்றும் ஸ்டோரிகளை அசல் தரத்தில் சேமிக்கவும்." }, telegram: { title: "டெலிகிராம் வீடியோ பதிவிறக்கம்", subtitle: "டெலிகிராம் சேனல்கள் மற்றும் குழுக்களிலிருந்து வீடியோக்களைப் பதிவிறக்கவும்." } }
  },
  ur: {
    search: { placeholder: "لنک یہاں پیسٹ کریں...", button: "ڈاؤن لوڈ" },
    tabs: { video: "ویڈیو", reels: "ریلز", story: "سٹوری", audio: "آڈیو", photo: "فوٹو", music: "میوزک", shorts: "شارٹس" },
    platforms: { instagram: { title: "انسٹاگرام ویڈیو ڈاؤن لوڈ", subtitle: "انسٹاگرام ریلز، سٹوریز اور ویڈیوز HD میں ڈاؤن لوڈ کریں۔" }, facebook: { title: "فیس بک ویڈیو ڈاؤن لوڈ", subtitle: "کوئی بھی فیس بک ویڈیو یا ریل HD کوالٹی میں ڈاؤن لوڈ کریں۔" }, tiktok: { title: "ٹک ٹاک ویڈیو ڈاؤن لوڈ", subtitle: "بغیر واٹر مارک کے ہائی کوالٹی میں ٹک ٹاک ویڈیوز ڈاؤن لوڈ کریں۔" }, youtube: { title: "یوٹیوب ویڈیو ڈاؤن لوڈ", subtitle: "یوٹیوب ویڈیوز، شارٹس اور میوزک کو آف لائن دیکھنے کے لیے محفوظ کریں۔" }, twitter: { title: "ٹویٹر / X ویڈیو ڈاؤن لوڈ", subtitle: "ٹویٹر (X) سے ویڈیوز اور GIFs آسانی سے ڈاؤن لوڈ کریں۔" }, snapchat: { title: "سنیپ چیٹ ویڈیو ڈاؤن لوڈ", subtitle: "سنیپ چیٹ سپاٹ لائٹس اور سٹوریز اصل کوالٹی میں محفوظ کریں۔" }, telegram: { title: "ٹیلی گرام ویڈیو ڈاؤن لوڈ", subtitle: "ٹیلی گرام چینلز اور گروپس سے ویڈیو اور میڈیا ڈاؤن لوڈ کریں۔" } }
  },
  tl: {
    search: { placeholder: "I-paste ang link dito...", button: "DOWNLOAD" },
    tabs: { video: "Video", reels: "Reels", story: "Stories", audio: "Audio", photo: "Photo", music: "Music", shorts: "Shorts" },
    platforms: { instagram: { title: "Instagram Video Download", subtitle: "I-download ang Instagram Reels, Stories, at Videos sa HD." }, facebook: { title: "Facebook Video Download", subtitle: "I-download ang anumang Facebook video o reel sa HD quality." }, tiktok: { title: "TikTok Video Download", subtitle: "I-download ang TikTok videos nang walang watermark sa high quality." }, youtube: { title: "YouTube Video Download", subtitle: "I-save ang YouTube videos, shorts at music para sa offline viewing." }, twitter: { title: "Twitter / X Video Download", subtitle: "I-download ang mga video at GIF mula sa Twitter (X) nang madali." }, snapchat: { title: "Snapchat Video Download", subtitle: "I-save ang Snapchat spotlights at stories sa original quality." }, telegram: { title: "Telegram Video Download", subtitle: "I-download ang mga video at media mula sa Telegram channels at groups." } }
  },
  fa: {
    search: { placeholder: "لینک را اینجا کپی کنید...", button: "دانلود" },
    tabs: { video: "ویدیو", reels: "ریلز", story: "استوری", audio: "صدا", photo: "عکس", music: "موسیقی", shorts: "شورتس" },
    platforms: { instagram: { title: "دانلود ویدیو اینستاگرام", subtitle: "دانلود ریلز، استوری و ویدیو اینستاگرام با کیفیت HD." }, facebook: { title: "دانلود ویدیو فیس‌بوک", subtitle: "دانلود هر ویدیو یا ریل فیس‌بوک با کیفیت HD." }, tiktok: { title: "دانلود ویدیو تیک‌تاک", subtitle: "دانلود ویدیو تیک‌تاک بدون واترمارک با کیفیت بالا." }, youtube: { title: "دانلود ویدیو یوتیوب", subtitle: "ذخیره ویدیو، شورتس و موسیقی یوتیوب برای مشاهده آفلاین." }, twitter: { title: "دانلود ویدیو توییتر / X", subtitle: "دانلود آسان ویدیو و GIF از توییتر (X)." }, snapchat: { title: "دانلود ویدیو اسنپ‌چت", subtitle: "ذخیره استوری و اسپات‌لایت اسنپ‌چت با کیفیت اصلی." }, telegram: { title: "دانلود ویدیو تلگرام", subtitle: "دانلود ویدیو و رسانه از کانال‌ها و گروه‌های تلگرام." } }
  },
  uk: {
    search: { placeholder: "Вставте посилання сюди...", button: "ЗАВАНТАЖИТИ" },
    tabs: { video: "Відео", reels: "Reels", story: "Історії", audio: "Аудіо", photo: "Фото", music: "Музика", shorts: "Shorts" },
    platforms: { instagram: { title: "Завантаження відео з Instagram", subtitle: "Завантажуйте Reels, Stories та відео з Instagram у HD." }, facebook: { title: "Завантаження відео з Facebook", subtitle: "Завантажуйте будь-яке відео або reel з Facebook у HD якості." }, tiktok: { title: "Завантаження відео з TikTok", subtitle: "Завантажуйте відео з TikTok без водяного знака у високій якості." }, youtube: { title: "Завантаження відео з YouTube", subtitle: "Зберігайте YouTube відео, shorts та музику для офлайн перегляду." }, twitter: { title: "Завантаження відео з Twitter / X", subtitle: "Легко завантажуйте відео та GIF з Twitter (X)." }, snapchat: { title: "Завантаження відео з Snapchat", subtitle: "Зберігайте Snapchat історії в оригінальній якості." }, telegram: { title: "Завантаження відео з Telegram", subtitle: "Завантажуйте відео та медіа з Telegram каналів та груп." } }
  },
  my: {
    search: { placeholder: "လင့်ခ်ကို ဤနေရာတွင် ကူးထည့်ပါ...", button: "ဒေါင်းလုဒ်" },
    tabs: { video: "ဗီဒီယို", reels: "ရိလ်း", story: "စတိုရီ", audio: "အော်ဒီယို", photo: "ဓာတ်ပုံ", music: "သီချင်း", shorts: "ရှော့စ်" },
    platforms: { instagram: { title: "Instagram ဗီဒီယို ဒေါင်းလုဒ်", subtitle: "Instagram Reels၊ Stories နှင့် ဗီဒီယိုများကို HD ဖြင့် ဒေါင်းလုဒ်လုပ်ပါ။" }, facebook: { title: "Facebook ဗီဒီယို ဒေါင်းလုဒ်", subtitle: "မည်သည့် Facebook ဗီဒီယို သို့မဟုတ် ရိလ်းကိုမဆို HD အရည်အသွေးဖြင့် ဒေါင်းလုဒ်လုပ်ပါ။" }, tiktok: { title: "TikTok ဗီဒီယို ဒေါင်းလုဒ်", subtitle: "TikTok ဗီဒီယိုများကို ဝါတားမတ်မပါဘဲ အရည်အသွေးမြင့် ဒေါင်းလုဒ်လုပ်ပါ။" }, youtube: { title: "YouTube ဗီဒီယို ဒေါင်းလုဒ်", subtitle: "YouTube ဗီဒီယိုများ၊ ရှော့စ်များနှင့် သီချင်းများကို အော့ဖ်လိုင်းကြည့်ရှုရန် သိမ်းဆည်းပါ။" }, twitter: { title: "Twitter / X ဗီဒီယို ဒေါင်းလုဒ်", subtitle: "Twitter (X) မှ ဗီဒီယိုများနှင့် GIF များကို အလွယ်တကူ ဒေါင်းလုဒ်လုပ်ပါ။" }, snapchat: { title: "Snapchat ဗီဒီယို ဒေါင်းလုဒ်", subtitle: "Snapchat စတိုရီများကို မူရင်းအရည်အသွေးဖြင့် သိမ်းဆည်းပါ။" }, telegram: { title: "Telegram ဗီဒီယို ဒေါင်းလုဒ်", subtitle: "Telegram ချန်နယ်များနှင့် အုပ်စုများမှ ဗီဒီယိုများကို ဒေါင်းလုဒ်လုပ်ပါ။" } }
  },
  am: {
    search: { placeholder: "ሊንኩን እዚህ ይለጥፉ...", button: "አውርድ" },
    tabs: { video: "ቪዲዮ", reels: "ሪልስ", story: "ታሪክ", audio: "ኦዲዮ", photo: "ፎቶ", music: "ሙዚቃ", shorts: "ሾርትስ" },
    platforms: { instagram: { title: "የኢንስታግራም ቪዲዮ ማውረጃ", subtitle: "የኢንስታግራም ሪልስ፣ ታሪኮች እና ቪዲዮዎችን በHD ጥራት ያውርዱ።" }, facebook: { title: "የፌስቡክ ቪዲዮ ማውረጃ", subtitle: "ማንኛውንም የፌስቡክ ቪዲዮ ወይም ሪል በHD ጥራት ያውርዱ።" }, tiktok: { title: "የቲክቶክ ቪዲዮ ማውረጃ", subtitle: "የቲክቶክ ቪዲዮዎችን ያለ ወለል መለያ (watermark) በጥራት ያውርዱ።" }, youtube: { title: "የዩቲዩብ ቪዲዮ ማውረጃ", subtitle: "የዩቲዩብ ቪዲዮዎችን፣ ሾርትስ እና ሙዚቃዎችን ለኦፍላይን እይታ ያስቀምጡ።" }, twitter: { title: "የትዊተር / X ቪዲዮ ማውረጃ", subtitle: "ቪዲዮዎችን እና GIFዎችን ከትዊተር (X) በቀላሉ ያውርዱ።" }, snapchat: { title: "የስናፕቻት ቪዲዮ ማውረጃ", subtitle: "የስናፕቻት ታሪኮችን በኦሪጅናል ጥራት ያስቀምጡ።" }, telegram: { title: "የቴሌግራም ቪዲዮ ማውረጃ", subtitle: "ቪዲዮዎችን እና ፋይሎችን ከቴሌግራም ቻናል እና ግሩፕ ያውርዱ።" } }
  },
  uz: {
    search: { placeholder: "Havolani bu yerga qo'ying...", button: "YUKLAB OLISH" },
    tabs: { video: "Video", reels: "Reels", story: "Hikoyalar", audio: "Audio", photo: "Foto", music: "Musiqa", shorts: "Shorts" },
    platforms: { instagram: { title: "Instagram video yuklab olish", subtitle: "Instagram Reels, Stories va videolarni HD formatda yuklab oling." }, facebook: { title: "Facebook video yuklab olish", subtitle: "Har qanday Facebook video yoki reelni HD sifatda yuklab oling." }, tiktok: { title: "TikTok video yuklab olish", subtitle: "TikTok videolarini suv belgisiz yuqori sifatda yuklab oling." }, youtube: { title: "YouTube video yuklab olish", subtitle: "YouTube video, shorts va musiqalarni oflayn ko'rish uchun saqlang." }, twitter: { title: "Twitter / X video yuklab olish", subtitle: "Twitter (X) dan video va GIF-larni osongina yuklab oling." }, snapchat: { title: "Snapchat video yuklab olish", subtitle: "Snapchat hikoyalarini original sifatda saqlang." }, telegram: { title: "Telegram video yuklab olish", subtitle: "Telegram kanallari va guruhlaridan video va mediani yuklab oling." } }
  },
  ne: {
    search: { placeholder: "लिङ्क यहाँ टाँस्नुहोस्...", button: "डाउनलोड" },
    tabs: { video: "भिडियो", reels: "रील्स", story: "स्टोरी", audio: "অडियो", photo: "फोटो", music: "संगीत", shorts: "शर्ट्स" },
    platforms: { instagram: { title: "इन्स्टाग्राम भिडियो डाउनलोड", subtitle: "इन्स्टाग्राम रील्स, स्टोरी र भिडियोहरू HD मा डाउनलोड गर्नुहोस्।" }, facebook: { title: "फेसबुक भिडियो डाउनलोड", subtitle: "कुनै पनि फेसबुक भिडियो या रील HD क्वालिटीमा डाउनलोड गर्नुहोस्।" }, tiktok: { title: "टिकटक भिडियो डाउनलोड", subtitle: "वाटरमार्क बिना उच्च क्वालिटीमा टिकटक भिडियोहरू डाउनलोड गर्नुहोस्।" }, youtube: { title: "युट्युब भिडियो डाउनलोड", subtitle: "युट्युब भिडियोहरू, शर्ट्स र संगीत अफलाइन हेर्नका लागि सेभ गर्नुहोस्।" }, twitter: { title: "ट्विटर / X भिडियो डाउनलोड", subtitle: "ट्विटर (X) बाट भिडियो र GIF हरू सजिलै डाउनलोड गर्नुहोस्।" }, snapchat: { title: "स्न्यापच्याट भिडियो डाउनलोड", subtitle: "स्न्यापच्याट स्टोरीहरू ओरिजिनल क्वालिटीमा सेभ गर्नुहोस्।" }, telegram: { title: "टेलिग्राम भिडियो डाउनलोड", subtitle: "टेलिग्राम च्यानल र समूहहरूबाट भिडियो र मिडिया डाउनलोड गर्नुहोस्।" } }
  }
};

for (const [lang, data] of Object.entries(translations)) {
  const finalDict = JSON.parse(JSON.stringify(baseDict.en));
  
  const merge = (target, source) => {
    for (const key in source) {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        if (!target[key]) target[key] = {};
        merge(target[key], source[key]);
      } else {
        target[key] = source[key];
      }
    }
  };
  
  merge(finalDict, data);
  fs.writeFileSync(path.join(dir, `${lang}.json`), JSON.stringify(finalDict, null, 2));
}

// Write base English
fs.writeFileSync(path.join(dir, 'en.json'), JSON.stringify(baseDict.en, null, 2));

console.log('Dictionaries expanded to 23 languages.');
