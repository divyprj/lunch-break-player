const https = require('https');

const endpoints = [
  '/',
  '/audio/lb-01-11k.m4a',
  '/audio/nay-01-toh-kya.m4a',
  '/audio/lb-29-w.m4a',
  '/audio/nay-16-rajdhani.m4a'
];

async function check() {
  console.log('--- Verifying Vercel Live Endpoints ---');
  for (const ep of endpoints) {
    await new Promise(resolve => {
      https.get('https://lunch-break-player.vercel.app' + ep, res => {
        console.log(`[${res.statusCode}] ${ep} -> Content-Type: ${res.headers['content-type']} | Bytes: ${res.headers['content-length']}`);
        resolve();
      }).on('error', err => {
        console.error(ep, err.message);
        resolve();
      });
    });
  }
  console.log('--- Verification Complete ---');
}
check();
