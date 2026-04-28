

async function testApi() {
  const host = 'hd-video-downloader.p.rapidapi.com';
  const key = '9ac29222efmsh81d43b990a8ce7dp17df2fjsn6f83cbfb17b7';
  
  const urls = [
    'https://www.youtube.com/watch?v=jNQXAC9IVRw', // Me at the zoo (very short)
    'https://twitter.com/X/status/1715424726058053648' // Some twitter video
  ];

  for (const url of urls) {
    console.log(`Testing URL: ${url}`);
    try {
      const res = await fetch(`https://${host}/download?url=${encodeURIComponent(url)}`, {
        method: 'GET',
        headers: {
          'x-rapidapi-host': host,
          'x-rapidapi-key': key
        }
      });
      console.log(`Status: ${res.status}`);
      const data = await res.json();
      console.log('Response:', JSON.stringify(data, null, 2));
    } catch (e) {
      console.error('Error:', e.message);
    }
  }
}

testApi();
