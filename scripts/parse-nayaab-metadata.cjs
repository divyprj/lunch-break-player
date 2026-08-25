const fs = require('fs');
const path = require('path');
const { parseFile } = require('music-metadata');

// Official Nayaab track sequence
const nayaabOrder = [
  'Toh Kya',
  'Teen Dost',
  'Marne Ke Baad Bhi',
  'Gandi Aulaad',
  'Nayaab',
  'Batti',
  'Maina',
  'Chidiya Udd',
  'Choti Soch',
  'Dum Ghutte',
  'Khoj',
  'Jua',
  'Kohra',
  'Hoshiyaar',
  'Anaadi',
  'Rajdhani'
];

async function generateFullPlaylist() {
  const audioDir = path.join(__dirname, '..', 'public', 'audio');
  const files = fs.readdirSync(audioDir);

  // 1. Read existing Lunch Break tracks from tracks.js
  const currentTracksFile = fs.readFileSync(path.join(__dirname, '..', 'src', 'tracks.js'), 'utf8');

  // Let us parse all Nayaab tracks
  const nayaabAudioFiles = files.filter(f => f.includes('Nayaab') && f.endsWith('.m4a'));
  
  const nayaabParsed = [];
  for (const file of nayaabAudioFiles) {
    const filePath = path.join(audioDir, file);
    try {
      const metadata = await parseFile(filePath);
      let title = metadata.common.title;
      let artist = metadata.common.artist || 'Seedhe Maut, Sez on the Beat';

      // If tags are generic, derive from filename
      if (!title || title.includes('Official')) {
        const match = file.match(/'([^']+)'/);
        if (match) {
          title = match[1];
        } else {
          title = file.split('｜')[0].replace(/'/g, '').trim();
        }
      }

      // Format clean featured artist if present
      if (file.includes('AB17') && !artist.includes('AB17')) {
        artist = 'Seedhe Maut, Sez on the Beat, AB17';
      }

      nayaabParsed.push({
        rawFile: file,
        title: title.trim(),
        artist: artist.trim(),
        album: 'Nayaab',
        duration: Math.round(metadata.format.duration || 0),
        audioUrl: `/audio/${encodeURIComponent(file)}`
      });
    } catch (e) {
      console.error(`Error parsing ${file}:`, e);
    }
  }

  // Sort according to official track order
  nayaabParsed.sort((a, b) => {
    const idxA = nayaabOrder.findIndex(name => a.title.toLowerCase().includes(name.toLowerCase()));
    const idxB = nayaabOrder.findIndex(name => b.title.toLowerCase().includes(name.toLowerCase()));
    return (idxA === -1 ? 99 : idxA) - (idxB === -1 ? 99 : idxB);
  });

  console.log('Parsed Nayaab Tracks:', nayaabParsed.map((t, i) => `${i + 1}. ${t.title} (${t.duration}s)`));

  return nayaabParsed;
}

generateFullPlaylist().catch(console.error);
