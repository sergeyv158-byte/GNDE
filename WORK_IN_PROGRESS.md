# GNDE website — saved work and continuation notes

Checkpoint: 2026-10-21 UTC, following the website review session that began on October 20 in America/Chicago.

## Project and publishing scope

- Repository: `sergeyv158-byte/GNDE`.
- Working branch: `review-technology-about-2026-10-10`.
- Preview: https://gnde-git-review-technology-about-2026-10-10-guided-nde-llc.vercel.app/#inspection-photos
- Preview-only work. Do not merge to `main`, promote a deployment, or change production without the owner's explicit approval.
- This checkpoint preserves the existing implementation and records unfinished requests. It is not a claim that every requested visual change is finished.

## Verified saved implementation

The branch was inspected at commit `a62e322cc1fe6c6c24af5fca37248b078d693055` before this documentation checkpoint. GitHub reported successful Vercel deployment statuses for both `gnde` and `v0-gnde-1` at that commit. A successful deployment is not the same as visual acceptance; the latest page was not visually verified during this save operation.

1. The original caption-free scrolling ribbon was committed in `ea99b8c2cfa4226103ad0f44b37b069478af5f3e`.
2. The plain tank-end photograph without wave rings was excluded from the displayed ribbon. The source is `4eb14cf6-4902-4148-8a64-039342f779bf.jpg`, originally tile 17. Keep the tank-end photograph WITH guided-wave rings, `image_9f667e5b.jpg`.
3. The ribbon width was aligned in code with the main page's `.wrap` in `a62e322`: outer maximum width 1190px, centered, with 28px desktop and 20px mobile content gutters. The owner subsequently still reported excessive width, so verify this in the actual preview before calling it accepted.
4. Existing homepage content and its slideshow remain in `index.html`; the ribbon is injected immediately after the homepage hero. The current JavaScript still specifies `const speed = 30` pixels per second.

## Files and image storage

- `index.html`: existing homepage, including its embedded hero image and slideshow.
- `vite.config.js`: enables the photo-ribbon build plugin.
- `build/photo-ribbon.js`: validates and emits the ribbon atlas and injects ribbon markup.
- `public/photo-ribbon.css`: layout, common image height, page-width alignment and controls.
- `public/photo-ribbon.js`: scrolling, pause/play, keyboard/touch controls, hover pause and reduced-motion behavior.
- `assets/photo-ribbon/strip.part1` through `strip.part4`: tracked binary parts of the original AVIF atlas, 23,971 bytes total; these are actual saved image data, not placeholders.
- `assets/photo-ribbon/README.md`: original atlas order and display behavior.
- `docs/IMAGE_SOURCES.json`: inventory of 22 supplied images/references, with original dimensions, sizes, SHA-256 checksums and decisions.

The original atlas is 4256 x 200 pixels. Current display groups expose x=0 through x=3977, containing complete tiles 1–16 plus spacing, and exclude the final plain-tank tile. All retained photos must remain uncropped and proportional. Do not treat the heavily compressed atlas as a full-resolution source archive.

The 22 original uploaded image files are preserved separately in the accompanying `GNDE_checkpoint_2026-10-21.zip` backup under `original-images/`. They are NOT all individually uploaded to GitHub at this checkpoint. The JSON inventory does not contain their image bytes. Obtain that backup from the conversation before replacing or regenerating assets; do not assume temporary container paths are permanent. Archive/import those originals into the repository when a suitable binary-transfer path is available.

## Owner's outstanding requests — do not lose these

- Replace the low-resolution photo of the black bracelet probe around a brown pipe with the directly supplied `bracelet.jpg` (1358 x 861). This later direct photo supersedes using a crop from `GNDE Guided Wave Sensors Homepage(2).png` or the 246 x 183 screenshot. No saved replacement was found in the inspected branch.
- Make the ribbon scroll twice as fast: 60 pixels per second, left to right, instead of the current 30. This change is NOT implemented in the inspected JavaScript.
- Recheck the ribbon's left and right edges against the meaningful page content at the owner's browser size. Width rules are committed, but visual approval is outstanding.
- Preserve the newly supplied `tan.jpg` tank heat-map image (459 x 335). The assistant discussed a top-right hero replacement, but the transcript does not clearly establish the owner's final placement instruction for this upload. Do not silently redesign the hero or remove the previously approved image.
- Keep frames sized to each photograph's aspect ratio. No image cropping, stretching, captions or invented replacement imagery. Keep the left-to-right motion, mobile usability and accessibility controls.
- The owner suggested roughly 100 KB per thumbnail as an acceptable scale, not a requirement to compress all photos together into 100 KB. Quality of the bracelet image was specifically rejected; do not repeat excessive compression merely to minimize file size.

## Resume without repeating failed work

1. Read this checkpoint, `docs/IMAGE_SOURCES.json`, and the current branch files. Fetch the current branch head before changing anything; preserve intervening commits.
2. Use the source backup and prefer `bracelet.jpg` for the brown-pipe replacement. Keep exact original files separate from web derivatives.
3. Implement the remaining changes on the review branch only. Run the Vite build and inspect the rendered ribbon where access permits.
4. Verify the resulting commit and its GitHub/Vercel deployment status. Report saved code, successful deployment and visual inspection as three separate facts. Do not call a successful deployment a failure solely because an automated preview fetch did not return usable content.
5. Update these notes with the actual new commit, changed files, tests and remaining work. Keep a record of image replacements and exclusions rather than relying on chat memory.

This documentation checkpoint itself does not alter the website or production deployment.
