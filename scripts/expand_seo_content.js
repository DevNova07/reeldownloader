const fs = require('fs');
const path = require('path');

const EN_PATH = path.join(__dirname, '../src/dictionaries/en.json');
const HI_PATH = path.join(__dirname, '../src/dictionaries/hi.json');

const en = JSON.parse(fs.readFileSync(EN_PATH, 'utf8'));
const hi = JSON.parse(fs.readFileSync(HI_PATH, 'utf8'));

const safetyBlocks = {
  instagram: {
    en: {
      title: "Ethical Usage & Copyright Safety for Instagram",
      content: "When using our Instagram media saving tools, it is crucial to prioritize the intellectual property rights of the original creators. Instagram is a vibrant hub for artists, influencers, and brands who invest significant time into their content. We strongly advise using downloaded Reels, Stories, and Posts for personal, offline viewing only. Re-uploading or commercially exploiting saved media without explicit permission from the creator can lead to copyright strikes or account flags. Our tool is designed to be a bridge for accessibility, not a loophole for content theft. Always remember to support creators by engaging with their original posts on the official app. Furthermore, while our service operates without tracking your data, we recommend avoiding the distribution of private account media, as this violates personal privacy ethics."
    },
    hi: {
      title: "Instagram के लिए एथिकल यूसेज और कॉपीराइट सुरक्षा",
      content: "हमारे Instagram मीडिया सेविंग टूल्स का उपयोग करते समय, ओरिजिनल क्रिएटर्स के इंटेलेक्चुअल प्रॉपर्टी राइट्स का सम्मान करना बहुत ज़रूरी है। Instagram उन कलाकारों और ब्रांड्स का केंद्र है जो अपने कंटेंट में काफी मेहनत करते हैं। हम आपको सलाह देते हैं कि डाउनलोड किए गए Reels, Stories और Posts का उपयोग केवल पर्सनल और ऑफलाइन देखने के लिए ही करें। क्रिएटर की अनुमति के बिना कंटेंट को फिर से अपलोड करना या कमर्शियल यूज़ करना कॉपीराइट स्ट्राइक का कारण बन सकता है। हमारा टूल एक्सेसिबिलिटी के लिए बनाया गया है, कंटेंट चोरी के लिए नहीं। हमेशा क्रिएटर्स को सपोर्ट करें और उनके ओरिजिनल पोस्ट के साथ ऐप पर एंगेज हों। इसके अलावा, हम पर्सनल प्राइवेसी का सम्मान करने की सलाह देते हैं।"
    }
  },
  facebook: {
    en: {
      title: "Facebook Community Guidelines & Legal Compliance",
      content: "Facebook sharing is at the heart of community digital interactions. However, saving Facebook videos comes with the responsibility of respecting ownership. Our Facebook Video Downloader provides a safe, no-login environment to secure your favorite memories, but it should not be used to infringe upon communal or individual copyrights. According to Google and Meta's fair use principles, archiving publicly available media for education, research, or personal reference is generally acceptable. However, mass distribution or removing attribution is not encouraged. We maintain a strict no-log policy to ensure your security while you bridge the gap between social media and offline storage. Use the saved content responsibly and ethically."
    },
    hi: {
      title: "Facebook कम्युनिटी गाइडलाइन्स और कानूनी अनुपालन",
      content: "Facebook वीडियो सेव करते समय ओनरशिप का सम्मान करना आपकी ज़िम्मेदारी है। हमारा Facebook Video Downloader आपकी पसंदीदा यादों को सुरक्षित रखने के लिए एक सुरक्षित, बिना-लॉगिन वाला वातावरण प्रदान करता है, लेकिन इसका उपयोग कॉपीराइट का उल्लंघन करने के लिए नहीं किया जाना चाहिए। Google और Meta के सिद्धांतों के अनुसार, शिक्षा या व्यक्तिगत संदर्भ के लिए मीडिया को सेव करना आम तौर पर स्वीकार्य है। हालांकि, क्रिएटर्स का क्रेडिट हटाना या बिना अनुमति शेयर करना गलत है। हम आपकी सुरक्षा सुनिश्चित करने के लिए नो-लॉग पॉलिसी बनाए रखते हैं। सेव किए गए कंटेंट का उपयोग जिम्मेदारी से करें।"
    }
  },
  youtube: {
    en: {
      title: "YouTube Fair Use & Digital Archiving Ethics",
      content: "Archiving YouTube content for offline education or personal enjoyment falls under the umbrella of 'Fair Use' in many jurisdictions, provided it does not harm the original creator's revenue streams. While our tool allows for high-fidelity MP4 and MP3 extraction, we emphasize that these files should remain in your private collection. YouTube creators rely on views and ad revenue to sustain their channels; therefore, distributing downloaded videos elsewhere without credit is damaging to the ecosystem. We believe in empowering users to access information anywhere—even without an internet connection—while maintaining the highest standards of digital ethics. By using this service, you agree to treat the downloaded material with the respect it deserves, ensuring that the hard work of global creators continues to be valued."
    },
    hi: {
      title: "YouTube फेयर यूज़ और डिजिटल आर्काइविंग नैतिकता",
      content: "YouTube कंटेंट को ऑफलाइन शिक्षा या व्यक्तिगत आनंद के लिए सेव करना कई जगहों पर 'फेयर यूज़' के दायरे में आता है। हमारा टूल आपको हाई-क्वालिटी MP4 और MP3 एक्सट्रैक्शन की सुविधा देता है, लेकिन हम इस बात पर ज़ोर देते हैं कि ये फाइलें आपके निजी कलेक्शन तक ही सीमित रहनी चाहिए। YouTube क्रिएटर्स अपनी मेहनत के लिए व्यूज़ और एड रिवेन्यू पर निर्भर करते हैं, इसलिए क्रेडिट के बिना वीडियो बांटना गलत है। हम यूजर्स को इंटरनेट के बिना जानकारी तक पहुँचने में मदद करते हैं, लेकिन डिजिटल एथिक्स का पालन करना ज़रूरी है। इस सर्विस का उपयोग करके, आप क्रिएटर्स की मेहनत का सम्मान करने के लिए सहमत होते हैं।"
    }
  },
  tiktok: {
    en: {
      title: "TikTok Creative Rights & Watermark-Free Usage",
      content: "Saving TikTok videos without watermarks is a popular way to enjoy content in its purest form. However, removing the watermark does not remove the creator's ownership. Whenever you save a TikTok clip, remember that the intellectual effort belongs to the user who filmed it. We provide a clean extraction to enhance your viewing experience, but we discourage the use of these clips for re-branding or impersonation. If you find a video particularly valuable, consider sharing the user's profile or tagging them if you ever showcase their work in a private setting. Maintaining a healthy social media ecosystem depends on users like you who value creativity over convenience."
    },
    hi: {
      title: "TikTok क्रिएटिव राइट्स और वॉटरमार्क-फ्री यूसेज",
      content: "बिना वॉटरमार्क के TikTok वीडियो सेव करना कंटेंट को उसके शुद्धतम रूप में एन्जॉय करने का एक तरीका है। लेकिन वॉटरमार्क हटाने से क्रिएटर की ओनरशिप खत्म नहीं होती। याद रखें कि हर क्लिप के पीछे किसी की मेहनत होती है। हम आपके अनुभव को बेहतर बनाने के लिए क्लीन एक्सट्रैक्शन प्रदान करते हैं, लेकिन हम इन क्लिप्स का उपयोग री-ब्रांडिंग या किसी और की पहचान चुराने के लिए करने को हतोत्साहित करते हैं। क्रिएटिविटी का सम्मान करें और हमेशा ओरिजिनल क्रिएटर्स को सपोर्ट करें।"
    }
  },
  snapchat: {
    en: {
      title: "Snapchat Privacy & Snap Saving Compliance",
      content: "Snapchat was built on the foundation of ephemeral or temporary communication. While our tool allows you to preserve Spotlight videos and Stories that you find inspiring, it is essential to be mindful of the platform's initial intent. Never use this service to archive and distribute sensitive or private snaps without consent. We prioritize your anonymity by requiring no login, ensuring that your search for content remains private. However, this privacy should be mirrored in how you handle the media you download. Respect the temporary nature of social stories and use your saved library primarily for inspiration and personal reference."
    },
    hi: {
      title: "Snapchat प्राइवेसी और स्नैप सेविंग अनुपालन",
      content: "Snapchat को टेम्परेरी कम्युनीकेशन के लिए बनाया गया था। जबकि हमारा टूल आपको स्पॉटलाइट वीडियो और स्टोरीज़ को सेव करने की अनुमति देता है, लेकिन प्लेटफॉर्म के मूल उद्देश्य का ध्यान रखना आवश्यक है। कभी भी बिना सहमति के संवेदनशील या प्राइवेट स्नैप्स को सेव न करें। हम आपकी गुमनामी को प्राथमिकता देते हैं, लेकिन यह आपकी ज़िम्मेदारी है कि आप डाउनलोड किए गए मीडिया को कैसे हैंडल करते हैं। सोशल स्टोरीज़ की अस्थायी प्रकृति का सम्मान करें और अपनी सेव की गई लाइब्रेरी का उपयोग केवल प्रेरणा और व्यक्तिगत संदर्भ के लिए करें।"
    }
  },
  generic: {
    en: {
      title: "Digital Safety & Responsible Media Consumption",
      content: "In an era of instant media access, the responsibility of the consumer has never been greater. Our multi-platform downloader is built on a foundation of security and speed, utilizing SSL encryption and a strict no-tracking policy to keep you safe. We encourage you to use this tool as a creative asset—saving tutorials for offline learning, archiving travel inspiration, or keeping a backup of your favorite memories. By downloading any media, you acknowledge that you are doing so under fair use guidelines and will not use the content for commercial gain without proper licensing. Protecting the digital landscape means respecting the creators who make it worth visiting."
    },
    hi: {
      title: "डिजिटल सुरक्षा और जिम्मेदार मीडिया खपत",
      content: "इंस्टेंट मीडिया एक्सेस के इस दौर में, कंज्यूमर की ज़िम्मेदारी पहले से कहीं ज़्यादा बढ़ गई है। हमारा मल्टी-प्लेटफॉर्म डाउनलोडर सुरक्षा और स्पीड की नींव पर बनाया गया है, जो आपको सुरक्षित रखने के लिए SSL एन्क्रिप्शन का उपयोग करता है। हम आपको इस टूल का उपयोग एक क्रिएटिव एसेट के रूप में करने के लिए प्रोत्साहित करते हैं—चाहे वह सीखने के लिए ट्यूटोरियल सेव करना हो या अपनी यादों का बैकअप रखना। कोई भी मीडिया डाउनलोड करके, आप स्वीकार करते हैं कि आप 'फेयर यूज़' गाइडलाइन्स के तहत ऐसा कर रहे हैं और कमर्शियल फायदे के लिए इसका उपयोग नहीं करेंगे।"
    }
  }
};

function getPlatformCategory(key) {
  const k = key.toLowerCase();
  if (k.includes('instagram') || k.includes('insta') || k.includes('reels')) return 'instagram';
  if (k.includes('facebook') || k.includes('fb')) return 'facebook';
  if (k.includes('youtube') || k.includes('yt')) return 'youtube';
  if (k.includes('tiktok')) return 'tiktok';
  if (k.includes('snapchat')) return 'snapchat';
  return 'generic';
}

function processDict(dict, lang) {
  if (!dict.platforms || !dict.platforms.seo_pages) return;
  
  const pages = dict.platforms.seo_pages;
  Object.keys(pages).forEach(key => {
    const platform = getPlatformCategory(key);
    const block = safetyBlocks[platform][lang];
    
    const extraContent = `\n\n${block.title}\n${block.content}`;
    
    if (pages[key].article_content) {
      // Avoid double appending
      if (!pages[key].article_content.includes(block.title)) {
        pages[key].article_content += extraContent;
      }
    } else {
      pages[key].article_content = block.content;
    }
  });
}

processDict(en, 'en');
processDict(hi, 'hi');

fs.writeFileSync(EN_PATH, JSON.stringify(en, null, 2));
fs.writeFileSync(HI_PATH, JSON.stringify(hi, null, 2));

console.log("Updated 180+ SEO pages in EN and HI dictionaries successfully.");
