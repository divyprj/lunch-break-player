const fs = require('fs');
const path = require('path');

const audioDir = path.join(__dirname, '..', 'public', 'audio');
const files = fs.readdirSync(audioDir).filter(f => f.endsWith('.m4a') || f.endsWith('.mp3') || f.endsWith('.opus'));

console.log('Found audio files:', files.length);

const cleanTitle = (filename) => {
  return filename
    .replace(/\s*\[.*?\]\.\w+$/, '')
    .replace(/\.\w+$/, '')
    .trim();
};

const tracks = files.map((file, i) => {
  const title = cleanTitle(file);
  let artist = 'Seedhe Maut';
  if (title.toLowerCase().includes('khatta flow')) artist = 'Seedhe Maut x KR$NA';
  else if (title.toLowerCase().includes('brand new')) artist = 'Seedhe Maut ft. Faris Shafi';
  else if (title.toLowerCase().includes('swah')) artist = 'Seedhe Maut ft. Badshah';
  else if (title.toLowerCase().includes('asal g')) artist = 'Seedhe Maut ft. Farhan Khan';
  
  return {
    id: 'track-' + (i + 1),
    title: title,
    artist: artist,
    cover: 'vinylCover',
    audioUrl: '/audio/' + encodeURIComponent(file)
  };
});

const content = `import vinylCover from './assets/vinyl-cover.jpg';

export const TRACKS = ${JSON.stringify(tracks, null, 2).replace(/"cover": "vinylCover"/g, '"cover": vinylCover')};
`;

fs.writeFileSync(path.join(__dirname, '..', 'src', 'tracks.js'), content, 'utf8');
console.log('src/tracks.js updated successfully with all ' + tracks.length + ' tracks!');
