

async function testApi() {
  const host = 'youtube138.p.rapidapi.com';
  const key = '71b678b386mshfbf8544ef27b963p18d3fbjsn9603ed997f89';
  const videoId = 'dQw4w9WgXcQ'; // Never gonna give you up
  
  const urls = [
    `https://${host}/video/details/?id=${videoId}&hl=en&gl=US`,
    `https://${host}/video/streaming-data/?id=${videoId}&hl=en&gl=US`
  ];

  for (const url of urls) {
    console.log(`Testing URL: ${url}`);
    try {
      const res = await fetch(url, {
        headers: {
          'x-rapidapi-host': host,
          'x-rapidapi-key': key
        }
      });
      console.log(`Status: ${res.status}`);
      const data = await res.json();
      console.log('Keys in response:', Object.keys(data));
      if (data.streamingData) {
        console.log('Found streamingData!');
        console.log('Formats count:', data.streamingData.formats?.length || 0);
        console.log('Adaptive formats count:', data.streamingData.adaptiveFormats?.length || 0);
      }
    } catch (e) {
      console.error('Error:', e.message);
    }
  }
}

testApi();
