const host = 'hd-video-downloader.p.rapidapi.com';
const key = '9ac29222efmsh81d43b990a8ce7dp17df2fjsn6f83cbfb17b7';
const url = 'https://youtu.be/jNQXAC9IVRw'; // short link

async function testAll() {
  console.log(`Testing unencoded...`);
  try {
    const res = await fetch(`https://${host}/download?url=${url}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': host,
        'x-rapidapi-key': key
      }
    });
    console.log(`Status: ${res.status}`);
    const text = await res.text();
    console.log(`Response: ${text}`);
  } catch (e) {
    console.error(e.message);
  }
}

testAll();
