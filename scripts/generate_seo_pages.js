const fs = require('fs');
const path = require('path');

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
      'instagram_story_saver'
    ],
    descPrefix: 'Save your favorite Instagram content in original resolution instantly.',
    seoTitleSuffix: 'Download Instagram Media in HD',
    steps: [
      'Find the Instagram post, reel, or story and copy the URL.',
      'Paste the link into the input field at the top of this page.',
      'Click "Download" to process and save the file in HD.'
    ]
  },
  tiktok: {
    name: 'TikTok',
    slugs: [
      'tiktok_video_download_without_watermark',
      'tiktok_mp3_download',
      'tiktok_reels_download',
      'tiktok_story_download',
      'tiktok_video_saver',
      'download_tiktok_video_online'
    ],
    descPrefix: 'Download TikTok videos without watermark in high fidelity.',
    seoTitleSuffix: 'TikTok Video Downloader No Watermark',
    steps: [
      'Open TikTok and copy the link of the video you want to save.',
      'Paste the TikTok link into our downloader box above.',
      'Click the "Download" button to get the video without any watermark.'
    ]
  },
  facebook: {
    name: 'Facebook',
    slugs: [
      'facebook_video_download_hd',
      'facebook_reels_download',
      'facebook_private_video_downloader',
      'facebook_story_download',
      'fb_video_saver',
      'save_fb_reels'
    ],
    descPrefix: 'High-speed Facebook video extraction service for HD and 4K content.',
    seoTitleSuffix: 'Facebook Video & Reels Downloader',
    steps: [
      'Navigate to the Facebook video or reel and copy its link.',
      'Paste the URL into the search bar on this page.',
      'Click "Download" and choose your preferred video quality.'
    ]
  },
  youtube: {
    name: 'YouTube',
    slugs: [
      'youtube_shorts_download',
      'youtube_video_download_hd',
      'youtube_to_mp4',
      'youtube_thumbnail_download',
      'yt_shorts_saver',
      'download_yt_video'
    ],
    descPrefix: 'Convert and save YouTube videos and shorts in premium quality.',
    seoTitleSuffix: 'YouTube Shorts & Video Downloader',
    steps: [
      'Copy the link of the YouTube video or Shorts from your browser or app.',
      'Paste the URL into our professional YouTube downloader tool.',
      'Select the format (MP4/MP3) and click "Download" to save.'
    ]
  },
  snapchat: {
    name: 'Snapchat',
    slugs: [
      'snapchat_video_download',
      'snapchat_spotlight_download',
      'snapchat_story_downloader',
      'snap_video_saver'
    ],
    descPrefix: 'Archive Snapchat spotlights and stories before they disappear.',
    seoTitleSuffix: 'Snapchat Spotlight & Story Downloader',
    steps: [
      'Find the Snapchat spotlight or story and copy the share link.',
      'Paste the link into our Snapchat extraction tool above.',
      'Click "Download" to fetch and save the original source media.'
    ]
  },
  twitter: {
    name: 'Twitter',
    slugs: [
      'twitter_video_download',
      'twitter_gif_download',
      'twitter_video_downloader_hd',
      'x_video_download'
    ],
    descPrefix: 'The fastest way to save videos and GIFs from X (formerly Twitter).',
    seoTitleSuffix: 'Twitter Video & GIF Downloader',
    steps: [
      'Copy the URL of the Tweet containing the video or GIF.',
      'Paste the link into our Twitter downloader search bar.',
      'Click "Download" to save the media as a high-quality MP4.'
    ]
  }
};

const localizedLabels = {
  en: {
    howToUse: 'How to use',
    howToDesc: 'Follow these simple steps to perform a {title} in seconds.',
    commonQuestions: 'Common Questions about',
    safeQ: 'Is {title} safe for my device?',
    safeA: 'Absolutely. Our {title} service is server-side, meaning we process the link on our high-speed servers. No software installation is needed.',
    limitQ: 'Is there a limit on {title}?',
    limitA: 'No! You can use our {title} service as many times as you like, 24/7, for free.',
    fastestTool: 'The fastest {title} tool for {platform} on the market.'
  },
  es: {
    howToUse: 'Cómo usar',
    howToDesc: 'Sigue estos sencillos pasos para realizar una {title} en segundos.',
    commonQuestions: 'Preguntas comunes sobre',
    safeQ: '¿Es {title} seguro para mi dispositivo?',
    safeA: 'Absolutamente. Nuestro servicio {title} es del lado del servidor, lo que significa que procesamos el enlace en nuestros servidores de alta velocidad. No se necesita instalación de software.',
    limitQ: '¿Hay un límite en {title}?',
    limitA: '¡No! Puedes usar nuestro servicio {title} tantas veces como quieras, las 24 horas, los 7 días de la semana, de forma gratuita.',
    fastestTool: 'La herramienta {title} más rápida para {platform} en el mercado.'
  },
  pt: {
    howToUse: 'Como usar',
    howToDesc: 'Siga estes passos simples para realizar um {title} em segundos.',
    commonQuestions: 'Perguntas comuns sobre',
    safeQ: 'O {title} é seguro para o meu dispositivo?',
    safeA: 'Com certeza. Nosso serviço {title} é processado no servidor, o que significa que lidamos com o link em nossos servidores de alta velocidade. Nenhuma instalação de software é necessária.',
    limitQ: 'Existe um limite para {title}?',
    limitA: 'Não! Você pode usar nosso serviço {title} quantas vezes quiser, 24 horas por dia, 7 dias por semana, gratuitamente.',
    fastestTool: 'A ferramenta {title} mais rápida para {platform} no mercado.'
  },
  id: {
    howToUse: 'Cara menggunakan',
    howToDesc: 'Ikuti langkah-langkah sederhana ini untuk melakukan {title} dalam hitungan detik.',
    commonQuestions: 'Pertanyaan umum tentang',
    safeQ: 'Apakah {title} aman untuk perangkat saya?',
    safeA: 'Tentu saja. Layanan {title} kami berbasis server, artinya kami memproses tautan di server berkecepatan tinggi kami. Tidak diperlukan instalasi perangkat lunak.',
    limitQ: 'Apakah ada batasan pada {title}?',
    limitA: 'Tidak! Anda dapat menggunakan layanan {title} kami sebanyak yang Anda mau, 24/7, secara gratis.',
    fastestTool: 'Alat {title} tercepat untuk {platform} di pasaran.'
  },
  ar: {
    howToUse: 'كيفية استخدام',
    howToDesc: 'اتبع هذه الخطوات البسيطة لإجراء {title} في ثوانٍ.',
    commonQuestions: 'أسئلة شائعة حول',
    safeQ: 'هل {title} آمن لجهازي؟',
    safeA: 'بالتأكيد. خدمة {title} الخاصة بنا تتم عبر الخادم، مما يعني أننا نعالج الرابط على خوادمنا عالية السرعة. لا حاجة لتثبيت أي برامج.',
    limitQ: 'هل هناك حد لـ {title}؟',
    limitA: 'لا! يمكنك استخدام خدمة {title} الخاصة بنا بقدر ما تريد، على مدار الساعة طوال أيام الأسبوع، مجانًا.',
    fastestTool: 'أسرع أداة {title} لـ {platform} في السوق.'
  }
};

function formatTitle(slug) {
  return slug.split('_').map(w => w === 'hd' ? 'HD' : w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function generatePagesForPlatform(platformKey, config, locale = 'en') {
  const labels = localizedLabels[locale] || localizedLabels.en;
  const pages = {};
  config.slugs.forEach(slug => {
    const title = formatTitle(slug);
    pages[slug] = {
      title: title,
      subtitle: `${config.descPrefix} Best ${config.name} media tool.`,
      howTo: {
        name: `${labels.howToUse} ${title}`,
        description: labels.howToDesc.replace('{title}', title),
        steps: config.steps
      },
      seo: {
        title: `${title} - ${config.seoTitleSuffix}`,
        desc: `Our ${title} tool is the premier choice for creators. In the digital age, being able to archive high-quality ${config.name} media is essential. Our service is optimized for speed, ensuring that even large files are processed in seconds. We prioritize your privacy; no account or login is ever required. Simply paste, click, and save. Join millions of users who trust SavClip for their ${config.name} needs every month. Compatible with iPhone, Android, and PC.`
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
      desc: labels.fastestTool.replace('{title}', title).replace('{platform}', config.name)
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
    const dict = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const platformPages = {};
    Object.entries(platformsConfig).forEach(([key, config]) => {
      Object.assign(platformPages, generatePagesForPlatform(key, config, locale));
    });

    dict.platforms.seo_pages = { ...dict.platforms.seo_pages, ...platformPages };
    fs.writeFileSync(filePath, JSON.stringify(dict, null, 2));
    console.log(`Successfully updated ${locale}.json with ${Object.keys(platformPages).length} SEO pages.`);
  }
});


