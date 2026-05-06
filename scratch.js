const fs = require('fs');
const dict = JSON.parse(fs.readFileSync('src/dictionaries/en.json', 'utf8'));
const keys = Object.keys(dict.platforms.seo_pages).filter(k => k.startsWith('youtube_') || k === 'yt_shorts_saver' || k === 'download_yt_video');
const physical = [
  { name: "YouTube Downloader", href: "/youtube" },
  { name: "Shorts Download", href: "/youtube/shorts" },
  { name: "Music Download", href: "/youtube/music" },
  { name: "Movies Download", href: "/youtube/movies" },
  { name: "Thumbnail Save", href: "/youtube/thumbnail" }
];
const dynamic = keys.map(k => {
  return { name: dict.platforms.seo_pages[k].title, href: "/" + k.replace(/_/g, '-') };
});
const all = [...physical, ...dynamic];
console.log(all.map(l => `                    { name: "${l.name}", href: "${l.href}" },`).join('\n'));
