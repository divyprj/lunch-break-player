const fs = require('fs');
const path = require('path');

const audioDir = path.join(__dirname, '..', 'public', 'audio');

const lunchBreakList = [
  { filePrefix: '11K', cleanName: 'lb-01-11k.m4a' },
  { filePrefix: 'Brand New', cleanName: 'lb-02-brand-new.m4a' },
  { filePrefix: 'First Place', cleanName: 'lb-03-first-place.m4a' },
  { filePrefix: 'Focused Sedated', cleanName: 'lb-04-focused-sedated.m4a' },
  { filePrefix: 'Fanne Khan', cleanName: 'lb-05-fanne-khan.m4a' },
  { filePrefix: 'Joint in the Booth', cleanName: 'lb-06-joint-in-the-booth.m4a' },
  { filePrefix: 'Khatta Flow', cleanName: 'lb-07-khatta-flow.m4a' },
  { filePrefix: 'Asal G', cleanName: 'lb-08-asal-g.m4a' },
  { filePrefix: 'Peace of Mind', cleanName: 'lb-09-peace-of-mind.m4a' },
  { filePrefix: 'Swah!', cleanName: 'lb-10-swah.m4a' },
  { filePrefix: 'Sick & Proper', cleanName: 'lb-11-sick-and-proper.m4a' },
  { filePrefix: 'Luka Chippi', cleanName: 'lb-12-luka-chippi.m4a' },
  { filePrefix: 'Kehna Chahte Hain', cleanName: 'lb-13-kehna-chahte-hain.m4a' },
  { filePrefix: 'Champions', cleanName: 'lb-14-champions.m4a' },
  { filePrefix: 'Pushpak Vimaan', cleanName: 'lb-15-pushpak-vimaan.m4a' },
  { filePrefix: 'Akatsuki', cleanName: 'lb-16-akatsuki.m4a' },
  { filePrefix: 'Taakat', cleanName: 'lb-17-taakat.m4a' },
  { filePrefix: 'Naam Kaam Sheher', cleanName: 'lb-18-naam-kaam-sheher.m4a' },
  { filePrefix: 'Khoon', cleanName: 'lb-19-khoon.m4a' },
  { filePrefix: 'Lunch Break', cleanName: 'lb-20-lunch-break.m4a' },
  { filePrefix: 'Dikkat', cleanName: 'lb-21-dikkat.m4a' },
  { filePrefix: 'Baat Aisi Ghar Jaisi', cleanName: 'lb-22-baat-aisi-ghar-jaisi.m4a' },
  { filePrefix: 'Off Beat', cleanName: 'lb-23-off-beat.m4a' },
  { filePrefix: 'Kya Challa', cleanName: 'lb-24-kya-challa.m4a' },
  { filePrefix: 'Khauf', cleanName: 'lb-25-khauf.m4a' },
  { filePrefix: "I Don't Miss That Life", cleanName: 'lb-26-i-dont-miss-that-life.m4a' },
  { filePrefix: 'Hausla', cleanName: 'lb-27-hausla.m4a' },
  { filePrefix: 'Pain', cleanName: 'lb-28-pain.m4a' },
  { filePrefix: 'W', cleanName: 'lb-29-w.m4a' }
];

const nayaabList = [
  { fileKeyword: 'Toh Kya', cleanName: 'nay-01-toh-kya.m4a', title: 'Toh Kya', artist: 'Seedhe Maut, Sez on the Beat', duration: 187 },
  { fileKeyword: 'Teen Dost', cleanName: 'nay-02-teen-dost.m4a', title: 'Teen Dost', artist: 'Seedhe Maut, Sez on the Beat', duration: 175 },
  { fileKeyword: 'Marne Ke Baad', cleanName: 'nay-03-marne-ke-baad-bhi.m4a', title: 'Marne Ke Baad Bhi…', artist: 'Seedhe Maut, Sez on the Beat', duration: 220 },
  { fileKeyword: 'Gandi Aulaad', cleanName: 'nay-04-gandi-aulaad.m4a', title: 'Gandi Aulaad', artist: 'Seedhe Maut, Sez on the Beat', duration: 226 },
  { fileKeyword: 'Nayaab', cleanName: 'nay-05-nayaab.m4a', title: 'Nayaab', artist: 'Seedhe Maut, Sez on the Beat', duration: 133 },
  { fileKeyword: 'Batti', cleanName: 'nay-06-batti.m4a', title: 'Batti', artist: 'Seedhe Maut, Sez on the Beat, AB17', duration: 196 },
  { fileKeyword: 'Maina', cleanName: 'nay-07-maina.m4a', title: 'Maina', artist: 'Seedhe Maut, Sez on the Beat', duration: 237 },
  { fileKeyword: 'Chidiya Udd', cleanName: 'nay-08-chidiya-udd.m4a', title: 'Chidiya Udd', artist: 'Seedhe Maut, Sez on the Beat', duration: 132 },
  { fileKeyword: 'Choti Soch', cleanName: 'nay-09-choti-soch.m4a', title: 'Choti Soch', artist: 'Seedhe Maut, Sez on the Beat', duration: 135 },
  { fileKeyword: 'Dum Ghutte', cleanName: 'nay-10-dum-ghutte.m4a', title: 'Dum Ghutte', artist: 'Seedhe Maut, Sez on the Beat', duration: 210 },
  { fileKeyword: 'Khoj', cleanName: 'nay-11-khoj.m4a', title: 'Khoj', artist: 'Seedhe Maut, Sez on the Beat', duration: 228 },
  { fileKeyword: 'Jua', cleanName: 'nay-12-jua.m4a', title: 'Jua', artist: 'Seedhe Maut, Sez on the Beat', duration: 167 },
  { fileKeyword: 'Kohra', cleanName: 'nay-13-kohra.m4a', title: 'Kohra', artist: 'Seedhe Maut, Sez on the Beat', duration: 255 },
  { fileKeyword: 'Hoshiyaar', cleanName: 'nay-14-hoshiyaar.m4a', title: 'Hoshiyaar', artist: 'Seedhe Maut, Sez on the Beat', duration: 202 },
  { fileKeyword: 'Anaadi', cleanName: 'nay-15-anaadi.m4a', title: 'Anaadi', artist: 'Seedhe Maut, Sez on the Beat', duration: 207 },
  { fileKeyword: 'Rajdhani', cleanName: 'nay-16-rajdhani.m4a', title: 'Rajdhani', artist: 'Seedhe Maut, Sez on the Beat', duration: 273 }
];

const allFiles = fs.readdirSync(audioDir);

// Rename Lunch Break files
for (const item of lunchBreakList) {
  const found = allFiles.find(f => !f.includes('Nayaab') && (f.startsWith(item.filePrefix) || f.toLowerCase().includes(item.filePrefix.toLowerCase())));
  if (found) {
    fs.renameSync(path.join(audioDir, found), path.join(audioDir, item.cleanName));
    console.log(`Renamed LB: "${found}" -> "${item.cleanName}"`);
  }
}

// Re-read files
const currentFiles = fs.readdirSync(audioDir);

// Rename Nayaab files
for (const item of nayaabList) {
  const found = currentFiles.find(f => (f.includes('Nayaab') || f.startsWith('nay-')) && f.toLowerCase().includes(item.fileKeyword.toLowerCase()));
  if (found && found !== item.cleanName) {
    fs.renameSync(path.join(audioDir, found), path.join(audioDir, item.cleanName));
    console.log(`Renamed NAY: "${found}" -> "${item.cleanName}"`);
  }
}

console.log('All audio files successfully renamed to clean URL-safe ASCII names!');
