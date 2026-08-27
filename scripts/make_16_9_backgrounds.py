import os
import sys
import glob
import json
from concurrent.futures import ThreadPoolExecutor
from PIL import Image, ImageFilter, ImageEnhance, ImageDraw

PROJECT_DIR = r"C:\Dev\lunch-break-player"
COVERS_DIR = os.path.join(PROJECT_DIR, "public", "covers")
BG_DIR = os.path.join(PROJECT_DIR, "public", "backgrounds")
SRC_DIR = os.path.join(PROJECT_DIR, "src")

os.makedirs(BG_DIR, exist_ok=True)

TARGET_W, TARGET_H = 1920, 1080
CENTER_SIZE = 1080
FEATHER_W = 280

# Pre-create feathered mask for 1080x1080
mask = Image.new("L", (CENTER_SIZE, CENTER_SIZE), 255)
draw = ImageDraw.Draw(mask)
for x in range(FEATHER_W):
    alpha = int(255 * (x / FEATHER_W) ** 1.4)
    draw.line([(x, 0), (x, CENTER_SIZE)], fill=alpha)
    draw.line([(CENTER_SIZE - 1 - x, 0), (CENTER_SIZE - 1 - x, CENTER_SIZE)], fill=alpha)

def process_cover_to_16_9(cover_path):
    filename = os.path.basename(cover_path)
    slug = os.path.splitext(filename)[0]
    out_path = os.path.join(BG_DIR, f"{slug}.jpg")
    
    if os.path.exists(out_path) and os.path.getsize(out_path) > 1000:
        return f"/backgrounds/{slug}.jpg"
        
    try:
        with Image.open(cover_path) as img:
            img = img.convert("RGB")
            
            # 1. Base Blurred Widescreen 16:9 Layer
            base_bg = img.resize((TARGET_W, TARGET_H), Image.Resampling.LANCZOS)
            base_bg = base_bg.filter(ImageFilter.GaussianBlur(radius=55))
            base_bg = ImageEnhance.Brightness(base_bg).enhance(0.42)
            base_bg = ImageEnhance.Color(base_bg).enhance(1.35)
            
            # 2. Centered un-distorted Cover with feathered edges
            center_cover = img.resize((CENTER_SIZE, CENTER_SIZE), Image.Resampling.LANCZOS)
            center_cover_dark = ImageEnhance.Brightness(center_cover).enhance(0.72)
            
            offset_x = (TARGET_W - CENTER_SIZE) // 2
            base_bg.paste(center_cover_dark, (offset_x, 0), mask)
            
            base_bg.save(out_path, "JPEG", quality=90)
            return f"/backgrounds/{slug}.jpg"
    except Exception as e:
        print(f"Error processing {filename}: {e}")
        return f"/covers/{filename}"

def main():
    cover_files = sorted(glob.glob(os.path.join(COVERS_DIR, "*.jpg")))
    print(f"Converting {len(cover_files)} 1:1 covers into 16:9 widescreen wallpapers...")
    
    with ThreadPoolExecutor(max_workers=8) as executor:
        list(executor.map(process_cover_to_16_9, cover_files))
        
    print("All 16:9 backgrounds generated!")
    
    # Update tracks.js with 16:9 background paths
    tracks_js_path = os.path.join(SRC_DIR, "tracks.js")
    with open(tracks_js_path, "r", encoding="utf-8") as f:
        content = f.read()
        
    import re
    json_match = re.search(r"export const TRACKS = (\[[\s\S]*?\]);", content)
    if json_match:
        tracks = json.loads(json_match.group(1))
        for t in tracks:
            cover_path = t.get("cover", "")
            slug = os.path.splitext(os.path.basename(cover_path))[0]
            bg_path = f"/backgrounds/{slug}.jpg"
            t["background"] = bg_path
            
        new_js = f"""// Auto-generated master discography for seedhemaut.fm ({len(tracks)} tracks with 16:9 backgrounds)
import lunchBreakVinyl from './assets/vinyl-cover.jpg';
import lunchBreakBg from './assets/background.webp';
import nayaabVinyl from './assets/nayaab-vinyl.jpg';
import nayaabBg from './assets/nayaab-background.webp';

export const ALBUMS = {{
  'Lunch Break': {{
    title: 'Lunch Break',
    artist: 'Seedhe Maut',
    cover: lunchBreakVinyl,
    background: lunchBreakBg,
  }},
  'Nayaab': {{
    title: 'Nayaab',
    artist: 'Seedhe Maut x Sez on the Beat',
    cover: nayaabVinyl,
    background: nayaabBg,
  }}
}};

export const TRACKS = {json.dumps(tracks, indent=2, ensure_ascii=False)};
"""
        with open(tracks_js_path, "w", encoding="utf-8") as f:
            f.write(new_js)
        print("Updated src/tracks.js with 16:9 background references!")

if __name__ == "__main__":
    main()
