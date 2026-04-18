/**
 * InstaSnap Content Script
 * Injects download buttons directly into social media platforms.
 */

console.log("InstaSnap Content Script Loaded");

function injectButtons() {
    const hostname = window.location.hostname;
    
    if (hostname.includes('instagram.com')) {
        injectInstagram();
    } else if (hostname.includes('tiktok.com')) {
        injectTikTok();
    }
}

function injectInstagram() {
    // Look for the "Share" or "Comment" button in the action bar of Reels/Posts
    const actionBars = document.querySelectorAll('section > div > span:last-child');
    
    actionBars.forEach(bar => {
        if (bar.closest('article') && !bar.querySelector('.instasnap-btn')) {
            const btn = createSnapButton();
            btn.style.marginRight = "16px";
            btn.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                const url = window.location.href; // Usually correct for open posts
                window.open(`https://snap-red-gamma.vercel.app/?url=${encodeURIComponent(url)}`, '_blank');
            };
            bar.prepend(btn);
        }
    });
}

function injectTikTok() {
    // Look for video items action bars
    const tButtons = document.querySelectorAll('[data-e2e="feed-video-action-container"]');
    
    tButtons.forEach(bar => {
        if (!bar.querySelector('.instasnap-btn')) {
            const btn = createSnapButton();
            btn.style.marginTop = "10px";
            btn.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                const video = bar.closest('[data-e2e="feed-video-container"]');
                const url = video ? video.getAttribute('data-e2e-id') : window.location.href;
                window.open(`https://snap-red-gamma.vercel.app/?url=${encodeURIComponent(url)}`, '_blank');
            };
            bar.append(btn);
        }
    });
}

function createSnapButton() {
    const btn = document.createElement('div');
    btn.className = 'instasnap-btn';
    btn.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="cursor: pointer; transition: transform 0.2s;">
            <circle cx="12" cy="12" r="10" fill="#f01783" />
            <path d="M12 7V17M12 17L8 13M12 17L16 13" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    `;
    btn.title = "Download with InstaSnap";
    
    // Add hover effect
    const svg = btn.querySelector('svg');
    btn.onmouseenter = () => svg.style.transform = "scale(1.1)";
    btn.onmouseleave = () => svg.style.transform = "scale(1)";
    
    return btn;
}

// Run every 2 seconds to catch lazy-loaded content
setInterval(injectButtons, 2000);
injectButtons();
