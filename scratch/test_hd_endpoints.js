const host = 'hd-video-downloader.p.rapidapi.com';
const key = '9ac29222efmsh81d43b990a8ce7dp17df2fjsn6f83cbfb17b7';
const url = 'https://www.youtube.com/watch?v=jNQXAC9IVRw'; // Me at the zoo

const endpointsToTest = [
  { method: 'GET', path: `/download?url=${encodeURIComponent(url)}` },
  { method: 'GET', path: `/video?url=${encodeURIComponent(url)}` },
  { method: 'GET', path: `/social?url=${encodeURIComponent(url)}` },
  { method: 'GET', path: `/api/download?url=${encodeURIComponent(url)}` },
  { method: 'GET', path: `/extract?url=${encodeURIComponent(url)}` }
];

async function testAll() {
  for (const ep of endpointsToTest) {
    console.log(`\nTesting ${ep.method} ${ep.path}`);
    try {
      const res = await fetch(`https://${host}${ep.path}`, {
        method: ep.method,
        headers: {
          'x-rapidapi-host': host,
          'x-rapidapi-key': key
        }
      });
      console.log(`Status: ${res.status}`);
      const text = await res.text();
      console.log(`Response snippet: ${text.substring(0, 150)}`);
    } catch (e) {
      console.error(e.message);
    }
  }
}

testAll();
