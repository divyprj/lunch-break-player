const https = require('https');
const fs = require('fs');

const content = fs.readFileSync('src/tracks.js', 'utf-8');
const start = content.indexOf('export const TRACKS = [') + 'export const TRACKS = '.length;
const end = content.lastIndexOf('];') + 1;
const tracks = JSON.parse(content.slice(start, end));

async function testTracks() {
  console.log(`Testing first 25 tracks on https://lunch-break-player.vercel.app ...`);
  for (let i = 0; i < 25; i++) {
    const t = tracks[i];
    const url = 'https://lunch-break-player.vercel.app' + encodeURI(t.audioUrl);
    await new Promise(res => {
      https.request(url, { method: 'HEAD' }, r => {
        console.log(`#${i+1} [${r.statusCode}] ${t.title} -> ${r.headers['content-type']} | len: ${r.headers['content-length']}`);
        res();
      }).on('error', e => {
        console.log(`#${i+1} [ERR] ${t.title}: ${e.message}`);
        res();
      }).end();
    });
  }
}
testTracks();
