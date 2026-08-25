const fs = require('fs');
const path = require('path');
const { parseFile } = require('music-metadata');

async function buildMasterTracks() {
  const audioDir = path.join(__dirname, '..', 'public', 'audio');
  
  // 1. Lunch Break tracks
  const lunchBreakTracksRaw = [
    { "title": "11K", "artist": "Seedhe Maut", "duration": 178, "file": "11K %5BSjXQd25qGZ4%5D.m4a" },
    { "title": "Brand New", "artist": "Seedhe Maut, Calm, Encore ABJ", "duration": 223, "file": "Brand New %5B_W1-lQf8YTI%5D.m4a" },
    { "title": "First Place", "artist": "Seedhe Maut, Calm, Encore ABJ", "duration": 184, "file": "First Place %5B_W29Y6j1aF8%5D.m4a" },
    { "title": "Focused", "artist": "Seedhe Maut, Calm, Encore ABJ", "duration": 204, "file": "Focused %5BuY99k0v0354%5D.m4a" },
    { "title": "Fanne Khan", "artist": "Seedhe Maut, Calm, Encore ABJ", "duration": 218, "file": "Fanne Khan %5BLJvLwh1p8pA%5D.m4a" },
    { "title": "Joint in the Booth", "artist": "Seedhe Maut, Calm, Encore ABJ", "duration": 140, "file": "Joint in the Booth %5BNXn86N1zBzs%5D.m4a" },
    { "title": "Khatta Flow", "artist": "Seedhe Maut, KR`$NA, Siddhant Sharma", "duration": 229, "file": "Khatta Flow %5BYP06QjR_pX4%5D.m4a" },
    { "title": "Asal G", "artist": "Seedhe Maut, Faris Shafi, Talal Qureshi", "duration": 214, "file": "Asal G %5BfgZ0uX7Vfss%5D.m4a" },
    { "title": "Peace of Mind", "artist": "Seedhe Maut, Calm, Encore ABJ", "duration": 175, "file": "Peace of Mind %5B1cT8hJg1L5o%5D.m4a" },
    { "title": "Swah!", "artist": "Seedhe Maut, Calm, Encore ABJ", "duration": 242, "file": "Swah! %5BEsM8m24K1nU%5D.m4a" },
    { "title": "Sick & Proper", "artist": "Seedhe Maut, Calm, Encore ABJ", "duration": 194, "file": "Sick & Proper %5Bg9Rk7p7581U%5D.m4a" },
    { "title": "Luka Chippi", "artist": "Seedhe Maut, Calm, Encore ABJ", "duration": 160, "file": "Luka Chippi %5BJq_jU_6F2Zk%5D.m4a" },
    { "title": "Kavi", "artist": "Seedhe Maut, Calm, Encore ABJ", "duration": 206, "file": "Kavi %5BR6b95zXo86c%5D.m4a" },
    { "title": "Champions", "artist": "Seedhe Maut, Rawal, Siddhant Sharma", "duration": 213, "file": "Champions %5BhNn67zR_1Fw%5D.m4a" },
    { "title": "Pushpak Vimaan", "artist": "Seedhe Maut, Calm, Encore ABJ", "duration": 167, "file": "Pushpak Vimaan %5B1kK6-0L6xI8%5D.m4a" },
    { "title": "Akatsuki", "artist": "Seedhe Maut, Calm, Encore ABJ", "duration": 162, "file": "Akatsuki %5Bq60J9N5rP2s%5D.m4a" },
    { "title": "Taakat", "artist": "Seedhe Maut, Calm, Encore ABJ", "duration": 182, "file": "Taakat %5Bq1wW5k4-t2U%5D.m4a" },
    { "title": "Naam Kaam Sheher", "artist": "Seedhe Maut, Calm, Encore ABJ", "duration": 234, "file": "Naam Kaam Sheher %5Bz4x4Yg6pM5k%5D.m4a" },
    { "title": "Khoon", "artist": "Seedhe Maut, Sikandar Kahlon, Siddhant Sharma", "duration": 205, "file": "Khoon %5Bq4w0b6JqN1w%5D.m4a" },
    { "title": "Lunch Break", "artist": "Seedhe Maut, Calm, Encore ABJ", "duration": 196, "file": "Lunch Break %5Bv2kY7pP32L4%5D.m4a" },
    { "title": "Dikkat", "artist": "Seedhe Maut, Calm, Encore ABJ", "duration": 194, "file": "Dikkat %5Bu8N6y8yV86k%5D.m4a" },
    { "title": "Baat Aisi Ghar Jaisi", "artist": "Seedhe Maut, Calm, Encore ABJ", "duration": 172, "file": "Baat Aisi Ghar Jaisi %5Bx4n5k_L1x3k%5D.m4a" },
    { "title": "Off Beat", "artist": "Seedhe Maut, Calm, Encore ABJ", "duration": 176, "file": "Off Beat %5Bn5x8k_p0324%5D.m4a" },
    { "title": "Kya Challa", "artist": "Seedhe Maut, Calm, Encore ABJ", "duration": 190, "file": "Kya Challa %5Bo8m2V1p85k8%5D.m4a" },
    { "title": "Sanki", "artist": "Seedhe Maut, Calm, Encore ABJ", "duration": 222, "file": "Sanki %5Bm6xY1vN697c%5D.m4a" },
    { "title": "IDK", "artist": "Seedhe Maut, Calm, Encore ABJ", "duration": 188, "file": "IDK %5Bp9N8x6n1v3w%5D.m4a" },
    { "title": "Jashan-E-Hiphop", "artist": "Seedhe Maut, Calm, Encore ABJ", "duration": 185, "file": "Jashan-E-Hiphop %5B1c1x8v46J8k%5D.m4a" },
    { "title": "Hola Amigo", "artist": "Seedhe Maut, Badshah, Siddhant Sharma", "duration": 204, "file": "Hola Amigo %5Bh-y1V6L8p9s%5D.m4a" },
    { "title": "W", "artist": "Seedhe Maut, Calm, Encore ABJ", "duration": 176, "file": "W %5BcV6sq4ByyK8%5D.m4a" }
  ];

  // 2. Nayaab tracks
  const nayaabTracksRaw = [
    { "title": "Toh Kya", "artist": "Seedhe Maut, Sez on the Beat", "duration": 180, "file": "'Toh Kya' (Official Lyric Video) ｜ Seedhe Maut x Sez on the Beat ｜ Nayaab [7TCXqyCK6yE].m4a" },
    { "title": "Teen Dost", "artist": "Seedhe Maut, Sez on the Beat", "duration": 168, "file": "'Teen Dost' (Official Lyric Video) ｜ Seedhe Maut x Sez on the Beat ｜ Nayaab [dYqx-GbFE5A].m4a" },
    { "title": "Marne Ke Baad Bhi…", "artist": "Seedhe Maut, Sez on the Beat", "duration": 212, "file": "'Marne Ke Baad Bhi…' (Official Lyric Video) ｜ Seedhe Maut x Sez on the Beat ｜ Nayaab [L9XS7BMo07k].m4a" },
    { "title": "Gandi Aulaad", "artist": "Seedhe Maut, Sez on the Beat", "duration": 218, "file": "'Gandi Aulaad' (Official Lyric Video) ｜ Seedhe Maut x Sez on the Beat ｜ Nayaab [Nq0X7zlR14o].m4a" },
    { "title": "Nayaab", "artist": "Seedhe Maut, Sez on the Beat", "duration": 128, "file": "'Nayaab' (Official Lyric Video) ｜ Seedhe Maut x Sez on the Beat ｜ Nayaab [blJQvjUfDdg].m4a" },
    { "title": "Batti", "artist": "Seedhe Maut, Sez on the Beat, AB17", "duration": 188, "file": "'Batti' (Official Lyric Video) ｜ Seedhe Maut x Sez on the Beat ft. AB17 ｜ Nayaab [ang7r_Br8bY].m4a" },
    { "title": "Maina", "artist": "Seedhe Maut, Sez on the Beat", "duration": 229, "file": "'Maina' (Official Lyric Video) ｜ Seedhe Maut x Sez on the Beat ｜ Nayaab [k-6ZDSIMEtY].m4a" },
    { "title": "Chidiya Udd", "artist": "Seedhe Maut, Sez on the Beat", "duration": 126, "file": "'Chidiya Udd’ (Official Lyric Video) ｜ Seedhe Maut x Sez on the Beat ｜ Nayaab [nbw96QEJJGM].m4a" },
    { "title": "Choti Soch", "artist": "Seedhe Maut, Sez on the Beat", "duration": 128, "file": "'Choti Soch' (Official Lyric Video) ｜ Seedhe Maut x Sez on the Beat ｜ Nayaab [aOOZgIhVIKg].m4a" },
    { "title": "Dum Ghutte", "artist": "Seedhe Maut, Sez on the Beat", "duration": 202, "file": "'Dum Ghutte' (Official Lyric Video) ｜ Seedhe Maut x Sez on the Beat ｜ Nayaab [Wsz28sZraTk].m4a" },
    { "title": "Khoj", "artist": "Seedhe Maut, Sez on the Beat", "duration": 220, "file": "'Khoj' (Official Lyric Video) ｜ Seedhe Maut x Sez on the Beat ｜ Nayaab [e04zr2dpHdY].m4a" },
    { "title": "Jua", "artist": "Seedhe Maut, Sez on the Beat", "duration": 160, "file": "'Jua' (Official Lyric Video) ｜ Seedhe Maut x Sez on the Beat ｜ Nayaab [WtZ4_lCCTZU].m4a" },
    { "title": "Kohra", "artist": "Seedhe Maut, Sez on the Beat", "duration": 246, "file": "'Kohra' (Official Lyric Video) ｜ Seedhe Maut x Sez on the Beat ｜ Nayaab [Dj2cCoSNovo].m4a" },
    { "title": "Hoshiyaar", "artist": "Seedhe Maut, Sez on the Beat", "duration": 194, "file": "'Hoshiyaar' (Official Lyric Video) ｜ Seedhe Maut x Sez on the Beat ｜ Nayaab [-zjSIPaHihk].m4a" },
    { "title": "Anaadi", "artist": "Seedhe Maut, Sez on the Beat", "duration": 199, "file": "'Anaadi' (Official Lyric Video) ｜ Seedhe Maut x Sez on the Beat ｜ Nayaab [vc-GlDwK6cc].m4a" },
    { "title": "Rajdhani", "artist": "Seedhe Maut, Sez on the Beat", "duration": 267, "file": "'Rajdhani' (Official Lyric Video) ｜ Seedhe Maut x Sez on the Beat ｜ Nayaab [ShJq33LoWxg].m4a" }
  ];

  let idCounter = 1;
  const tracksJsContent = `import lunchBreakVinyl from './assets/vinyl-cover.jpg';
import lunchBreakBg from './assets/background.webp';
import nayaabVinyl from './assets/nayaab-vinyl.jpg';
import nayaabBg from './assets/nayaab-background.webp';

export const ALBUMS = {
  'Lunch Break': {
    title: 'Lunch Break',
    artist: 'Seedhe Maut',
    cover: lunchBreakVinyl,
    background: lunchBreakBg,
    tracksCount: 29
  },
  'Nayaab': {
    title: 'Nayaab',
    artist: 'Seedhe Maut x Sez on the Beat',
    cover: nayaabVinyl,
    background: nayaabBg,
    tracksCount: 16
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
${lunchBreakTracksRaw.map((t, idx) => `  {
    id: "lb-${idx + 1}",
    title: ${JSON.stringify(t.title)},
    artist: ${JSON.stringify(t.artist)},
    album: "Lunch Break",
    duration: ${t.duration},
    cover: lunchBreakVinyl,
    background: lunchBreakBg,
    audioUrl: "/audio/${t.file}",
    aura: LUNCH_BREAK_AURAS[${idx % 10}]
  }`).join(',\n')},

  // --- NAYAAB (16 TRACKS) ---
${nayaabTracksRaw.map((t, idx) => `  {
    id: "nay-${idx + 1}",
    title: ${JSON.stringify(t.title)},
    artist: ${JSON.stringify(t.artist)},
    album: "Nayaab",
    duration: ${t.duration},
    cover: nayaabVinyl,
    background: nayaabBg,
    audioUrl: "/audio/${encodeURIComponent(t.file)}",
    aura: NAYAAB_AURAS[${idx % 7}]
  }`).join(',\n')}
];
`;

  fs.writeFileSync(path.join(__dirname, '..', 'src', 'tracks.js'), tracksJsContent, 'utf8');
  console.log(`Generated src/tracks.js with ${lunchBreakTracksRaw.length + nayaabTracksRaw.length} total tracks!`);
}

buildMasterTracks().catch(console.error);
