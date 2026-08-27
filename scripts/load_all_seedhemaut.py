import os
import sys
import glob
import json
import re
import shutil
import subprocess
from concurrent.futures import ThreadPoolExecutor
from mutagen.flac import FLAC
from PIL import Image, ImageFilter

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

# Directories
SOURCE_DIR = r"C:\Users\suraj\Downloads\seedhemaut"
SOURCE_TRACKS = os.path.join(SOURCE_DIR, "tracks")
SOURCE_COVERS = os.path.join(SOURCE_DIR, "covers")

PROJECT_DIR = r"C:\Dev\lunch-break-player"
PUBLIC_AUDIO_DIR = os.path.join(PROJECT_DIR, "public", "audio")
PUBLIC_COVERS_DIR = os.path.join(PROJECT_DIR, "public", "covers")
PUBLIC_BG_DIR = os.path.join(PROJECT_DIR, "public", "backgrounds")
SRC_DIR = os.path.join(PROJECT_DIR, "src")

os.makedirs(PUBLIC_AUDIO_DIR, exist_ok=True)
os.makedirs(PUBLIC_COVERS_DIR, exist_ok=True)
os.makedirs(PUBLIC_BG_DIR, exist_ok=True)

def sanitize_slug(name: str) -> str:
    name = re.sub(r"[^\w\s-]", "", name).strip().lower()
    return re.sub(r"[-\s]+", "-", name)

# Color palettes for auras
AURA_PALETTES = [
    {"accent": "#f8f3d4", "tint": "rgba(248, 243, 212, 0.07)", "glow": "rgba(248, 243, 212, 0.32)"},
    {"accent": "#f59e0b", "tint": "rgba(245, 158, 11, 0.09)", "glow": "rgba(245, 158, 11, 0.35)"},
    {"accent": "#ef4444", "tint": "rgba(239, 68, 68, 0.08)", "glow": "rgba(239, 68, 68, 0.32)"},
    {"accent": "#38bdf8", "tint": "rgba(56, 189, 248, 0.08)", "glow": "rgba(56, 189, 248, 0.32)"},
    {"accent": "#10b981", "tint": "rgba(16, 185, 129, 0.08)", "glow": "rgba(16, 185, 129, 0.30)"},
    {"accent": "#a855f7", "tint": "rgba(168, 85, 247, 0.08)", "glow": "rgba(168, 85, 247, 0.32)"},
    {"accent": "#ec4899", "tint": "rgba(236, 72, 153, 0.08)", "glow": "rgba(236, 72, 153, 0.30)"},
    {"accent": "#fbbf24", "tint": "rgba(251, 191, 36, 0.08)", "glow": "rgba(251, 191, 36, 0.30)"},
    {"accent": "#f97316", "tint": "rgba(249, 115, 22, 0.08)", "glow": "rgba(249, 115, 22, 0.32)"},
    {"accent": "#4ade80", "tint": "rgba(74, 222, 128, 0.08)", "glow": "rgba(74, 222, 128, 0.30)"},
    {"accent": "#e879f9", "tint": "rgba(232, 121, 249, 0.08)", "glow": "rgba(232, 121, 249, 0.30)"},
    {"accent": "#2dd4bf", "tint": "rgba(45, 212, 191, 0.08)", "glow": "rgba(45, 212, 191, 0.32)"}
]

def make_16_9_wallpaper(square_img_path, output_path, target_width=1920, target_height=1080):
    try:
        with Image.open(square_img_path) as original:
            original = original.convert("RGB")
            
            # Ambient background: stretch and blur
            bg = original.resize((target_width, target_height), Image.Resampling.BILINEAR)
            bg = bg.filter(ImageFilter.GaussianBlur(radius=45))
            
            # Subtle dark vignette overlay
            from PIL import ImageEnhance
            enhancer = ImageEnhance.Brightness(bg)
            bg = enhancer.enhance(0.40)
            
            # Center foreground: sharp, un-distorted square
            fg_size = target_height
            fg = original.resize((fg_size, fg_size), Image.Resampling.LANCZOS)
            
            offset_x = (target_width - fg_size) // 2
            
            # Soft feathered mask for seamless blending
            mask = Image.new("L", (fg_size, fg_size), 255)
            feather_width = int(fg_size * 0.08)
            for x in range(feather_width):
                alpha = int(255 * (x / feather_width))
                for y in range(fg_size):
                    mask.putpixel((x, y), min(mask.getpixel((x, y)), alpha))
                    mask.putpixel((fg_size - 1 - x, y), min(mask.getpixel((fg_size - 1 - x, y)), alpha))
            
            bg.paste(fg, (offset_x, 0), mask)
            bg.save(output_path, "JPEG", quality=88)
            return True
    except Exception as e:
        print(f"Error creating 16:9 for {square_img_path}: {e}")
        return False

def process_single_track(flac_path):
    base_name = os.path.splitext(os.path.basename(flac_path))[0]
    
    # Read FLAC tags
    try:
        audio = FLAC(flac_path)
        title = audio.get("title", [base_name.split(" - ")[-1]])[0]
        artist_tags = audio.get("artist", ["Seedhe Maut"])
        artist = ", ".join(artist_tags) if isinstance(artist_tags, list) else str(artist_tags)
        album = audio.get("album", ["Singles & Features"])[0]
        duration = int(round(audio.info.length))
    except Exception:
        parts = base_name.split(" - ")
        if len(parts) >= 2:
            artist = parts[0]
            title = parts[1]
        else:
            artist = "Seedhe Maut"
            title = base_name
        album = "Singles & Features"
        duration = 180
    
    slug = sanitize_slug(f"{artist}-{title}")
    if not slug or len(slug) < 3:
        slug = sanitize_slug(base_name)
        
    m4a_name = f"{slug}.m4a"
    m4a_dest = os.path.join(PUBLIC_AUDIO_DIR, m4a_name)
    
    # 1. Transcode audio with -vn
    if not os.path.exists(m4a_dest) or os.path.getsize(m4a_dest) < 1000:
        cmd = [
            "ffmpeg", "-y", "-i", flac_path,
            "-vn", "-map", "0:a:0",
            "-c:a", "aac", "-b:a", "256k",
            "-movflags", "+faststart",
            m4a_dest
        ]
        subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
        
    # 2. Process Cover Artwork & 16:9 Background
    cover_name = f"{slug}.jpg"
    cover_dest = os.path.join(PUBLIC_COVERS_DIR, cover_name)
    bg_dest = os.path.join(PUBLIC_BG_DIR, cover_name)
    
    source_cover = os.path.join(SOURCE_COVERS, f"{base_name}.jpg")
    if not os.path.exists(source_cover):
        # Fallback search in SOURCE_DIR
        alt_cover = os.path.join(SOURCE_DIR, f"{base_name}.jpg")
        if os.path.exists(alt_cover):
            source_cover = alt_cover

    if os.path.exists(source_cover):
        if not os.path.exists(cover_dest) or os.path.getsize(cover_dest) < 500:
            try:
                with Image.open(source_cover) as img:
                    img = img.convert("RGB")
                    img = img.resize((600, 600), Image.Resampling.LANCZOS)
                    img.save(cover_dest, "JPEG", quality=90)
            except Exception:
                shutil.copy(source_cover, cover_dest)
                
        if not os.path.exists(bg_dest) or os.path.getsize(bg_dest) < 1000:
            make_16_9_wallpaper(cover_dest if os.path.exists(cover_dest) else source_cover, bg_dest)
    else:
        # If no cover found, use default vinyl cover
        default_cover = os.path.join(PROJECT_DIR, "src", "assets", "vinyl-cover.jpg")
        if os.path.exists(default_cover):
            shutil.copy(default_cover, cover_dest)
            make_16_9_wallpaper(default_cover, bg_dest)

    return {
        "id": f"sm-{slug}",
        "title": title,
        "artist": artist,
        "album": album,
        "duration": duration,
        "audioUrl": f"/audio/{m4a_name}",
        "cover": f"/covers/{cover_name}",
        "background": f"/backgrounds/{cover_name}",
        "base_name": base_name
    }

def generate_tracks_js(tracks):
    js_content = f"""// Auto-generated master discography for seedhemaut.fm ({len(tracks)} tracks)
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
  }},
  'Bayaan': {{
    title: 'Bayaan',
    artist: 'Seedhe Maut x Sez on the Beat',
    cover: '/covers/seedhe-maut-sez-on-the-beat-pnp.jpg',
    background: '/backgrounds/seedhe-maut-sez-on-the-beat-pnp.jpg',
  }}
}};

export const TRACKS = {json.dumps(tracks, indent=2, ensure_ascii=False)};
"""
    tracks_js_path = os.path.join(SRC_DIR, "tracks.js")
    with open(tracks_js_path, "w", encoding="utf-8") as f:
        f.write(js_content)
    print(f"Generated {tracks_js_path} with {len(tracks)} tracks!")

def main():
    flac_files = []
    for d in [SOURCE_TRACKS, SOURCE_DIR]:
        if os.path.exists(d):
            flac_files.extend(glob.glob(os.path.join(d, "*.flac")))
            
    # Deduplicate by basename
    unique_files = {}
    for f in flac_files:
        base = os.path.basename(f)
        if base not in unique_files:
            unique_files[base] = f
            
    sorted_flacs = [unique_files[k] for k in sorted(unique_files.keys())]
    print(f"Processing all {len(sorted_flacs)} tracks with multi-threaded ffmpeg & 16:9 wallpaper generation...")
    
    with ThreadPoolExecutor(max_workers=8) as executor:
        results = list(executor.map(process_single_track, sorted_flacs))
        
    tracks = []
    for i, t in enumerate(results):
        t["aura"] = AURA_PALETTES[i % len(AURA_PALETTES)]
        tracks.append(t)
        
    generate_tracks_js(tracks)
    print(f"Done! Successfully loaded and optimized all {len(tracks)} tracks.")

if __name__ == "__main__":
    main()
