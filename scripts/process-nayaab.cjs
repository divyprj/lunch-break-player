const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function processNayaabAssets() {
  const downloadsDir = 'C:/Users/suraj/Downloads';
  const vinylSrc = path.join(downloadsDir, 'a2609058159_10.jpg');
  const bgSrc = path.join(downloadsDir, 'SM NAYAAB.png');

  const assetsDir = path.join(__dirname, '..', 'src', 'assets');
  const publicDir = path.join(__dirname, '..', 'public');
  const audioDir = path.join(publicDir, 'audio');

  if (!fs.existsSync(audioDir)) fs.mkdirSync(audioDir, { recursive: true });

  // 1. Copy vinyl cover
  console.log('Copying Nayaab vinyl cover...');
  fs.copyFileSync(vinylSrc, path.join(assetsDir, 'nayaab-vinyl.jpg'));
  fs.copyFileSync(vinylSrc, path.join(publicDir, 'nayaab-vinyl.jpg'));

  // 2. Optimize Nayaab background to 4K WebP
  console.log('Optimizing Nayaab background...');
  await sharp(bgSrc)
    .webp({ quality: 92, effort: 6, smartSubsample: true })
    .toFile(path.join(assetsDir, 'nayaab-background.webp'));
  
  fs.copyFileSync(path.join(assetsDir, 'nayaab-background.webp'), path.join(publicDir, 'nayaab-background.webp'));

  // 3. Copy 16 audio files
  console.log('Copying 16 Nayaab audio files...');
  const files = fs.readdirSync(downloadsDir);
  const nayaabFiles = files.filter(f => f.includes('Nayaab') && f.endsWith('.m4a'));

  nayaabFiles.forEach(file => {
    const srcPath = path.join(downloadsDir, file);
    const destPath = path.join(audioDir, file);
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied: ${file}`);
  });

  console.log('Nayaab assets processed successfully!');
}

processNayaabAssets().catch(console.error);
