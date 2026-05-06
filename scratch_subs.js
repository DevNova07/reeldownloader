const subtitles = [
  "Download YouTube Videos in HD Quality",
  "Download Shorts Without Watermark (HD)",
  "Download YouTube Audio & MP3",
  "Download Movies & Clips in HD",
  "Download HD Video Thumbnails",
  "Save Shorts Videos Online Free",
  "Download Videos Without Watermark",
  "Download Videos Fast & Free",
  "Download Videos Online Free",
  "Download MP4 Videos in HD",
  "Convert Videos to MP4 HD",
  "Save Videos in HD Quality",
  "Download HD Videos Free",
  "Save Videos in HD Quality",
  "Download MP4 Videos Online",
  "Save YouTube Videos Fast",
  "Download Short Videos in HD",
  "Download Playlists Online Free",
  "Save Movies & Clips in HD",
  "Download Movie Clips Online",
  "Save Clips in HD Quality",
  "Download Video Clips Online",
  "Download YouTube Channel Videos",
  "Download Audio & Music MP3",
  "Download Videos Without Account",
  "Save Private YouTube Videos",
  "Download Videos APK HD",
  "Download Videos Using Links",
  "Download Videos from URL Fast",
  "Convert Videos to MP3 Online",
  "Save Videos in HD Quality",
  "Download MP4 Videos Online",
  "Convert Videos to MP4 HD",
  "Save Clips in HD Quality",
  "Download Videos Using URL",
  "Download Shorts Online HD",
  "Download High Quality MP3",
  "Download MP4 Videos in HD",
  "Download Ultra HD Videos",
  "Download Videos at High Speed",
  "Download Videos Without Ads",
  "Unlimited Video Downloads Free",
  "Secure Video Downloads Online",
  "Download YouTube Audio MP3",
  "Convert Videos to MP3 Online",
  "Convert Videos to MP4 HD",
  "Save Photos & Gallery Posts",
  "Download HD Video Thumbnails",
  "Save YouTube Shorts Fast",
  "Download Shorts Videos in HD",
  "Download YouTube Music MP3",
  "Download Movies Online HD",
  "Save Music & Audio Fast",
  "Download Movies in HD Quality",
  "Save Videos Without Watermark",
  "Download Videos Without Login",
  "Download Videos Using Links",
  "Save Videos from URL Fast",
  "Download Shorts in India HD",
  "Convert YouTube Videos to MP3",
  "Convert Videos to MP4 Online",
  "Save Gallery Posts & Media"
];

const titles = [
  "YouTube Downloader",
  "YouTube Shorts",
  "YouTube Music",
  "YouTube Movies",
  "YouTube Thumbnail Downloader",
  "YouTube Shorts Download",
  "YouTube Video Download",
  "YouTube Downloader",
  "YouTube Video Downloader",
  "YouTube MP4 Download",
  "YouTube to MP4",
  "Download YouTube Video",
  "YouTube Video Download HD",
  "YouTube Videos Without Watermark",
  "YouTube MP4 Downloader",
  "YouTube Video Saver",
  "YouTube Short Video Download",
  "YouTube Playlist Download",
  "YouTube Movie Download",
  "YouTube Movie Clips",
  "YouTube Clips Download",
  "YouTube Video Clips",
  "Channel Video Downloader",
  "YouTube Audio Download",
  "YouTube Downloader No Login",
  "Private Video Download",
  "YouTube Video Downloader APK",
  "YouTube Link Downloader",
  "YouTube Video Using Link",
  "YouTube Video to MP3",
  "Download YouTube Video",
  "YouTube MP4 Downloader",
  "YouTube to MP4",
  "YouTube Video Clips",
  "YouTube Video Using Link",
  "YouTube Shorts India",
  "YouTube to MP3 320kbps",
  "HD MP4 Downloader",
  "YouTube 4K Video Downloader",
  "High Speed YouTube Downloader",
  "No Ads YouTube Downloader",
  "Unlimited YouTube Downloader",
  "Safe YouTube Downloader",
  "HD Audio Downloader",
  "YouTube MP3 Converter",
  "YouTube MP4 Converter",
  "YouTube Gallery Saver",
  "YouTube Thumbnail Download",
  "YouTube Shorts Downloader",
  "YouTube Shorts",
  "YouTube Music",
  "YouTube Movies",
  "YouTube Music Downloader",
  "YouTube Movie Downloader",
  "YouTube Videos Without Watermark",
  "YouTube Downloader No Login",
  "YouTube Link Downloader",
  "YouTube Video Using Link",
  "YouTube Shorts India",
  "YouTube MP3 Converter",
  "YouTube MP4 Converter",
  "YouTube Gallery Saver"
];

const fs = require('fs');

// 1. Update en.json
const dict = JSON.parse(fs.readFileSync('src/dictionaries/en.json', 'utf8'));
const seoPages = dict.platforms.seo_pages;

for (let i = 5; i < 62; i++) { // dynamic keys usually start from index 5
  const t = titles[i];
  const s = subtitles[i];
  
  // Find key in seo_pages that matches this title
  const key = Object.keys(seoPages).find(k => seoPages[k].title === t);
  if (key) {
    seoPages[key].subtitle = s;
  } else {
    // If exact title not found, look for keys starting with youtube_ that don't have subtitle
    // This is risky, but some titles might be slightly different in the list.
    // Let's print out what didn't match.
    console.log(`Unmatched title: ${t}`);
  }
}

fs.writeFileSync('src/dictionaries/en.json', JSON.stringify(dict, null, 2));
console.log('en.json updated.');

