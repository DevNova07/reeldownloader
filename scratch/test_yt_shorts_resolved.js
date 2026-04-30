
const fetch = require('node-fetch');

const API_KEY = "9ac29222efmsh81d43b990a8ce7dp17df2fjsn6f83cbfb17b7";
const SHORTS_URL = "https://www.youtube.com/shorts/HlX296_E2v0";

async function resolveUrl(url) {
    try {
        const response = await fetch(url, {
            method: 'GET',
            redirect: 'follow',
        });
        return response.url;
    } catch (err) {
        return url;
    }
}

async function testFastApi(url, name) {
    const resolvedUrl = await resolveUrl(url);
    console.log(`\nTesting Fast YouTube API for ${name} (Resolved: ${resolvedUrl})...`);
    try {
        const response = await fetch("https://snap-video3.p.rapidapi.com/download", {
            method: "POST",
            headers: {
                "x-rapidapi-key": API_KEY,
                "x-rapidapi-host": "snap-video3.p.rapidapi.com",
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({ url: resolvedUrl }).toString()
        });
        const result = await response.json();
        console.log(`Fast API Result (${name}):`, JSON.stringify(result, null, 2).substring(0, 500));
    } catch (err) {
        console.error(`Fast API Failed (${name}):`, err.message);
    }
}

testFastApi(SHORTS_URL, "Shorts Video");
