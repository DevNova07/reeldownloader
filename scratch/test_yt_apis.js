

const API_KEY = "9ac29222efmsh81d43b990a8ce7dp17df2fjsn6f83cbfb17b7";
const VIDEO_URL = "https://www.youtube.com/watch?v=aqz-KE-bpKQ"; // Sample video
const SHORTS_URL = "https://www.youtube.com/shorts/HlX296_E2v0"; // Sample shorts

async function testFastApi(url, name) {
    console.log(`\nTesting Fast YouTube API for ${name}...`);
    try {
        const response = await fetch("https://snap-video3.p.rapidapi.com/download", {
            method: "POST",
            headers: {
                "x-rapidapi-key": API_KEY,
                "x-rapidapi-host": "snap-video3.p.rapidapi.com",
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({ url: url }).toString()
        });
        const result = await response.json();
        console.log(`Fast API Result (${name}):`, JSON.stringify(result, null, 2).substring(0, 500));
    } catch (err) {
        console.error(`Fast API Failed (${name}):`, err.message);
    }
}

async function testComprehensiveApi(url, name) {
    console.log(`\nTesting Comprehensive YouTube API for ${name}...`);
    // Attempting videoId extraction for test
    const videoIdMatch = url.match(/(?:v=|youtu\.be\/|shorts\/)([^&?\/]+)/);
    const videoId = videoIdMatch ? videoIdMatch[1] : url;
    
    try {
        const response = await fetch(`https://youtube-media-downloader.p.rapidapi.com/v2/video/details?videoId=${encodeURIComponent(videoId)}`, {
            method: "GET",
            headers: {
                "x-rapidapi-key": API_KEY,
                "x-rapidapi-host": "youtube-media-downloader.p.rapidapi.com"
            }
        });
        const result = await response.json();
        console.log(`Comprehensive API Result (${name}):`, JSON.stringify(result, null, 2).substring(0, 500));
    } catch (err) {
        console.error(`Comprehensive API Failed (${name}):`, err.message);
    }
}

async function run() {
    await testFastApi(VIDEO_URL, "Standard Video");
    await testFastApi(SHORTS_URL, "Shorts Video");
    await testComprehensiveApi(VIDEO_URL, "Standard Video");
    await testComprehensiveApi(SHORTS_URL, "Shorts Video");
}

run();
