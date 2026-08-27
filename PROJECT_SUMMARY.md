# seedhemaut.fm - Project Summary & Architecture Guide

### 📍 Local Dev Directory:
`C:\Users\suraj\dev\lunch-break-player`

### 🌐 Live Production URL:
👉 **[https://lunch-break-player.vercel.app/](https://lunch-break-player.vercel.app/)**

### 🐙 GitHub Repository:
👉 **[https://github.com/divyprj/lunch-break-player](https://github.com/divyprj/lunch-break-player)**
- **Branches**: `master` & `main` (kept in exact sync)

---

## 🎶 Discography & Audio Streaming (45 Tracks)

The project includes all **45 official studio tracks** in high-fidelity `.m4a` (AAC) format inside `public/audio/`:
- **Lunch Break Mixtape (29 Tracks)**: `lb-01-11k.m4a` through `lb-29-w.m4a`
- **Nayaab Album (16 Tracks)**: `nay-01-toh-kya.m4a` through `nay-16-rajdhani.m4a`

### ⚡ Key Audio Performance Features:
1. **Zero-Latency Stream Buffer**: Clean ASCII URLs served directly from Vercel's global CDN (`Content-Type: audio/mp4`, `Accept-Ranges: bytes`).
2. **Native MediaSession API**:
   - Pinned notification shade card with artwork, title, and artist on Android / iOS / Desktop.
   - Hardware media keys, Bluetooth steering wheel controls, and lock-screen seek/skip support.
3. **Proactive Adjacent Track Preloading**: Preloads the next track in the playlist into browser memory for 0ms transitions.
4. **Dynamic Background Cross-Dissolve**: 1000ms smooth cross-fade between Lunch Break and Nayaab 4K backdrop art when track album changes.
5. **Interactive Vinyl Disc**: Physics-based angular inertia simulation that spins when playing and coasts down smoothly on pause.
6. **Smart Drawer & Real-Time Search**: Unified tracklist drawer with real-time filtering, auto-scrolling to active track, and mobile keyboard-friendly focus.

---

## 🛠️ Quick Commands

### Run Locally (Vite Dev Server)
```bash
npm run dev
# Starts local server at http://localhost:5173
```

### Build for Production
```bash
npm run build
# Compiles output to dist/
```

### Deploy to GitHub & Vercel
```bash
git add .
git commit -m "your commit message"
git push origin master
git push origin master:main
```

---

## 📁 Project Structure

```text
C:\Users\suraj\dev\lunch-break-player\
├── public/
│   ├── audio/                      # All 45 studio tracks (.m4a)
│   │   ├── lb-01-11k.m4a ... lb-29-w.m4a
│   │   └── nay-01-toh-kya.m4a ... nay-16-rajdhani.m4a
│   ├── favicon.svg                 # SVG Brand Favicon
│   └── robots.txt
├── src/
│   ├── assets/
│   │   ├── background.webp         # 4K Lunch Break Backdrop
│   │   ├── nayaab-background.webp  # 4K Nayaab Backdrop
│   │   ├── vinyl-cover.jpg         # Lunch Break Vinyl Artwork
│   │   └── nayaab-vinyl.jpg        # Nayaab Vinyl Artwork
│   ├── App.jsx                     # Core player component & MediaSession handlers
│   ├── main.jsx                    # Root mount with Vercel Analytics & SpeedInsights
│   ├── tracks.js                   # Complete 45-track playlist & aura palettes
│   └── index.css                   # Tailwind v4 theme & equalizer animations
├── scripts/
│   ├── rename-and-build-tracks.cjs # Master audio mapping & track generator
│   └── verify-live.cjs             # Live Vercel HTTP health test script
├── index.html                      # HTML template with asset preloads & SEO
├── package.json                    # Project dependencies & scripts
├── README.md                       # Repository documentation
└── PROJECT_SUMMARY.md              # Complete persistent architecture summary
```
