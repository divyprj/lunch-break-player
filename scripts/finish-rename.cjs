const fs = require('fs');
const path = require('path');

const audioDir = path.join(__dirname, '..', 'public', 'audio');

const nayaabMap = {
  'Toh Kya': 'nay-01-toh-kya.m4a',
  'Teen Dost': 'nay-02-teen-dost.m4a',
  'Marne Ke Baad': 'nay-03-marne-ke-baad-bhi.m4a',
  'Gandi Aulaad': 'nay-04-gandi-aulaad.m4a',
  'Nayaab': 'nay-05-nayaab.m4a',
  'Batti': 'nay-06-batti.m4a',
  'Maina': 'nay-07-maina.m4a',
  'Chidiya Udd': 'nay-08-chidiya-udd.m4a',
  'Choti Soch': 'nay-09-choti-soch.m4a',
  'Dum Ghutte': 'nay-10-dum-ghutte.m4a',
  'Khoj': 'nay-11-khoj.m4a',
  'Jua': 'nay-12-jua.m4a',
  'Kohra': 'nay-13-kohra.m4a',
  'Hoshiyaar': 'nay-14-hoshiyaar.m4a',
  'Anaadi': 'nay-15-anaadi.m4a',
  'Rajdhani': 'nay-16-rajdhani.m4a'
};

const files = fs.readdirSync(audioDir);

// 1. Rename W
const wFile = files.find(f => f.startsWith('W [') || f.startsWith('W.'));
if (wFile) {
  fs.renameSync(path.join(audioDir, wFile), path.join(audioDir, 'lb-29-w.m4a'));
  console.log('Renamed W to lb-29-w.m4a');
}

// 2. Rename Nayaab files
for (const f of files) {
  if (f.includes('Nayaab')) {
    for (const [key, target] of Object.entries(nayaabMap)) {
      if (f.includes(key)) {
        fs.renameSync(path.join(audioDir, f), path.join(audioDir, target));
        console.log(`Renamed NAY: "${f}" -> "${target}"`);
        break;
      }
    }
  }
}

console.log('All audio files renamed successfully!');
