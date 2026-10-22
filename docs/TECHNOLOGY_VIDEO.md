# Technology animation - continuation checkpoint

This update follows the completed static hero and ribbon at commit `3a4cbaaa398a4962976b1f6d97bf1fd194869ee3`. Keep all work on `review-technology-about-2026-10-10`; do not merge to main or promote production without owner approval.

## Supplied source and placement

The owner supplied `FeCo_wave_propagation_keyframes(3).mp4` for the previously approved Technology animation placeholder under **Wiedemann and reversed Wiedemann effects**.

- Original: 64,278 bytes, 1280 x 720, H.264, 25 frames/second, 390 frames, 15.6 seconds, no audio stream.
- Original SHA-256: `98ccf6333140ab1542c4a62fac544216b4714e5b83c50da7c6554b6eff817a99`.
- Original Git blob hash after reconstruction: `2195f2ceaf35f46cb3f06a540154ff92af42b91e`.
- Web URL: `/feco-wave-propagation.mp4`.
- Page anchor: `#feco-wave-animation` within `#technology`.
- Native playback, pause, seeking and fullscreen controls; inline playback on mobile. No forced autoplay.
- Responsive 16:9 player, up to 900 CSS pixels wide. Keep the full source frame, including its existing white margins. Do not crop, stretch, or re-encode the supplied animation without a new request.

## Exact source preservation

The original MP4 is preserved losslessly in `assets/technology-video/video.mp4.gz.part01` through `part16`. These are binary portions of one gzip stream, NOT separate videos. Parts 01-15 each contain 3000 bytes; part16 contains 1149 bytes. Concatenate them in numeric order and decompress to recover the original MP4 exactly.

Concatenated gzip SHA-256: `892a5c958b071567e870378aad46bbeaf9f7cbe6b1afa4f74497bddb5f23e08d`.

`build/technology-video.mjs` reconstructs and verifies the original, emits it during the Vite build, and serves it with byte-range support in development. It replaces only the exact existing animation placeholder at HTML transformation time. The source `index.html` placeholder remains intentionally present as the transform target; the generated website contains the video instead. Styling is in `public/technology-video.css`.

To reconstruct after checkout using Node:

```js
import { readFileSync, writeFileSync } from 'node:fs';
import { gunzipSync } from 'node:zlib';
const parts = Array.from({length:16}, (_, i) => readFileSync(`assets/technology-video/video.mp4.gz.part${String(i+1).padStart(2,'0')}`));
writeFileSync('FeCo_wave_propagation_keyframes(3).mp4', gunzipSync(Buffer.concat(parts)));
```

## Verification performed before publication

- Each uploaded binary part matched its calculated Git blob SHA.
- Concatenation and decompression recovered the uploaded MP4 byte for byte.
- Node syntax and plugin tests passed: replacement, surrounding-markup preservation, duplicate-injection prevention, missing-placeholder failure, generated-asset equality, and GET/HEAD/byte-range responses.
- An offline Chromium component fixture decoded the MP4 at 1280 x 720 and reported 15.6 seconds. Playback advanced with no media error, pause and seeking to 12 seconds worked, and controls/inline-playback attributes were present.
- Component layout: desktop player 900 x 506.25 CSS pixels; at a 375px viewport the player was 335px wide and document scroll width stayed 375px. No page script errors.
- These are component tests, not a claim of full hosted visual verification. The hosted Vite build and deployment result must be read from this commit's GitHub/Vercel status after branch publication.

## Preserved work

No changes to the static upper-right tank hero, the 16-photo scrolling ribbon, its 60px/second left-to-right speed, the original bracelet replacement, or the scientific page text. Existing original-image documentation remains in `docs/IMAGE_SOURCES.json` and `WORK_IN_PROGRESS.md`. The latter documents the preceding hero/ribbon checkpoint; this file records the subsequent video addition.
