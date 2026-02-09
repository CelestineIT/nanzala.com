# Love Website for Nanzala Nancy Siloka

A single-page, offline-friendly experience that keeps your shared memories front and center.

## Local usage
1. Open `index.html` in any modern browser (double-click or right-click → Open With).
2. Use the `Author name` input to personalize the closing signature; it saves automatically.
3. Tap **Add photos** to upload up to six images per session (max 18 stored). They persist locally via `localStorage`. While no uploads exist yet, the gallery shows the starter moments in `img/`. Click any photo to view it full size in the lightbox.
4. Switch between dark and light themes using the 💡/🌙 button in the header; your choice sticks via `localStorage`.
5. Watch the wish list ticker under the hero cycle through future adventures, and peek at the “Us Today” card for a fresh heartbeat message each visit.
6. Add your own promise in the right-hand column of the Promise Playlist; up to six entries persist locally and show beside Celestine’s vows.
7. Control the soundtrack from the dedicated music player—play/pause, volume, and progress sync with the header button, so you can keep the playlist close during long calls.
8. Use the gratitude log to jot a nightly appreciation, the countdown to plan your next call, and the shared playlist queue to stash any vibe you want to hear together; everything is saved locally so the rituals stay personal.
9. Read the daily Bible motivation for calm encouragement before calling; hit “New encouragement” if you want a fresh verse for the day.
10. Check the morning checklist, update the “Distance dashboard” when a call ends, add a journal entry, and slide the mood meter so the page adapts to your emotional rhythm.
11. Create rich memories by uploading photos, videos, songs, and text—each entry is stored locally and shown inside the new memory card.
12. The most recent memory also appears in the spotlight card so she can revisit the latest feeling without scrolling.
13. Track your call streak badge, open the Love Letter Vault with the ♥ button to save multiple letters, and rotate the Mini Ritual carousel for new shared actions.

The Shared Objectives card now names your goals for spiritual growth, financial stability, and travel, keeping those intentions visible alongside the milestones.

Subtle float animations greet each section on load, keeping the tone gentle while your shared story unfolds.

The new milestones section lists the adventures you plan together (driver’s license, business, growth, and Mercedes-Benz goals) and keeps the tone anchored in the calm of white.

## Personalization
- Update the hero copy, letter text, or timeline entries directly in `index.html`.
- Change accent tones or layout tweaks inside `style.css`.
- Adjust random love reasons or the secret message inside `script.js` (look for the constants at the top).

## Optional deployment
1. Push the folder to a git repo.
2. Drop the repo into Netlify or Vercel and connect the site to the `main` branch.
3. Configure the build command to `none`; specify `index.html` as the publish file (or rely on the platform’s static build detection).
