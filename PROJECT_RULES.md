# 🎵 Lunch Break Player — Project Architecture & Rules

## 🎯 Project Scope:
A dedicated player for Seedhe Maut (TBSM) with 133 high-bitrate AAC tracks, authentic 16:9 ambient cover backgrounds, and realistic spinning vinyl records.

---

## 📋 Core Operating Rules:
1. **Dual-AI Collaboration**:
   - Consult ChatGPT for all research, music trivia, discography accuracy, and visual prompts.
   - Antigravity handles coding, builds, transcoding, and ADB mobile verification.
   - Maintain the same ChatGPT conversation thread (`Seedhe Maut Discography Research`).
2. **Platform Experience**:
   - **PC Desktop**: Widescreen cinema layout, 16:9 ambient wallpapers, rotating vinyl disc, fast search drawer.
   - **Mobile**: Minimalist pocket vinyl player, native lock-screen controls, smooth drawer, no clutter.
   - **Lyrics Policy**: Do NOT include lyrics features (completely removed per user directive).
3. **Deployment Constraint**:
   - Run 100% locally on `localhost:5173` / `192.168.1.39:5173`.
   - Never push or deploy live to production without explicit user command.
4. **Wireless ADB Testing**:
   - Device ID: `6dcadb55`
   - Capture live screenshots after any UI changes to verify mobile rendering.
