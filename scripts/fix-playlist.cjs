const fs = require('fs');
const path = require('path');
const { parseFile } = require('music-metadata');

async function buildAccuratePlaylist() {
  const audioDir = path.join(__dirname, '..', 'public', 'audio');
  const allFiles = fs.readdirSync(audioDir).filter(f => f.endsWith('.m4a'));

  const lunchBreakOrder = [
    '11K', 'Brand New', 'First Place', 'Focused Sedated', 'Fanne Khan',
    'Joint in the Booth', 'Khatta Flow', 'Asal G', 'Peace of Mind',
    'Swah!', 'Sick & Proper', 'Luka Chippi', 'Kehna Chahte Hain...',
    'Champions', 'Pushpak Vimaan', 'Akatsuki', 'Taakat', 'Naam Kaam Sheher',
    'Khoon', 'Lunch Break', 'Dikkat', 'Baat Aisi Ghar Jaisi', 'Off Beat',
    'Kya Challa', 'Khauf', 'I Don\'t Miss That Life', 'Hausla', 'Pain', 'W'
  ];

  const nayaabOrder = [
    'Toh Kya', 'Teen Dost', 'Marne Ke Baad Bhi', 'Gandi Aulaad', 'Nayaab',
    'Batti', 'Maina', 'Chidiya Udd', 'Choti Soch', 'Dum Ghutte',
    'Khoj', 'Jua', 'Kohra', 'Hoshiyaar', 'Anaadi', 'Rajdhani'
  ];

  const lbParsed = [];
  const nayParsed = [];

  for (const file of allFiles) {
    const fullPath = path.join(audioDir, file);
    const meta = await parseFile(fullPath);
    let title = meta.common.title || '';
    let artist = meta.common.artist || 'Seedhe Maut';
    const isNayaab = file.includes('Nayaab');

    if (isNayaab) {
      if (!title || title.includes('Official')) {
        const match = file.match(/'([^']+)'/);
        if (match) title = match[1];
        else title = file.split('｜')[0].replace(/'/g, '').trim();
      }
      if (file.includes('AB17') && !artist.includes('AB17')) {
        artist = 'Seedhe Maut, Sez on the Beat, AB17';
      } else if (!artist.includes('Sez')) {
        artist = 'Seedhe Maut, Sez on the Beat';
      }
      nayParsed.push({
        title: title.trim(),
        artist: artist.trim(),
        album: 'Nayaab',
        duration: Math.round(meta.format.duration || 0),
        audioUrl: `/audio/${encodeURIComponent(file)}`
      });
    } else {
      if (!title) {
        title = file.replace(/\s*\[.*\]\.m4a$/, '').trim();
      }
      lbParsed.push({
        title: title.trim(),
        artist: artist.trim(),
        album: 'Lunch Break',
        duration: Math.round(meta.format.duration || 0),
        audioUrl: `/audio/${encodeURIComponent(file)}`
      });
    }
  }

  // Sort Lunch Break by official order
  lbParsed.sort((a, b) => {
    const idxA = lunchBreakOrder.findIndex(name => a.title.toLowerCase().startsWith(name.toLowerCase().slice(0, 4)));
    const idxB = lunchBreakOrder.findIndex(name => b.title.toLowerCase().startsWith(name.toLowerCase().slice(0, 4)));
    return (idxA === -1 ? 99 : idxA) - (idxB === -1 ? 99 : idxB);
  });

  // Sort Nayaab by official order
  nayParsed.sort((a, b) => {
    const idxA = nayaabOrder.findIndex(name => a.title.toLowerCase().includes(name.toLowerCase()));
    const idxB = nayaabOrder.findIndex(name => b.title.toLowerCase().includes(name.toLowerCase()));
    return (idxA === -1 ? 99 : idxA) - (idxB === -1 ? 99 : idxB);
  });

  console.log(`Lunch Break tracks: ${lbParsed.length}`);
  console.log(`Nayaab tracks: ${nayParsed.length}`);

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
  // --- LUNCH BREAK ---
${lbParsed.map((t, idx) => `  {
    id: "lb-${idx + 1}",
    title: ${JSON.stringify(t.title)},
    artist: ${JSON.stringify(t.artist)},
    album: "Lunch Break",
    duration: ${t.duration},
    cover: lunchBreakVinyl,
    background: lunchBreakBg,
    audioUrl: "${t.audioUrl}",
    aura: LUNCH_BREAK_AURAS[${idx % 10}]
  }`).join(',\n')},

  // --- NAYAAB ---
${nayParsed.map((t, idx) => `  {
    id: "nay-${idx + 1}",
    title: ${JSON.stringify(t.title)},
    artist: ${JSON.stringify(t.artist)},
    album: "Nayaab",
    duration: ${t.duration},
    cover: nayaabVinyl,
    background: nayaabBg,
    audioUrl: "${t.audioUrl}",
    aura: NAYAAB_AURAS[${idx % 7}]
  }`).join(',\n')}
];
`;

  fs.writeFileSync(path.join(__dirname, '..', 'src', 'tracks.js'), tracksJsContent, 'utf8');
  console.log('src/tracks.js created successfully with verified audio URLs!');
}

buildAccuratePlaylist().catch(console.error);
