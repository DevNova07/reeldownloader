const fs = require('fs');
const path = require('path');

const intents = {
  en: {
    mp3: {
      titleSuffix: 'MP3 & Audio Downloader',
      desc: 'Extract high-fidelity audio from {platform} videos instantly. Our specialized MP3 converter ensures original bitrate preservation for professional-grade sound quality. Perfect for creators needing clear background music or viral sounds. Supports 320kbps extraction on Android, iOS, and PC. We use advanced scraping technology that interacts directly with the platform nodes to retrieve the raw audio stream without re-compression, ensuring every beat and lyric is preserved in its purest form.',
      article_content: 'In the modern era of digital content, audio has become the heartbeat of viral trends. Our {platform} MP3 Downloader is engineered to provide an elite extraction experience for professionals and enthusiasts alike. \n\n### Why Bitrate Preservation Matters\nMost online tools perform a "lossy" conversion, which means they re-encode the audio and strip away depth. Our engine performs a direct-stream sync, fetching the original MP4/M4A container and extracting the audio track at its native bitrate. Whether you are archiving a viral sound for a podcast or saving a high-fidelity tutorial for offline study, the clarity of our files is unmatched.\n\n### Seamless Cross-Device Compatibility\nWe understand that your workflow happens across multiple terminals. Our web-based tool is fully responsive, meaning you can initiate a {platform} audio download on your iPhone while commuting and finish your archive on a Windows or Mac workstation. There are no app installations or browser extensions required, keeping your device secure and your storage clean.\n\n### Security and Privacy as a Priority\nDigital boundaries are important. We never ask for your {platform} login credentials or personal data. The entire extraction process happens on our high-speed secure servers, acting as a buffer between your device and the platform. Join millions of smart users who trust SavClip for their persistent media needs. Our service is 100% free, supported by non-intrusive ads that don\'t block your path to the content you love.\n\n### Industrial-Grade Audio Fidelity\nOur extraction pipeline is tuned for the highest possible sampling rate. While standard downloaders often introduce artifacts or jitter, our {platform} MP3 tool maintains spectral purity. This is why we are the preferred choice for DJs, sound designers, and content curators who need to build a library of high-impact sounds without the noise of typical web extraction. Experience the SavClip difference today.',
      steps: [
        'Copy the link of the {platform} video or reel containing the audio.',
        'Paste the URL into our high-speed MP3 converter box above.',
        'Select the MP3 format and click download to save the audio file.'
      ]
    },
    story: {
      titleSuffix: 'Anonymous Story Downloader',
      desc: 'View and download {platform} stories and highlights with absolute anonymity. Our private extraction engine ensures that the uploader never knows you viewed or saved their content. Save temporary stories before they expire in original HD quality on any device. We bypass platform-level tracking to provide a pure, unmonitored window into the content that matters to you.',
      article_content: 'Stories are ephemeral, designed to vanish after 24 hours. However, some moments are too important to lose. Our {platform} Story Downloader gives you the power of permanence.\n\n### Absolute Anonymity Guaranteed\nStandard viewing within the app notifies the creator that you have seen their story. Our tool acts as a secure intermediary. When you paste a link, our server fetches the media and presents it to you directly. This ensures your footprint is zero. You can browse, study, and archive stories without the uploader ever being notified.\n\n### High-Definition Archiving\nDon\'t settle for blurry screen recordings that ruin the visual narrative. Our tool accesses the raw media stream to ensure you get the full frame at its highest available resolution. We support both image-based and video-based stories, wrapping them in standards-compliant JPG and MP4 containers for universal playback on any device.\n\n### Professional Workflow Integration\nSocial media managers and researchers use our Story Downloader to track trends and archive inspirations safely. With our "One-Click" saving feature, you can build a comprehensive library of ephemeral content in seconds. Experience the freedom of anonymous browsing combined with industrial-grade media extraction. Our servers are monitored 24/7 to ensure compatibility with the latest platform updates.',
      steps: [
        'Find the {platform} profile or story link you wish to save.',
        'Enter the link into our anonymous story downloader search bar.',
        'Choose the story segment and click download to archive it permanently.'
      ]
    },
    hd: {
      titleSuffix: '8K & HD Video Downloader',
      desc: 'Experience true 4K and 8K video extraction from {platform} with our elite media engine. We preserve original HDR color profiles and high bitrates that other downloaders compress. Get the highest quality possible for offline viewing on large screens or professional editing. Our infrastructure is built on a high-bandwidth backbone that ensures massive files are processed with surgical speed.',
      article_content: 'In an era of high-density screens, resolution is everything. Our {platform} HD Video Downloader is the definitive choice for those who refuse to compromise on visual fidelity.\n\n### Uncompromising Visual Purity\nWhile generic tools downscale 4K footage to 720p to save bandwidth, we do the opposite. Our engine identifies the master-node of the video stream and retrieves the raw binary data. This ensures that every pixel, highlight, and shadow is preserved exactly as the creator intended. Perfect for professional video editors who need B-roll or for home cinema enthusiasts who view content on 8K displays.\n\n### Speed and Efficiency\nWaiting for a download is a relic of the past. Our globally distributed network of servers ensures that your request is handled by the node closest to your location. We handle the heavy processing on our side, delivering a ready-to-save file to your browser in seconds. Whether it is a 10-second reel or a 10-minute long-form video, the performance remains consistently high.\n\n### Secure and Friction-Free Experience\nWe have removed all the barriers. No registration, no login, and no invasive tracking. Your media extraction habits are your business. Our tool operates in a secure SSL sandbox, protecting your hardware and your identity. Experience the gold standard of {platform} media archiving today and build a library that stands the test of time.',
      steps: [
        'Identify the high-resolution {platform} video you want to secure.',
        'Paste the link into our professional 8K downloader tool above.',
        'Select the highest quality (1080p, 4K, or 8K) Birmingham and save instantly.'
      ]
    },
    watermark: {
      titleSuffix: 'No Watermark Video Downloader',
      desc: 'Download {platform} videos without intrusive watermarks or platform branding. Our tool strips away logos to provide a clean, professional-grade video file. Perfect for cross-platform sharing or creating AI-assisted reaction videos without distractions. We use edge-rendering technology to ensure the frame remains pristine from corner to corner.',
      article_content: 'Visual transparency is the benchmark of professional-tier media curation. Our {platform} No Watermark Downloader is the industry-leading solution for creators who value purity.\n\n### Advanced Logo Stripping Technology\nUnlike other tools that simply blur the corners of your video, our engine performs a deep-stream reconstruction. We access the original video components before the platform applies its overlay branding. This ensures that the final MP4 file is remarkably clear, free from any ghosts or remnants of platform logos. Your content is ready for professional editing or redistribution immediately.\n\n### Built for Content Creators\nIn the age of cross-platform growth, sharing your {platform} content to other networks is vital. Having a clean, watermark-free file allows you to maintain your own brand identity without distracting platform markers. Our tool supports high-bitrate extraction, ensuring that the transitions remain smooth and the colors remain vibrant even after the watermark is removed.\n\n### Privacy and Safety First\nArchive your favorite trends with total peace of mind. Our service requires no account login and stores no personal data. Every session is encrypted, keeping your media habits private. Join the millions of power-users who have made SavClip their primary destination for high-speed, logo-free media extraction. It\'s fast, it\'s free, and it\'s built for the decentralized web.',
      steps: [
        'Copy the share link of the {platform} video containing the watermark.',
        'Paste the URL into our watermark-free extraction tool.',
        'Click download to fetch the original, clean video file to your gallery.'
      ]
    },
    default: {
      titleSuffix: 'Professional Video Downloader',
      desc: 'The premier destination for high-fidelity {platform} media archiving. Our service is optimized for speed and privacy, ensuring large files are processed in seconds without requiring any account login. Compatible with all modern browsers on iPhone, Android, and PC. We provide a stable, high-performance bridge between the cloud and your storage.',
      article_content: 'Finding a reliable way to save your favorite media shouldn\'t be a chore. Our {platform} Video Downloader is engineered to provide a minimalist, high-performance environment for all your archiving needs.\n\n### Why Choose Our Architecture?\nWe don\'t just record the screen; we interact with the raw media metadata. This allows us to retrieve the original file as it was uploaded, maintaining 100% of the visual and audio fidelity. Whether it\'s an educational tutorial, a family memory, or a viral news clip, having the ability to save these videos for offline use ensures you remain in control of your digital life.\n\n### Universal Accessibility\nOur platform works flawlessly across the entire digital spectrum. From high-end Mac workstations to budget Android smartphones, the experience is equally fast and responsive. We support all major video formats and resolutions, automatically targeting the best quality available for each post. Our "One-Click" efficiency ensures that the path from link to file is as short as possible.\n\n### Ethical and Secure Archiving\nWe believe in a free and open internet where you can store the content that matters to you. Security is a core pillar of our philosophy; we never ask for your password or personal information. Your requests are handled over an encrypted connection, and your data is never stored on our servers. Master the art of content curation today and build a library of inspiration with the web\'s most trusted guide.',
      steps: [
        'Locate the {platform} media link you want to save to your device.',
        'Insert the URL into the primary search field at the top of this page.',
        'Tap the download action to transfer the HD file to your storage.'
      ]
    }
  },
  hi: {
    mp3: {
      titleSuffix: 'MP3 और ऑडियो डाउनलोडर',
      desc: '{platform} वीडियो से उच्च गुणवत्ता वाला ऑडियो तुरंत निकालें। हमारा विशेष MP3 कनवर्टर मूल बिटरेट को सुरक्षित रखता है। क्रिएटर्स के लिए बेहतरीन, जिन्हें स्पष्ट बैकग्राउंड म्यूजिक या वायरल साउंड की आवश्यकता है। Android, iOS और PC पर काम करता है। हम सीधे प्लेटफॉर्म सर्वर से जुड़कर बिना किसी क्वालिटी लॉस के ऑडियो निकालते हैं।',
      article_content: 'आज के डिजिटल युग में, ऑडियो किसी भी वायरल ट्रेंड की धड़कन बन गया है। हमारा {platform} MP3 डाउनलोडर प्रोफेशनल्स और उत्साही लोगों के लिए एक बेहतरीन अनुभव प्रदान करने के लिए बनाया गया है।\n\n### बिटरेट क्यों महत्वपूर्ण है?\nअधिकांश ऑनलाइन टूल ऑडियो की गुणवत्ता कम कर देते हैं। हमारा इंजन सीधे स्ट्रीम सिंक करता है, जिससे मूल बिटरेट सुरक्षित रहता है। चाहे आप पॉडकास्ट के लिए साउंड सहेज रहे हों या ऑफलाइन अध्ययन के लिए ट्यूटोरियल, हमारे ऑडियो की स्पष्टता बेजोड़ है।\n\n### सभी डिवाइसेस पर काम करता है\nहम जानते हैं कि आपका काम अलग-अलग डिवाइसेस पर होता है। हमारा वेब-आधारित टूल पूरी तरह से रिस्पॉन्सिव है, जिसका अर्थ है कि आप अपने iPhone पर डाउनलोड शुरू कर सकते हैं और उसे अपने PC पर समाप्त कर सकते हैं। किसी भी ऐप या एक्सटेंशन की आवश्यकता नहीं है।\n\n### सुरक्षा और गोपनीयता\nहम कभी भी आपके {platform} लॉगिन विवरण या व्यक्तिगत डेटा नहीं मांगते हैं। पूरी प्रक्रिया हमारे हाई-स्पीड सुरक्षित सर्वर पर होती है। लाखों उपयोगकर्ताओं के भरोसे में शामिल हों और अपनी मीडिया आवश्यकताओं के लिए SavClip का उपयोग करें। हमारी सेवा 100% मुफ्त है।',
      steps: [
        'उस {platform} वीडियो या रील का लिंक कॉपी करें जिसमें ऑडियो है।',
        'ऊपर दिए गए हमारे हाई-स्पीड MP3 कनवर्टर बॉक्स में URL पेस्ट करें।',
        'MP3 फॉर्मेट चुनें और ऑडियो फाइल सेव करने के लिए डाउनलोड पर क्लिक करें।'
      ]
    },
    story: {
      titleSuffix: 'अनाम स्टोरी डाउनलोडर',
      desc: '{platform} की कहानियों और हाइलाइट्स को पूरी गुमनामी के साथ देखें और डाउनलोड करें। हमारा निजी एक्सट्रैक्शन इंजन यह सुनिश्चित करता है कि अपलोडर को कभी पता न चले कि आपने उनकी सामग्री देखी या सहेजी है। किसी भी डिवाइस पर मूल HD गुणवत्ता में कहानियां सहेजें। हम प्लेटफॉर्म-स्तर की ट्रैकिंग को बायपास करते हैं।',
      article_content: 'स्टोरीज़ केवल 24 घंटों के लिए होती हैं, लेकिन कुछ पल खोने के लिए बहुत महत्वपूर्ण होते हैं। हमारा {platform} स्टोरी डाउनलोडर आपको उन्हें स्थायी रूप से सहेजने की शक्ति देता है।\n\n### पूरी गुमनामी की गारंटी\nऐप के भीतर देखने पर अपलोडर को पता चल जाता है। हमारा टूल एक सुरक्षित मध्यस्थ के रूप में कार्य करता है। जब आप लिंक पेस्ट करते हैं, तो हमारा सर्वर मीडिया लाता है और आपको दिखाता है। इससे अपलोडर को कभी पता नहीं चलता कि आपने स्टोरी देखी है।\n\n### हाई-डेफिनिशन अर्काइविंग\nधुंधली स्क्रीन रिकॉर्डिंग से समझौता न करें। हमारा टूल रॉ मीडिया स्ट्रीम तक पहुंचता है ताकि आपको उच्चतम रिज़ॉल्यूशन मिले। हम इमेज और वीडियो दोनों कहानियों का समर्थन करते हैं।\n\n### प्रोफेशनल वर्कफ़्लो\nसोशल मीडिया मैनेजर और शोधकर्ता ट्रेंड्स को ट्रैक करने के लिए हमारे स्टोरी डाउनलोडर का उपयोग करते हैं। हमारे "वन-क्लिक" सेविंग फीचर के साथ, आप सेकंडों में स्टोरीज की एक लाइब्रेरी बना सकते हैं। SavClip के साथ सुरक्षित ब्राउज़िंग और बेहतरीन एक्सट्रैक्शन का अनुभव करें।',
      steps: [
        'वह {platform} प्रोफाइल या स्टोरी लिंक खोजें जिसे आप सहेजना चाहते हैं।',
        'हमारे अनाम स्टोरी डाउनलोडर सर्च बार में लिंक दर्ज करें।',
        'स्टोरी सेगमेंट चुनें और इसे स्थायी रूप से सहेजने के लिए डाउनलोड पर क्लिक करें।'
      ]
    },
    hd: {
      titleSuffix: '8K और HD वीडियो डाउनलोडर',
      desc: 'हमारे एलीट मीडिया इंजन के साथ {platform} से वास्तविक 4K और 8K वीडियो एक्सट्रैक्शन का अनुभव करें। हम मूल HDR रंग प्रोफाइल और उच्च बिटरेट को सुरक्षित रखते हैं जो अन्य डाउनलोडर कंप्रेस कर देते हैं। ऑफलाइन देखने या प्रोफेशनल एडिटिंग के लिए सर्वोत्तम गुणवत्ता प्राप्त करें।',
      article_content: 'हाई-डेफिनिशन स्क्रीन के युग में, रिज़ॉल्यूशन ही सब कुछ है। हमारा {platform} HD वीडियो डाउनलोडर उन लोगों के लिए सबसे अच्छा विकल्प है जो क्वालिटी से समझौता नहीं करते।\n\n### बेहतरीन विजुअल क्वालिटी\nजबकि सामान्य टूल 4K फुटेज को 720p में बदल देते हैं, हम इसके विपरीत करते हैं। हमारा इंजन वीडियो स्ट्रीम के मास्टर-नोड की पहचान करता है और रॉ बाइनरी डेटा प्राप्त करता है। यह सुनिश्चित करता है कि हर पिक्सेल और रंग सुरक्षित रहे। प्रोफेशनल वीडियो एडिटर्स के लिए यह एक अनिवार्य टूल है।\n\n### गति और दक्षता\nडाउनलोड के लिए इंतज़ार करना अब पुरानी बात है। हमारा वैश्विक सर्वर नेटवर्क यह सुनिश्चित करता है कि आपका अनुरोध तुरंत पूरा हो। हम भारी प्रोसेसिंग अपने साइड पर करते हैं, जिससे आपको सेकंडों में फाइल मिल जाती है। चाहे वह 10-सेकंड की रील हो या 10-मिनट का वीडियो।\n\n### सुरक्षित अनुभव\nहमने सभी बाधाओं को हटा दिया है। कोई रजिस्ट्रेशन नहीं, कोई लॉगिन नहीं। आपकी मीडिया आदतें आपकी अपनी हैं। हमारा टूल सुरक्षित SSL सैंडबॉक्स में काम करता है, जो आपके हार्डवेयर और आपकी पहचान की रक्षा करता है। आज ही SavClip के साथ जुड़ें।',
      steps: [
        'वह हाई-रिजोल्यूशन {platform} वीडियो पहचानें जिसे आप सुरक्षित करना चाहते हैं।',
        'ऊपर हमारे पेशेवर 8K डाउनलोडर टूल में लिंक पेस्ट करें।',
        'उच्चतम गुणवत्ता (1080p, 4K, या 8K) चुनें और तुरंत सहेजें।'
      ]
    },
    watermark: {
      titleSuffix: 'बिना वॉटरमार्क वीडियो डाउनलोडर',
      desc: 'बिना किसी वॉटरमार्क या प्लेटफॉर्म ब्रांडिंग के {platform} वीडियो डाउनलोड करें। हमारा टूल लोगो को हटा देता है ताकि आपको एक क्लीन, प्रोफेशनल-ग्रेड वीडियो फाइल मिले। बिना किसी रुकावट के क्रॉस-प्लेटफॉर्म शेयरिंग के लिए बिल्कुल सही।',
      article_content: 'विजुअल स्पष्टता प्रोफेशनल मीडिया प्रबंधन की पहचान है। हमारा {platform} नो वॉटरमार्क डाउनलोडर उन क्रिएटर्स के लिए बेहतरीन समाधान है जो शुद्धता चाहते हैं।\n\n### उन्नत लोगो हटाने की तकनीक\nअन्य उपकरणों के विपरीत जो केवल धुंधला (blur) करते हैं, हमारा इंजन पूरी तरह से रिकंस्ट्रक्शन करता है। हम वॉटरमार्क लगने से पहले ही मूल वीडियो स्ट्रीम तक पहुँचते हैं। इससे आपको एक क्लीन वीडियो मिलता है जो एडिटिंग के लिए तुरंत तैयार होता है।\n\n### कंटेंट क्रिएटर्स के लिए बनाया गया\nआज के समय में कंटेंट को एक प्लेटफॉर्म से दूसरे प्लेटफॉर्म पर शेयर करना जरूरी है। बिना वॉटरमार्क वाली फाइल होने से आप अपनी ब्रांड पहचान बनाए रख सकते हैं। हमारा टूल हाई-बिटरेट एक्सट्रैक्शन का समर्थन करता है, जिससे वीडियो की क्वालिटी बनी रहती है।\n\n### सुरक्षा सर्वोपरि\nबिना किसी चिंता के अपने पसंदीदा ट्रेंड्स को सहेजें। हमारी सेवा में किसी लॉगिन की आवश्यकता नहीं है। हर सत्र एन्क्रिप्टेड है, जिससे आपकी प्राइवेसी बनी रहती है। लाखों उपयोगकर्ताओं के साथ जुड़ें जो SavClip पर भरोसा करते हैं।',
      steps: [
        'वॉटरमार्क वाले {platform} वीडियो का शेयर लिंक कॉपी करें।',
        'लिंक को हमारे वॉटरमार्क-मुक्त एक्सट्रैक्शन टूल में पेस्ट करें।',
        'अपनी गैलरी में मूल, क्लीन वीडियो फाइल प्राप्त करने के लिए डाउनलोड पर क्लिक करें।'
      ]
    },
    default: {
      titleSuffix: 'प्रोफेशनल वीडियो डाउनलोडर',
      desc: 'उच्च गुणवत्ता वाले {platform} मीडिया को सहेजने के लिए प्रमुख स्थान। हमारी सेवा गति और गोपनीयता के लिए अनुकूलित है, जिससे यह सुनिश्चित होता है कि बड़ी फाइलें बिना किसी लॉगिन के सेकंडों में प्रोसेस हो जाएं। iPhone, Android और PC पर सभी आधुनिक ब्राउज़रों के साथ संगत।',
      article_content: 'मीडिया सहेजने का एक विश्वसनीय तरीका खोजना अब कोई मुश्किल काम नहीं है। हमारा {platform} वीडियो डाउनलोडर आपकी सभी अर्काइविंग जरूरतों के लिए बनाया गया है।\n\n### हमारा आर्किटेक्चर क्यों चुनें?\nहम केवल स्क्रीन रिकॉर्ड नहीं करते; हम रॉ मीडिया मेटाडेटा के साथ इंटरैक्ट करते हैं। यह हमें मूल फ़ाइल को वैसे ही प्राप्त करने की अनुमति देता है जैसे उसे अपलोड किया गया था। चाहे वह ट्यूटोरियल हो, कोई पुरानी याद या वायरल न्यूज़ क्लिप, यह टूल आपको अपने डिजिटल जीवन पर नियंत्रण देता है।\n\n### सार्वभौमिक पहुंच (Universal Accessibility)\nहमारा प्लेटफॉर्म हर डिवाइस पर बेहतरीन काम करता है। हाई-एंड मैक वर्कस्टेशन से लेकर बजट एंड्रॉइड स्मार्टफोन तक, अनुभव हमेशा तेज रहता है। हम सभी प्रमुख वीडियो फॉर्मेट और रिजॉल्यूशन का समर्थन करते हैं।\n\n### सुरक्षित अर्काइविंग\nहम एक स्वतंत्र इंटरनेट में विश्वास करते हैं जहां आप वह कंटेंट सहेज सकते हैं जो आपके लिए मायने रखता है। हम कभी भी आपका पासवर्ड या व्यक्तिगत जानकारी नहीं मांगते। आज ही SavClip का उपयोग शुरू करें और अपने पसंदीदा मीडिया को सुरक्षित करें।',
      steps: [
        'वह {platform} मीडिया लिंक ढूंढें जिसे आप अपने डिवाइस पर सहेजना चाहते हैं।',
        'इस पेज के शीर्ष पर स्थित प्राथमिक सर्च फ़ील्ड में URL डालें।',
        'HD फ़ाइल को अपने स्टोरेज में ट्रांसफर करने के लिए डाउनलोड बटन दबाएं।'
      ]
    }
  }
};

const platformsConfig = {
  instagram: {
    name: 'Instagram',
    slugs: [
      'instagram_video_download_hd',
      'instagram_reels_download_hd',
      'instagram_photo_download_hd',
      'instagram_story_download_hd',
      'instagram_reels_download_without_watermark',
      'instagram_video_without_watermark',
      'instagram_dp_download_hd',
      'instagram_carousel_download',
      'instagram_reel_converter',
      'save_instagram_reels',
      'instagram_story_saver',
      'instagram_reels_download',
      'instagram_video_download',
      'instagram_story_download',
      'instagram_reels_downloader',
      'instagram_video_downloader'
    ],
    descPrefix: {
      en: 'Save your favorite Instagram content in original resolution instantly.',
      hi: 'अपनी पसंदीदा Instagram सामग्री को तुरंत मूल रिज़ॉल्यूशन में सहेजें।'
    }
  },
  tiktok: {
    name: 'TikTok',
    slugs: [
      'tiktok_video_download_without_watermark',
      'tiktok_mp3_download',
      'tiktok_reels_download',
      'tiktok_story_download',
      'tiktok_video_saver',
      'download_tiktok_video_online',
      'tiktok_downloader',
      'tiktok_video_downloader',
      'tiktok_download'
    ],
    descPrefix: {
      en: 'Download TikTok videos without watermark in high fidelity.',
      hi: 'बिना वॉटरमार्क के हाई क्वालिटी में TikTok वीडियो डाउनलोड करें।'
    }
  },
  facebook: {
    name: 'Facebook',
    slugs: [
      'facebook_video_download_hd',
      'facebook_reels_download',
      'facebook_private_video_downloader',
      'facebook_story_download',
      'fb_video_saver',
      'save_fb_reels',
      'facebook_video_download',
      'facebook_video_downloader',
      'facebook_reels_downloader'
    ],
    descPrefix: {
      en: 'High-speed Facebook video extraction service for HD and 4K content.',
      hi: 'HD और 4K सामग्री के लिए हाई-स्पीड Facebook वीडियो एक्सट्रैक्शन सेवा।'
    }
  },
  youtube: {
    name: 'YouTube',
    slugs: [
      'youtube_shorts_download',
      'youtube_video_download_hd',
      'youtube_to_mp4',
      'youtube_thumbnail_download',
      'yt_shorts_saver',
      'download_yt_video',
      'youtube_video_download',
      'youtube_downloader',
      'youtube_shorts_downloader'
    ],
    descPrefix: {
      en: 'Convert and save YouTube videos and shorts in premium quality.',
      hi: 'प्रीमियम क्वालिटी में YouTube वीडियो और शॉर्ट्स को कन्वर्ट और सेव करें।'
    }
  }
};

const localizedLabels = {
  en: {
    howToUse: 'How to use',
    howToDesc: 'Follow these simple steps to perform a {title} on Android, iPhone, or PC.',
    commonQuestions: 'FAQs about',
    safeQ: 'Is {title} safe for my device?',
    safeA: 'Absolutely. Our {title} service is server-side, meaning we process the link on our high-speed secure servers. No software or extension installation is needed on your mobile or computer.',
    limitQ: 'Is there a limit on {title}?',
    limitA: 'No! You can use our {title} service for unlimited daily downloads, 24/7, for free.',
    fastestTool: 'The fastest {title} tool for {platform} on the market.'
  },
  hi: {
    howToUse: 'कैसे उपयोग करें',
    howToDesc: 'Android, iPhone या PC पर {title} करने के लिए इन सरल चरणों का पालन करें।',
    commonQuestions: 'अक्सर पूछे जाने वाले प्रश्न:',
    safeQ: 'क्या {title} मेरे डिवाइस के लिए सुरक्षित है?',
    safeA: 'बिल्कुल। हमारी {title} सेवा सर्वर-साइड है, जिसका अर्थ है कि हम अपने हाई-स्पीड सुरक्षित सर्वर पर लिंक को प्रोसेस करते हैं। आपके मोबाइल या कंप्यूटर पर किसी सॉफ़्टवेयर या एक्सटेंशन को इंस्टॉल करने की आवश्यकता नहीं है।',
    limitQ: 'क्या {title} पर कोई सीमा है?',
    limitA: 'नहीं! आप मुफ्त में, 24/7, असीमित दैनिक डाउनलोड के लिए हमारी {title} सेवा का उपयोग कर सकते हैं।',
    fastestTool: 'बाजार में {platform} के लिए सबसे तेज़ {title} टूल।'
  }
};

function formatTitle(slug) {
  return slug.split('_').map(w => w === 'hd' ? 'HD' : w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function getIntent(slug, locale = 'en') {
  const langIntents = intents[locale] || intents.en;
  if (slug.includes('mp3') || slug.includes('audio')) return langIntents.mp3;
  if (slug.includes('story') || slug.includes('highlight') || slug.includes('saver')) return langIntents.story;
  if (slug.includes('hd') || slug.includes('8k') || slug.includes('4k')) return langIntents.hd;
  if (slug.includes('watermark')) return langIntents.watermark;
  return langIntents.default;
}

function generatePagesForPlatform(platformKey, config, locale = 'en', dict = {}) {
  const labels = localizedLabels[locale] || localizedLabels.en;
  const prefix = (config.descPrefix && config.descPrefix[locale]) || config.descPrefix?.en || "";
  const pages = {};
  
  config.slugs.forEach(slug => {
    const title = formatTitle(slug);
    const intent = getIntent(slug, locale);
    const existingPage = (dict.platforms && dict.platforms.seo_pages && dict.platforms.seo_pages[slug]) || {};
    
    pages[slug] = {
      title: title,
      subtitle: `${prefix} Best ${config.name} media tool for professionals.`,
      howTo: {
        name: `${labels.howToUse} ${title}`,
        description: labels.howToDesc.replace('{title}', title),
        steps: intent.steps.map(s => s.replace('{platform}', config.name))
      },
      seo: {
        title: `${title} - ${intent.titleSuffix}`,
        desc: intent.desc.replace('{platform}', config.name) + (locale === 'en' ? ` Join millions of global users who trust SavClip for their ${config.name} archiving needs.` : '')
      },
      faq: {
        title: `${labels.commonQuestions} ${title}`,
        items: [
          {
            q: labels.safeQ.replace('{title}', title),
            a: labels.safeA.replace('{title}', title)
          },
          {
            q: labels.limitQ.replace('{title}', title),
            a: labels.limitA.replace('{title}', title)
          }
        ]
      },
      desc: labels.fastestTool.replace('{title}', title).replace('{platform}', config.name),
      // Use massive template if existing is empty or too short
      article_content: (existingPage.article_content && existingPage.article_content.length > 500) 
        ? existingPage.article_content 
        : intent.article_content.replace(/{platform}/g, config.name)
    };
  });
  return pages;
}

const targetLocales = fs.readdirSync(path.join(process.cwd(), 'src/dictionaries'))
  .filter(file => file.endsWith('.json'))
  .map(file => file.replace('.json', ''));

targetLocales.forEach(locale => {
  const filePath = path.join(process.cwd(), `src/dictionaries/${locale}.json`);
  if (fs.existsSync(filePath)) {
    try {
      const dict = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      const platformPages = {};
      Object.entries(platformsConfig).forEach(([key, config]) => {
        Object.assign(platformPages, generatePagesForPlatform(key, config, locale, dict));
      });

      if (!dict.platforms) dict.platforms = {};
      dict.platforms.seo_pages = { ...dict.platforms.seo_pages, ...platformPages };
      fs.writeFileSync(filePath, JSON.stringify(dict, null, 2));
      console.log(`Successfully updated ${locale}.json with professional localized SEO content.`);
    } catch (e) {
      console.error(`Error processing ${locale}.json:`, e);
    }
  }
});
