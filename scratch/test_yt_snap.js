

async function testYT() {
  const host = 'snap-video3.p.rapidapi.com';
  const key = '9ac29222efmsh81d43b990a8ce7dp17df2fjsn6f83cbfb17b7';
  const url = 'https://www.youtube.com/shorts/5FjWe31S_0g'; // A popular short

  console.log(`Testing URL: ${url}`);
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
    console.log(`Status: ${res.status}`);
    const data = await res.json();
    console.log(JSON.stringify(data, null, 2));
  } catch (e) {
    console.error('Error:', e.message);
  }
}

testYT();
