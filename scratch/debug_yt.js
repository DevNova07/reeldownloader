const { youtubeHandler } = require('../src/lib/handlers/youtube.ts');

async function test() {
  const url = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
  try {
    console.log("Testing youtubeHandler...");
    const result = await youtubeHandler(url);
    console.log("Result:", JSON.stringify(result, null, 2));
  } catch (err) {
    console.error("Error:", err);
  }
}

test();
