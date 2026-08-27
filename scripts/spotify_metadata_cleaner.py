import json
import os
import re
import sys

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

PROJECT_DIR = r"C:\Dev\lunch-break-player"
SRC_DIR = os.path.join(PROJECT_DIR, "src")
TRACKS_JS = os.path.join(SRC_DIR, "tracks.js")

# Official Spotify & Clean Metadata Map for Seedhe Maut Discography
SPOTIFY_METADATA_CLEANUP = {
    # 2 Ka Pahada
    "Hanging On (Audio) [From ＂2 Ka Pahada＂ MixTape]": {
        "title": "Hanging On",
        "artist": "Seedhe Maut",
        "album": "2 Ka Pahada"
    },
    "Kashmakush (Audio) [From ＂2 Ka Pahada＂ MixTape]": {
        "title": "Kashmakush",
        "artist": "Seedhe Maut",
        "album": "2 Ka Pahada"
    },
    "Seedhe Maut Anthem": {
        "title": "Seedhe Maut Anthem",
        "artist": "Seedhe Maut, Sez on the Beat",
        "album": "2 Ka Pahada"
    },
    # Singles & Collabs
    "HAQ SE FT. ENKORE, AHMER ｜ VENI VIDI VICI": {
        "title": "Haq Se (feat. Enkore & Ahmer)",
        "artist": "Smoke, Seedhe Maut",
        "album": "Veni Vidi Vici"
    },
    "KODAK ｜ King & @SeedheMaut ｜ MM ｜ Official Music Video": {
        "title": "Kodak (feat. Seedhe Maut)",
        "artist": "King, Seedhe Maut",
        "album": "Monopoly Moves"
    },
    "BREAKSHIT!  Feat. Calm, Yashraj ｜ Official Audio ｜ AMFTM Deluxe": {
        "title": "Breakshit! (feat. Calm & Yashraj)",
        "artist": "Tsumyoki, Calm, Yashraj",
        "album": "A Message From The Moon"
    },
    "Coke Studio Bharat ｜ Holi Re Rasiya ｜ Maithili Thakur x Seedhe Maut x Ravi Kishan x Mahan": {
        "title": "Holi Re Rasiya",
        "artist": "Maithili Thakur, Seedhe Maut, Ravi Kishan",
        "album": "Coke Studio Bharat"
    },
    "Boh!B ｜ Coke Studio Bharat": {
        "title": "BOHB",
        "artist": "Seedhe Maut",
        "album": "Coke Studio Bharat"
    },
    "GOR3 (Official Video)⧸dir. Ishan Khatri⧸DL91": {
        "title": "GOR3",
        "artist": "Hurricane, Seedhe Maut",
        "album": "DL91"
    },
    "OG Lucifer aka दैत्य (Feat. Encore ABJ)  (Official Music Video) DL91 ｜｜ HERO": {
        "title": "Hero (feat. Encore ABJ)",
        "artist": "OG Lucifer, Encore ABJ",
        "album": "DL91"
    },
    "STATE OF MIND ｜ PROD. RiJ ｜ DL91 ｜": {
        "title": "State Of Mind",
        "artist": "Lil Bhavi, Seedhe Maut",
        "album": "71 State of Mind"
    },
    "Yungsta x Sez on the Beat ft. Encore ABJ ｜ Official Music Video ｜ Graveyard Shift": {
        "title": "Graveyard Shift (feat. Encore ABJ)",
        "artist": "yungsta, Sez on the Beat, Encore ABJ",
        "album": "Meen"
    },
    "OG Lucifer aka दैत्य X CALM (Official Video) Prod.by CALM ｜｜ NAALA PAAR": {
        "title": "Naala Paar (feat. Calm)",
        "artist": "OG Lucifer, Calm",
        "album": "Naala Paar"
    },
    "BOOMBAYA CALM (Remix)": {
        "title": "Boombaya (Calm Remix)",
        "artist": "Seedhe Maut, Calm",
        "album": "Singles"
    },
    "Hi Ram (Remix)": {
        "title": "Hi Ram (Remix)",
        "artist": "Seedhe Maut",
        "album": "Singles"
    },
    "Ab 17- DIAMOND KHAPEETAR (Encore ABJ Remix) Feat. LIL BHAVI ｜ Prod. by PREMIUM ｜ DL 91": {
        "title": "Diamond Khapeetar (Encore ABJ Remix)",
        "artist": "Ab 17, Encore ABJ, Lil Bhavi",
        "album": "DL91"
    }
}

# Duplicate YouTube rips that have exact official Spotify duplicates in the library
KNOWN_EXACT_DUPLICATES = [
    "BEEN ON - Frappe Ash & toorjo dey Feat. Encore ABJ ｜ Official Music Video ｜ 5.5 Records",
    "Bhaskar - Dalli ft. Encore ABJ ｜ Official Video ｜ PROD. by RIJ ｜ DL91",
    "CARAMEL TAX - Dizlaw x @bhaktaaa  x Calm (Official Music Video)",
    "Chaar Diwaari ft. Encore ABJ - Chaand (Tu Jo Dekh Le) ｜ Parvana EP ｜ Def Jam India",
    "RAWAL x Bharg x Calm x RAGA - JUNGLI KUTTA",
    "TPA TAP - Lil Bhavi Ft. Encore ABJ (Official Visualizer) OK HAI ｜ DL 91 ｜ Prod. by Hisab",
    "UNIYAL - HANDPUMP feat. Encore ABJ & Soumya Rawat",
    "Yashraj, Calm - TOP FLOOR SHiii (Official Video)",
    "Seedhe Maut - Mashooka"
]

def clean_track_title(title: str) -> str:
    # Remove YouTube suffixes
    cleaned = re.sub(r"\s*[\(\[]?(?:Official\s*(?:Music\s*)?(?:Video|Audio|Visualizer)|Prod(?:\.|\s+by)[^\)\]]+|DIR\.[^\)\]]+|DL\s*91)[\)\]]?", "", title, flags=re.IGNORECASE)
    cleaned = re.sub(r"\s*[\｜\|\-]+\s*$", "", cleaned)
    cleaned = re.sub(r"\s+", " ", cleaned).strip()
    return cleaned

def clean_discography():
    with open(TRACKS_JS, "r", encoding="utf-8") as f:
        content = f.read()

    start = content.find("export const TRACKS = [") + len("export const TRACKS = ")
    end = content.rfind("];") + 1
    tracks = json.loads(content[start:end])

    print(f"Original total tracks: {len(tracks)}")

    cleaned_tracks = []
    seen_fingerprints = set()

    for t in tracks:
        base_name = t.get("base_name", "")
        title = t["title"]
        artist = t["artist"]
        album = t["album"]

        # 1. Skip known duplicate YouTube rips
        if base_name in KNOWN_EXACT_DUPLICATES:
            print(f"  🗑️ Removed duplicate YouTube rip: {base_name}")
            continue

        # 2. Apply Spotify official metadata map if present
        if title in SPOTIFY_METADATA_CLEANUP:
            meta = SPOTIFY_METADATA_CLEANUP[title]
            title = meta["title"]
            artist = meta["artist"]
            album = meta["album"]
        else:
            title = clean_track_title(title)

        # 3. Create audio/title fingerprint to deduplicate any remaining duplicates
        norm_key = re.sub(r"[^\w]", "", title.lower())
        norm_artist = re.sub(r"[^\w]", "", artist.lower()[:12])
        fingerprint = f"{norm_key}_{norm_artist}"

        if fingerprint in seen_fingerprints:
            print(f"  🗑️ Removed duplicate fingerprint: {title} by {artist} ({base_name})")
            continue

        seen_fingerprints.add(fingerprint)

        t["title"] = title
        t["artist"] = artist
        t["album"] = album
        cleaned_tracks.append(t)

    print(f"\n✅ Cleaned, deduplicated Spotify catalogue: {len(cleaned_tracks)} master tracks!")

    # Write updated tracks.js
    albums_block = """// Auto-generated master discography for seedhemaut.fm
import lunchBreakVinyl from './assets/vinyl-cover.jpg';
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
  },
  'Bayaan': {
    title: 'Bayaan',
    artist: 'Seedhe Maut x Sez on the Beat',
    cover: '/covers/seedhe-maut-sez-on-the-beat-pnp.jpg',
    background: '/backgrounds/seedhe-maut-sez-on-the-beat-pnp.jpg',
  }
};
"""
    new_content = f"{albums_block}\nexport const TRACKS = {json.dumps(cleaned_tracks, indent=2, ensure_ascii=False)};\n"

    with open(TRACKS_JS, "w", encoding="utf-8") as f:
        f.write(new_content)

    print(f"Updated {TRACKS_JS} successfully!")

if __name__ == "__main__":
    clean_discography()
