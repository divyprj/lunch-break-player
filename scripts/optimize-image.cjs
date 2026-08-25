const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function optimizeWallpaper() {
  const inputPng = path.join(__dirname, '..', 'src', 'assets', 'background.png');
  const outputWebpSrc = path.join(__dirname, '..', 'src', 'assets', 'background.webp');
  const outputWebpPublic = path.join(__dirname, '..', 'public', 'background.webp');
  const outputPlaceholder = path.join(__dirname, '..', 'src', 'assets', 'background-placeholder.webp');

  console.log('Optimizing wallpaper...');

  // 1. High-Quality WebP (Visually Lossless 4K, ~500-700KB vs 7.3MB)
  await sharp(inputPng)
    .webp({ quality: 92, effort: 6, smartSubsample: true })
    .toFile(outputWebpSrc);

  fs.copyFileSync(outputWebpSrc, outputWebpPublic);

  // 2. Tiny Low-Res Placeholder for Instant Zero-Delay Blur-Up (15KB)
  await sharp(inputPng)
    .resize(64, 36)
    .webp({ quality: 40 })
    .toFile(outputPlaceholder);

  const pngSize = (fs.statSync(inputPng).size / 1024 / 1024).toFixed(2);
  const webpSize = (fs.statSync(outputWebpSrc).size / 1024).toFixed(2);

  console.log(`Original PNG: ${pngSize} MB`);
  console.log(`Optimized WebP: ${webpSize} KB (Reduction: ${(100 - (webpSize / (pngSize * 1024)) * 100).toFixed(1)}%)`);
}

optimizeWallpaper().catch(console.error);
