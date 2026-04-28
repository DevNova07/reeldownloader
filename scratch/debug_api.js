async function debugApi() {
  const host = 'snap-video3.p.rapidapi.com';
  const key = '9ac29222efmsh81d43b990a8ce7dp17df2fjsn6f83cbfb17b7';
  const urls = [
    'https://twitter.com/X/status/1715424726058053648',
    'https://www.youtube.com/watch?v=aqz-KE-bpKQ'
  ];

  for (const url of urls) {
    console.log(`\nTesting URL: ${url}`);
    try {
      const res = await fetch(`https://${host}/download`, {
        method: 'POST',
        headers: {
          'x-rapidapi-host': host,
          'x-rapidapi-key': key,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({ url }).toString()
      });
      const data = await res.json();
      console.log(JSON.stringify(data, null, 2));
    } catch (e) {
      console.error('Error:', e.message);
    }
  }
}

debugApi();
