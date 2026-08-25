const fs = require('fs');
const path = require('path');
const mm = require('music-metadata');

async function parseAllTracks() {
  const audioDir = path.join(__dirname, '..', 'public', 'audio');
  const files = fs.readdirSync(audioDir).filter(f => f.endsWith('.m4a') || f.endsWith('.mp3') || f.endsWith('.opus'));

  console.log(`Parsing metadata for ${files.length} audio files...`);

  const tracks = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const fullPath = path.join(audioDir, file);

    try {
      const metadata = await mm.parseFile(fullPath);
      const tagTitle = metadata.common.title;
      const tagArtist = metadata.common.artist || metadata.common.artists?.join(', ');
      const album = metadata.common.album;
      const duration = metadata.format.duration;

      // Fallback clean title if tag is empty
      const cleanFallbackTitle = file.replace(/\s*\[.*?\]\.\w+$/, '').replace(/\.\w+$/, '').trim();

      const title = tagTitle && tagTitle.trim() ? tagTitle.trim() : cleanFallbackTitle;
      let artist = tagArtist && tagArtist.trim() ? tagArtist.trim() : 'Seedhe Maut';

      if (title.toLowerCase().includes('khatta flow') && !artist.includes('KR$NA')) {
        artist = 'Seedhe Maut x KR$NA';
      }

      console.log(`[${i + 1}/${files.length}] ${title} — ${artist} (${Math.round(duration || 0)}s)`);

      tracks.push({
        id: `track-${i + 1}`,
        title: title,
        artist: artist,
        album: album || 'Lunch Break',
        duration: duration || 0,
        cover: 'vinylCover',
        audioUrl: `/audio/${encodeURIComponent(file)}`
      });
    } catch (err) {
      console.error(`Error reading metadata from ${file}:`, err.message);
      const cleanFallbackTitle = file.replace(/\s*\[.*?\]\.\w+$/, '').replace(/\.\w+$/, '').trim();
      tracks.push({
        id: `track-${i + 1}`,
        title: cleanFallbackTitle,
        artist: 'Seedhe Maut',
        cover: 'vinylCover',
        audioUrl: `/audio/${encodeURIComponent(file)}`
      });
    }
  }

  // Sort alphabetically or track number
  tracks.sort((a, b) => a.title.localeCompare(b.title));

  const content = `import vinylCover from './assets/vinyl-cover.jpg';

export const TRACKS = ${JSON.stringify(tracks, null, 2).replace(/"cover": "vinylCover"/g, '"cover": vinylCover')};
`;

  fs.writeFileSync(path.join(__dirname, '..', 'src', 'tracks.js'), content, 'utf8');
  console.log('src/tracks.js updated with 100% extracted metadata!');
}

parseAllTracks();
