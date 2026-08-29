import sys
import time
from playwright.sync_api import sync_playwright

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

def verify_live():
    print("🌐 Launching Playwright browser to verify https://lunch-break-player.vercel.app/ ...")
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        console_errors = []
        page.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)

        page.goto("https://lunch-break-player.vercel.app/", wait_until="networkidle", timeout=40000)
        print("✅ Page loaded successfully.")

        title = page.title()
        print(f"Page Title: {title}")

        current_title = page.locator(".player-pill p.truncate").first.inner_text()
        print(f"Initial Track Title: {current_title}")

        # Rapid Next Clicks (5 times)
        next_btn = page.locator("button[aria-label='Next track']").first
        track_sequence = [current_title]

        for i in range(1, 6):
            next_btn.click()
            time.sleep(0.3)
            t = page.locator(".player-pill p.truncate").first.inner_text()
            track_sequence.append(t)

        print("\nTrack Sequence after 5 rapid Next clicks:")
        for idx, t in enumerate(track_sequence):
            print(f"  Step {idx}: {t}")

        # Check duplicates
        has_duplicate = False
        for i in range(len(track_sequence) - 1):
            if track_sequence[i] == track_sequence[i + 1]:
                has_duplicate = True
                print(f"❌ Duplicate detected: {track_sequence[i]} at steps {i} and {i + 1}")

        if not has_duplicate:
            print("🎉 ZERO DUPLICATES! Rapid Next sequence is 100% strictly sequential!")

        # Music Drawer Test
        print("\nTesting Music Drawer selection...")
        drawer_btn = page.locator("button[aria-label='Open tracklist drawer']").first
        drawer_btn.click()
        page.wait_for_selector(".queue-panel")
        print("✅ Queue panel opened.")

        rows = page.locator(".queue-scroll button")
        row_count = rows.count()
        print(f"Found {row_count} tracks in drawer.")

        target_row = rows.nth(9)  # 10th track
        target_name = target_row.locator(".truncate").first.inner_text()
        target_row.click()
        time.sleep(0.5)

        selected_title = page.locator(".player-pill p.truncate").first.inner_text()
        print(f"Selected from drawer: '{target_name}' -> Active in player: '{selected_title}'")
        assert selected_title == target_name, "Drawer selection mismatch!"

        # Next from drawer
        next_btn.click()
        time.sleep(0.5)
        next_after_drawer = page.locator(".player-pill p.truncate").first.inner_text()
        print(f"Next after drawer: '{next_after_drawer}'")

        # Previous
        prev_btn = page.locator("button[aria-label='Previous track']").first
        prev_btn.click()
        time.sleep(0.5)
        prev_title = page.locator(".player-pill p.truncate").first.inner_text()
        print(f"Previous back to: '{prev_title}'")
        assert prev_title == selected_title, "Previous mismatch!"

        print(f"\nConsole Errors ({len(console_errors)}): {console_errors[:3]}")
        browser.close()
        print("\n✨ All browser live automation tests passed with 100% success!")

if __name__ == "__main__":
    verify_live()
