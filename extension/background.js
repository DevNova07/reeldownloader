// CONFIG - Replace with your production domain
const SITE_URL = "https://snap-red-gamma.vercel.app";

// 1. Create Context Menu on install
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "downloadInstaSnap",
        title: "Download with InstaSnap",
        contexts: ["link"]
    });
});

// 2. Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "downloadInstaSnap") {
        const url = info.linkUrl;
        if (url) {
            chrome.tabs.create({ 
                url: `${SITE_URL}/?url=${encodeURIComponent(url)}` 
            });
        }
    }
});
