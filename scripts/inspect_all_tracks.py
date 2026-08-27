import json
import sys

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

with open(r"C:\Dev\lunch-break-player\src\tracks.js", "r", encoding="utf-8") as f:
    content = f.read()

start = content.find("export const TRACKS = [") + len("export const TRACKS = ")
end = content.rfind("];") + 1
tracks = json.loads(content[start:end])

for i, t in enumerate(tracks):
    print(f"{i+1:3d}. \"{t['title']}\" | {t['artist']} | {t['album']} | {t['base_name']}")
