const fs = require('fs');
const path = 'src/dictionaries/en.json';
const d = JSON.parse(fs.readFileSync(path, 'utf8'));

const prefixMap = {
  'instagram': 'Download Instagram',
  'facebook': 'Download Facebook',
  'tiktok': 'Download TikTok',
  'youtube': 'Download YouTube',
  'snapchat': 'Download Snapchat',
  'twitter': 'Download Twitter',
  'x_': 'Download Twitter',
  'telegram': 'Download Telegram'
};

const suffixMap = {
  'video': 'Videos Without Watermark HD',
  'story': 'Stories and Highlights Online',
  'reels': 'Reels in High Resolution 4K',
  'photo': 'Photos and Profile Pictures',
  'mp3': 'MP3 and Audio Fast & Free',
  'hd': 'Videos in Ultra HD Quality',
  'downloader': 'Media and Videos Fast Online'
};

Object.keys(d.platforms.seo_pages).forEach(k => {
  let platform = '';
  Object.keys(prefixMap).forEach(p => {
    if (k.includes(p)) platform = p;
  });

  if (platform) {
    let type = 'downloader';
    Object.keys(suffixMap).forEach(s => {
      if (k.includes(s)) type = s;
    });

    const current = d.platforms.seo_pages[k];
    if (typeof current === 'object' && current.title) {
      const wordCount = current.title.split(' ').length;
      if (wordCount < 4) {
        current.title = `${prefixMap[platform]} ${suffixMap[type] || 'Media Online Free'}`;
      }
    }
  }
});

fs.writeFileSync(path, JSON.stringify(d, null, 2));
console.log('Successfully updated generic titles to long-tail keywords.');
