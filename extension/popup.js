// CONFIG - Replace with your production domain
const SITE_URL = "https://snap-red-gamma.vercel.app";

document.addEventListener('DOMContentLoaded', async () => {
    const urlInput = document.getElementById('urlInput');
    const downloadBtn = document.getElementById('downloadBtn');
    const platformName = document.getElementById('platformName');
    const dot = document.querySelector('.dot');
    const openWeb = document.getElementById('openWeb');
    const openHistory = document.getElementById('openHistory');

    // 1. Get current tab URL
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    if (tab && tab.url) {
        const url = tab.url;
        const platform = detectPlatform(url);
        
        if (platform) {
            urlInput.value = url;
            platformName.textContent = platform.charAt(0).toUpperCase() + platform.slice(1) + " Detected";
            dot.classList.add('active');
        }
    }

    // 2. Handle download button click
    downloadBtn.addEventListener('click', () => {
        const url = urlInput.value.trim();
        if (url) {
            chrome.tabs.create({ url: `${SITE_URL}/?url=${encodeURIComponent(url)}` });
        }
    });

    // 3. Platform Detection Logic
    function detectPlatform(url) {
        if (url.includes('instagram.com')) return 'instagram';
        if (url.includes('tiktok.com')) return 'tiktok';
        if (url.includes('facebook.com') || url.includes('fb.watch')) return 'facebook';
        if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube';
        if (url.includes('snapchat.com')) return 'snapchat';
        if (url.includes('twitter.com') || url.includes('x.com')) return 'twitter';
        return null;
    }

    // 4. Auxiliary links
    openWeb.addEventListener('click', (e) => {
        e.preventDefault();
        chrome.tabs.create({ url: SITE_URL });
    });

    openHistory.addEventListener('click', (e) => {
        e.preventDefault();
        chrome.tabs.create({ url: `${SITE_URL}/history` });
    });
});
