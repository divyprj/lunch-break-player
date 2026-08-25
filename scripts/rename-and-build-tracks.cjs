const fs = require('fs');
const path = require('path');

const audioDir = path.join(__dirname, '..', 'public', 'audio');
const files = fs.readdirSync(audioDir);

const nayaabOrder = [
  { match: 'Toh Kya', clean: 'nay-01-toh-kya.m4a', title: 'Toh Kya', artist: 'Seedhe Maut, Sez on the Beat', duration: 187 },
  { match: 'Teen Dost', clean: 'nay-02-teen-dost.m4a', title: 'Teen Dost', artist: 'Seedhe Maut, Sez on the Beat', duration: 175 },
  { match: 'Marne Ke Baad Bhi', clean: 'nay-03-marne-ke-baad-bhi.m4a', title: 'Marne Ke Baad Bhi…', artist: 'Seedhe Maut, Sez on the Beat', duration: 220 },
  { match: 'Gandi Aulaad', clean: 'nay-04-gandi-aulaad.m4a', title: 'Gandi Aulaad', artist: 'Seedhe Maut, Sez on the Beat', duration: 226 },
  { match: "'Nayaab'", clean: 'nay-05-nayaab.m4a', title: 'Nayaab', artist: 'Seedhe Maut, Sez on the Beat', duration: 133 },
  { match: 'Batti', clean: 'nay-06-batti.m4a', title: 'Batti', artist: 'Seedhe Maut, Sez on the Beat, AB17', duration: 196 },
  { match: 'Maina', clean: 'nay-07-maina.m4a', title: 'Maina', artist: 'Seedhe Maut, Sez on the Beat', duration: 237 },
  { match: 'Chidiya Udd', clean: 'nay-08-chidiya-udd.m4a', title: 'Chidiya Udd', artist: 'Seedhe Maut, Sez on the Beat', duration: 132 },
  { match: 'Choti Soch', clean: 'nay-09-choti-soch.m4a', title: 'Choti Soch', artist: 'Seedhe Maut, Sez on the Beat', duration: 135 },
  { match: 'Dum Ghutte', clean: 'nay-10-dum-ghutte.m4a', title: 'Dum Ghutte', artist: 'Seedhe Maut, Sez on the Beat', duration: 210 },
  { match: 'Khoj', clean: 'nay-11-khoj.m4a', title: 'Khoj', artist: 'Seedhe Maut, Sez on the Beat', duration: 228 },
  { match: 'Jua', clean: 'nay-12-jua.m4a', title: 'Jua', artist: 'Seedhe Maut, Sez on the Beat', duration: 167 },
  { match: 'Kohra', clean: 'nay-13-kohra.m4a', title: 'Kohra', artist: 'Seedhe Maut, Sez on the Beat', duration: 255 },
  { match: 'Hoshiyaar', clean: 'nay-14-hoshiyaar.m4a', title: 'Hoshiyaar', artist: 'Seedhe Maut, Sez on the Beat', duration: 202 },
  { match: 'Anaadi', clean: 'nay-15-anaadi.m4a', title: 'Anaadi', artist: 'Seedhe Maut, Sez on the Beat', duration: 207 },
  { match: 'Rajdhani', clean: 'nay-16-rajdhani.m4a', title: 'Rajdhani', artist: 'Seedhe Maut, Sez on the Beat', duration: 273 }
];

const lunchBreakOrder = [
  { match: '11K', clean: 'lb-01-11k.m4a', title: '11K', artist: 'Seedhe Maut', duration: 178 },
  { match: 'Brand New', clean: 'lb-02-brand-new.m4a', title: 'Brand New', artist: 'Seedhe Maut, Calm, Encore ABJ', duration: 223 },
  { match: 'First Place', clean: 'lb-03-first-place.m4a', title: 'First Place', artist: 'Seedhe Maut', duration: 132 },
  { match: 'Focused Sedated', clean: 'lb-04-focused-sedated.m4a', title: 'Focused Sedated', artist: 'Seedhe Maut', duration: 191 },
  { match: 'Fanne Khan', clean: 'lb-05-fanne-khan.m4a', title: 'Fanne Khan', artist: 'Seedhe Maut', duration: 260 },
  { match: 'Joint in the Booth', clean: 'lb-06-joint-in-the-booth.m4a', title: 'Joint in the Booth', artist: 'Seedhe Maut', duration: 177 },
  { match: 'Khatta Flow', clean: 'lb-07-khatta-flow.m4a', title: 'Khatta Flow', artist: 'Seedhe Maut, KR$NA', duration: 169 },
  { match: 'Asal G', clean: 'lb-08-asal-g.m4a', title: 'Asal G', artist: 'Seedhe Maut, Faris Shafi', duration: 236 },
  { match: 'Peace of Mind', clean: 'lb-09-peace-of-mind.m4a', title: 'Peace of Mind', artist: 'Seedhe Maut', duration: 251 },
  { match: 'Swah!', clean: 'lb-10-swah.m4a', title: 'Swah!', artist: 'Seedhe Maut, Badshah', duration: 297 },
  { match: 'Sick & Proper', clean: 'lb-11-sick-and-proper.m4a', title: 'Sick & Proper', artist: 'Seedhe Maut, Ayush', duration: 137 },
  { match: 'Luka Chippi', clean: 'lb-12-luka-chippi.m4a', title: 'Luka Chippi', artist: 'Seedhe Maut', duration: 153 },
  { match: 'Kehna Chahte Hain', clean: 'lb-13-kehna-chahte-hain.m4a', title: 'Kehna Chahte Hain...', artist: 'Seedhe Maut', duration: 114 },
  { match: 'Champions', clean: 'lb-14-champions.m4a', title: 'Champions', artist: 'Seedhe Maut', duration: 232 },
  { match: 'Pushpak Vimaan', clean: 'lb-15-pushpak-vimaan.m4a', title: 'Pushpak Vimaan', artist: 'Seedhe Maut', duration: 202 },
  { match: 'Akatsuki', clean: 'lb-16-akatsuki.m4a', title: 'Akatsuki', artist: 'Seedhe Maut', duration: 166 },
  { match: 'Taakat', clean: 'lb-17-taakat.m4a', title: 'Taakat', artist: 'Seedhe Maut', duration: 167 },
  { match: 'Naam Kaam Sheher', clean: 'lb-18-naam-kaam-sheher.m4a', title: 'Naam Kaam Sheher', artist: 'Seedhe Maut', duration: 177 },
  { match: 'Khoon', clean: 'lb-19-khoon.m4a', title: 'Khoon', artist: 'Seedhe Maut, Sikander Kahlon', duration: 175 },
  { match: 'Lunch Break [', clean: 'lb-20-lunch-break.m4a', title: 'Lunch Break', artist: 'Seedhe Maut, Sonny Chimienti', duration: 150 },
  { match: 'Dikkat', clean: 'lb-21-dikkat.m4a', title: 'Dikkat', artist: 'Seedhe Maut', duration: 170 },
  { match: 'Baat Aisi Ghar Jaisi', clean: 'lb-22-baat-aisi-ghar-jaisi.m4a', title: 'Baat Aisi Ghar Jaisi', artist: 'Seedhe Maut', duration: 191 },
  { match: 'Off Beat', clean: 'lb-23-off-beat.m4a', title: 'Off Beat', artist: 'Seedhe Maut, Ab 17', duration: 190 },
  { match: 'Kya Challa', clean: 'lb-24-kya-challa.m4a', title: 'Kya Challa', artist: 'Seedhe Maut', duration: 107 },
  { match: 'Khauf', clean: 'lb-25-khauf.m4a', title: 'Khauf', artist: 'Seedhe Maut, Bandzo3rd', duration: 193 },
  { match: "I Don't Miss That Life", clean: 'lb-26-i-dont-miss-that-life.m4a', title: "I Don't Miss That Life", artist: 'Seedhe Maut', duration: 184 },
  { match: 'Hausla', clean: 'lb-27-hausla.m4a', title: 'Hausla', artist: 'Seedhe Maut', duration: 147 },
  { match: 'Pain', clean: 'lb-28-pain.m4a', title: 'Pain', artist: 'Seedhe Maut', duration: 175 },
  { match: 'W [', clean: 'lb-29-w.m4a', title: 'W', artist: 'Seedhe Maut', duration: 191 }
];

// Perform rename
for (const item of lunchBreakOrder) {
  const found = files.find(f => f.includes(item.match));
  if (found) {
    fs.renameSync(path.join(audioDir, found), path.join(audioDir, item.clean));
    console.log(`Renamed LB: "${found}" -> "${item.clean}"`);
  } else {
    console.warn(`WARNING: Could not find LB file matching "${item.match}"`);
  }
}

for (const item of nayaabOrder) {
  const found = files.find(f => f.includes(item.match));
  if (found) {
    fs.renameSync(path.join(audioDir, found), path.join(audioDir, item.clean));
    console.log(`Renamed NAY: "${found}" -> "${item.clean}"`);
  } else {
    console.warn(`WARNING: Could not find NAY file matching "${item.match}"`);
  }
}

// Generate clean tracks.js
const tracksContent = `import lunchBreakVinyl from './assets/vinyl-cover.jpg';
import lunchBreakBg from './assets/background.webp';
import nayaabVinyl from './assets/nayaab-vinyl.jpg';
import nayaabBg from './assets/nayaab-background.webp';

export const ALBUMS = {
  'Lunch Break': {
    title: 'Lunch Break',
    artist: 'Seedhe Maut',
    cover: lunchBreakVinyl,
    background: lunchBreakBg,
  },
  'Nayaab': {
    title: 'Nayaab',
    artist: 'Seedhe Maut x Sez on the Beat',
    cover: nayaabVinyl,
    background: nayaabBg,
  }
};

const LUNCH_BREAK_AURAS = [
  { accent: '#f8f3d4', tint: 'rgba(248, 243, 212, 0.06)', glow: 'rgba(248, 243, 212, 0.30)' },
  { accent: '#d8ecff', tint: 'rgba(102, 164, 218, 0.08)', glow: 'rgba(102, 164, 218, 0.32)' },
  { accent: '#ffddd2', tint: 'rgba(214, 101, 70, 0.08)', glow: 'rgba(214, 101, 70, 0.28)' },
  { accent: '#e5f7c7', tint: 'rgba(153, 190, 96, 0.07)', glow: 'rgba(153, 190, 96, 0.30)' },
  { accent: '#fff3b8', tint: 'rgba(235, 189, 64, 0.07)', glow: 'rgba(235, 189, 64, 0.28)' },
  { accent: '#cde7ff', tint: 'rgba(79, 145, 204, 0.08)', glow: 'rgba(79, 145, 204, 0.32)' },
  { accent: '#f5d7ff', tint: 'rgba(171, 105, 190, 0.07)', glow: 'rgba(171, 105, 190, 0.28)' },
  { accent: '#d9ffe7', tint: 'rgba(95, 188, 131, 0.07)', glow: 'rgba(95, 188, 131, 0.30)' },
  { accent: '#ffe5bc', tint: 'rgba(205, 136, 54, 0.07)', glow: 'rgba(205, 136, 54, 0.26)' },
  { accent: '#d8fff8', tint: 'rgba(73, 176, 169, 0.07)', glow: 'rgba(73, 176, 169, 0.30)' },
];

const NAYAAB_AURAS = [
  { accent: '#f59e0b', tint: 'rgba(245, 158, 11, 0.09)', glow: 'rgba(245, 158, 11, 0.35)' },
  { accent: '#ef4444', tint: 'rgba(239, 68, 68, 0.08)', glow: 'rgba(239, 68, 68, 0.32)' },
  { accent: '#fbbf24', tint: 'rgba(251, 191, 36, 0.08)', glow: 'rgba(251, 191, 36, 0.30)' },
  { accent: '#ec4899', tint: 'rgba(236, 72, 153, 0.08)', glow: 'rgba(236, 72, 153, 0.30)' },
  { accent: '#f97316', tint: 'rgba(249, 115, 22, 0.08)', glow: 'rgba(249, 115, 22, 0.32)' },
  { accent: '#eab308', tint: 'rgba(234, 179, 8, 0.08)', glow: 'rgba(234, 179, 8, 0.30)' },
  { accent: '#f43f5e', tint: 'rgba(244, 63, 94, 0.08)', glow: 'rgba(244, 63, 94, 0.32)' },
];

export const TRACKS = [
  // --- LUNCH BREAK (29 TRACKS) ---
${lunchBreakOrder.map((t, idx) => `  {
    id: "lb-${idx + 1}",
    title: ${JSON.stringify(t.title)},
    artist: ${JSON.stringify(t.artist)},
    album: "Lunch Break",
    duration: ${t.duration},
    cover: lunchBreakVinyl,
    background: lunchBreakBg,
    audioUrl: "/audio/${t.clean}",
    aura: LUNCH_BREAK_AURAS[${idx % 10}]
  }`).join(',\n')},

  // --- NAYAAB (16 TRACKS) ---
${nayaabOrder.map((t, idx) => `  {
    id: "nay-${idx + 1}",
    title: ${JSON.stringify(t.title)},
    artist: ${JSON.stringify(t.artist)},
    album: "Nayaab",
    duration: ${t.duration},
    cover: nayaabVinyl,
    background: nayaabBg,
    audioUrl: "/audio/${t.clean}",
    aura: NAYAAB_AURAS[${idx % 7}]
  }`).join(',\n')}
];
`;

fs.writeFileSync(path.join(__dirname, '..', 'src', 'tracks.js'), tracksContent, 'utf8');
console.log('src/tracks.js generated with clean URLs for all 45 tracks!');
