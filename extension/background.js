// CONFIG - Replace with your production domain
// CONFIG - Production Domain
const SITE_URL = "https://savclip.net";

// 1. Create Context Menu on install
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "downloadSavClip",
        title: "Download with SavClip",
        contexts: ["link"]
    });
});

// 2. Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "downloadSavClip") {
        const url = info.linkUrl;
        if (url) {
            chrome.tabs.create({ 
                url: `${SITE_URL}/?url=${encodeURIComponent(url)}` 
            });
        }
    }
});
