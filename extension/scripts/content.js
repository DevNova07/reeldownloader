/**
 * SavClip Content Script
 * Injects download buttons directly into social media platforms.
 */

console.log("SavClip Content Script Loaded");

function injectButtons() {
    const hostname = window.location.hostname;
    
    if (hostname.includes('instagram.com')) {
        injectInstagram();
    } else if (hostname.includes('tiktok.com')) {
        injectTikTok();
    } else if (hostname.includes('youtube.com')) {
        injectYouTube();
    } else if (hostname.includes('facebook.com')) {
        injectFacebook();
    } else if (hostname.includes('twitter.com') || hostname.includes('x.com')) {
        injectTwitter();
    } else if (hostname.includes('snapchat.com')) {
        injectSnapchat();
    }
}

function injectInstagram() {
    const actionBars = document.querySelectorAll('section > div > span:last-child');
    actionBars.forEach(bar => {
        if (bar.closest('article') && !bar.querySelector('.savclip-btn')) {
            const btn = createSnapButton();
            btn.style.marginRight = "16px";
            btn.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                const url = window.location.href;
                window.open(`https://savclip.net/?url=${encodeURIComponent(url)}`, '_blank');
            };
            bar.prepend(btn);
        }
    });
}

function injectTikTok() {
    const tButtons = document.querySelectorAll('[data-e2e="feed-video-action-container"]');
    tButtons.forEach(bar => {
        if (!bar.querySelector('.savclip-btn')) {
            const btn = createSnapButton();
            btn.style.marginTop = "10px";
            btn.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                const video = bar.closest('[data-e2e="feed-video-container"]');
                const url = video ? video.getAttribute('data-e2e-id') : window.location.href;
                window.open(`https://savclip.net/?url=${encodeURIComponent(url)}`, '_blank');
            };
            bar.append(btn);
        }
    });
}

function injectYouTube() {
    // Add button to Shorts action bar or Main Video action bar
    const actionBars = document.querySelectorAll('#actions.ytd-watch-metadata, #actions.ytd-reel-player-overlay-renderer');
    actionBars.forEach(bar => {
        if (!bar.querySelector('.savclip-btn')) {
            const btn = createSnapButton();
            btn.style.marginRight = "12px";
            btn.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                const url = window.location.href;
                window.open(`https://savclip.net/?url=${encodeURIComponent(url)}`, '_blank');
            };
            bar.prepend(btn);
        }
    });
}

function injectFacebook() {
    // Facebook DOM is highly dynamic. Let's add it near Share buttons
    const shareButtons = document.querySelectorAll('div[role="button"][tabindex="0"]');
    shareButtons.forEach(btn => {
        const text = btn.innerText ? btn.innerText.toLowerCase() : '';
        if ((text === "share" || text === "शेयर करें") && btn.parentElement && !btn.parentElement.querySelector('.savclip-btn')) {
            const snapBtn = createSnapButton();
            snapBtn.style.marginRight = "8px";
            snapBtn.style.alignSelf = "center";
            snapBtn.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                const url = window.location.href;
                window.open(`https://savclip.net/?url=${encodeURIComponent(url)}`, '_blank');
            };
            btn.parentElement.prepend(snapBtn);
        }
    });
}

function injectTwitter() {
    // Twitter/X action bar
    const actionBars = document.querySelectorAll('div[role="group"]');
    actionBars.forEach(bar => {
        if (!bar.querySelector('.savclip-btn') && bar.querySelectorAll('div[role="button"]').length >= 3) {
            const btn = createSnapButton();
            btn.style.marginLeft = "20px";
            btn.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                const article = bar.closest('article');
                const timeLink = article ? article.querySelector('a[href*="/status/"]') : null;
                const url = timeLink ? timeLink.href : window.location.href;
                window.open(`https://savclip.net/?url=${encodeURIComponent(url)}`, '_blank');
            };
            bar.append(btn);
        }
    });
}

function injectSnapchat() {
    // Snapchat Spotlight web
    const actionBars = document.querySelectorAll('div[class*="SpotlightActions"], div[class*="css-"]'); // Add fallback class if needed
    // Snapchat often uses obfuscated classes. A safe bet is looking for the share button svg
    const shareBtns = document.querySelectorAll('svg[aria-label="Share"], button[aria-label="Share"]');
    shareBtns.forEach(btn => {
        const bar = btn.closest('div');
        if (bar && !bar.parentElement.querySelector('.savclip-btn')) {
            const snapBtn = createSnapButton();
            snapBtn.style.marginTop = "15px";
            snapBtn.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                const url = window.location.href;
                window.open(`https://savclip.net/?url=${encodeURIComponent(url)}`, '_blank');
            };
            bar.parentElement.append(snapBtn);
        }
    });
}

function createSnapButton() {
    const btn = document.createElement('div');
    btn.className = 'savclip-btn';
    btn.innerHTML = `
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="cursor: pointer; transition: transform 0.2s;">
            <circle cx="12" cy="12" r="11" fill="#ec4899" />
            <path d="M12 7V17M12 17L8 13M12 17L16 13" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    `;
    btn.title = "Download with SavClip";
    btn.style.display = "flex";
    btn.style.alignItems = "center";
    btn.style.justifyContent = "center";
    btn.style.zIndex = "9999";
    
    // Add hover effect
    const svg = btn.querySelector('svg');
    btn.onmouseenter = () => { if (svg) svg.style.transform = "scale(1.15)"; };
    btn.onmouseleave = () => { if (svg) svg.style.transform = "scale(1)"; };
    
    return btn;
}

// Run every 2 seconds to catch lazy-loaded content
setInterval(injectButtons, 2000);
injectButtons();
