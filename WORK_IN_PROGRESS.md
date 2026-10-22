# GNDE website — ribbon update and continuation notes

## Latest work — October 21, 2026 (America/Chicago)

Resumed from verified GitHub checkpoint `8361cf950c0904112c812e7f33eb10d244a4d8d3` on `review-technology-about-2026-10-10`.

### Latest owner decision — one static upper-right hero image

The owner has now explicitly requested replacing the upper-right homepage image **above the ribbon** with the newly supplied `tan(1).jpg`, displayed as **one static picture with no slideshow**. This resolves and supersedes the earlier uncertainty about the intended placement of `tan.jpg`; the historical instruction to preserve the slideshow below no longer describes the current request.

- The saved ribbon baseline for this follow-up is commit `6c009162fc6640b4dd195151f17c1ff944d72ab5` on the same review branch.
- `tan(1).jpg` is a new upload alias for the exact bytes already preserved as `assets/source-images/tan.jpg`: 459 x 335 pixels, 70,335 bytes, SHA-256 `7c7731a4a44e4fa99c096208643ec0323b2b663d028d26a879ba2a0db192e965`.
- Website mapping for this edit: `public/hero-tank.jpg`, served as `/hero-tank.jpg`, using the exact original image bytes.
- The requested implementation replaces the hero carousel with a single image and removes its slideshow markup, carousel styles, and cycling timer. Preserve the photograph's aspect ratio and full composition.
- The completed scrolling ribbon below the hero remains unchanged, including its 16-photo selection, original bracelet replacement, 60px/second motion, sizing, and controls.
- **Hero validation completed:** `npm run build` passed. The local browser preview loads the supplied tank image in the upper-right hero above the ribbon, and the full composition is retained. There is exactly one hero image, with no carousel markup or cycling timer. `public/hero-tank.jpg` and the built copy match the supplied original byte for byte. Visual evidence: `docs/static-hero-preview-2026-10-21.jpg`.
- **Hosted status:** this change is published through the review branch; consult this commit's GitHub Vercel status for the deployment outcome. Local preview verification does not establish hosted availability.

### Completed ribbon implementation and verification

- The scrolling photo ribbon remains immediately below the homepage hero.
- Its original 17-photo atlas is preserved unchanged. The display retains 16 photos because the owner previously removed the plain tank-end image without wave rings (tile 17). Do not restore it merely because the source strip is called the 17-picture ribbon.
- The blurry brown-pipe/black-bracelet image was tile 12 (`saw.jpg`). It is now replaced in all three loop groups by the exact uploaded `bracelet.jpg` (1358 x 861), served separately as `/photo-ribbon-bracelet.jpg`. No resizing, recompression, stretching, or screenshot extraction is applied to that file.
- The atlas portions before and after the replacement are displayed without recompression; every retained photo remains proportional and complete. Coordinates and source provenance are in `assets/photo-ribbon/README.md` and `docs/IMAGE_SOURCES.json`.
- Speed is 60 CSS pixels/second, twice the former 30, moving left to right. An actual browser measurement across a loop boundary was approximately 59.9 pixels/second. Pause/play and next-photo navigation were exercised successfully.
- The strip is slimmer: 168px photo height on desktop, 136px at widths up to 680px. The 1190px outer maximum and existing 28px desktop / 20px mobile gutters align with the homepage content.
- Desktop browser measurements confirmed identical ribbon/page content edges at x=107 and x=1241. A phone-width check confirmed identical edges at x=20 and x=355, with document width and scroll width both 375px (no horizontal page overflow).
- The browser decoded the replacement at its full 1358 x 861 dimensions. All images loaded and controls were visible. Source-byte equality and the built JPEG's equality were checked.
- `npm run build` completed successfully. The build validates SHA-256 hashes for the saved atlas and original bracelet photograph. No page application errors were observed; browser-extension metadata messages were unrelated to the website.
- Three uploaded originals are now preserved in `assets/source-images/`: `bracelet.jpg`, `tan.jpg`, and `GNDE_Guided_Wave_Sensors_Homepage_reference.png`. All bytes match the uploaded originals. Other inventory originals have not been recovered from the historical separate ZIP; do not claim that all full-resolution originals are in GitHub.
- `server.allowedHosts` now explicitly permits `terminal.local` for the managed development preview. This is a development-only Vite setting.

### Review and publishing scope

- Repository: `sergeyv158-byte/GNDE`.
- Review branch: `review-technology-about-2026-10-10`.
- Review URL: https://gnde-git-review-technology-about-2026-10-10-guided-nde-llc.vercel.app/#home
- Keep this work on the review branch. The user has authorized preview updates and GitHub saving, not merging to `main` or production promotion.
- Vercel deployment is triggered by the GitHub branch update. Consult the resulting commit's GitHub status checks for hosted deployment status; the browser checks above were performed against the local development preview.
- The current hero request is explicit: use the supplied tank image as one static upper-right picture above the ribbon and remove the slideshow. Keep this hero change and the completed ribbon on the review branch.

### Resume later

Use the current branch head rather than the old checkpoint. Read `assets/photo-ribbon/README.md` for implementation geometry and `docs/IMAGE_SOURCES.json` for exact originals, replacements, upload aliases, and exclusions. Static-hero build and local visual validation are complete; consult the current GitHub commit's Vercel status before reporting hosted deployment success. The previous outstanding bracelet/speed fixes below are historical and have now been completed as described above; the historical uncertainty about `tan.jpg` was resolved by the latest explicit owner request.

---

# Historical checkpoint — before the ribbon fixes

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
