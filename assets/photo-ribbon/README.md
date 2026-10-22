# Homepage photo ribbon

Review-only ribbon displaying 16 user-supplied inspection and product images. Every retained source image is resized proportionally to a common height without cropping, overlays, captions, or generated replacement content. Portrait images remain narrow; landscape images remain wide.

The plain tank-end photograph without wave rings (`4eb14cf6-4902-4148-8a64-039342f779bf.jpg`) was removed from the displayed ribbon at the user's request. The tank-end photograph WITH guided-wave rings remains first.

The four binary transport parts concatenate into the original 4256 x 200 AVIF atlas (23,971 bytes). `build/photo-ribbon.js` validates SHA-256 and serves/emits it as `/photo-ribbon.avif`. This historical atlas still contains all 17 original tiles and is preserved without recompression. It is an optimized display asset, not a full-resolution source archive.

The current displayed group combines two complete atlas segments with the exact uploaded `assets/source-images/bracelet.jpg` (1358 x 861 pixels, 267,596 bytes):

- Atlas x=0..2467 contains photos 1–11 and their spacing.
- `bracelet.jpg` replaces photo 12, `saw.jpg`, whose atlas image occupied x=2467..2740, followed by 12 pixels of spacing through x=2752. The original replacement photograph is served/emitted unchanged as `/photo-ribbon-bracelet.jpg`, and its SHA-256 is checked during the build.
- Atlas x=2752..3977 contains complete photos 13–16 and their spacing.
- The final 279-pixel tile (267-pixel plain tank photograph plus 12-pixel spacing) remains excluded from display.

The build injects the ribbon immediately below the existing homepage hero without rewriting the original homepage or replacing its slideshow. Desktop photo height: 168 CSS pixels. Mobile photo height: 136 CSS pixels at viewports up to 680 pixels. Motion: left to right at 60 CSS pixels per second, twice the historical 30-pixel-per-second speed. The outer maximum width remains 1190 pixels, with the same 28-pixel desktop and 20-pixel mobile gutters as the page content. Includes pause/play, previous/next, hover pause, touch browsing, keyboard controls, and reduced-motion support. Both source images decode before animation initializes.

## Original-image preservation

Three supplied originals are preserved with unchanged bytes under `assets/source-images/`:

- `bracelet.jpg`: the active ribbon replacement.
- `tan.jpg`: the supplied tank heat-map image, now also served as `/hero-tank.jpg` for the static upper-right homepage image above the ribbon. The later upload `tan(1).jpg` has identical bytes.
- `GNDE_Guided_Wave_Sensors_Homepage_reference.png`: the original bytes of `GNDE Guided Wave Sensors Homepage(2).png`, retained as a layout reference under a filename without spaces.

The other originals listed in `docs/IMAGE_SOURCES.json` have not been restored individually into this repository. Their historical backup is `GNDE_checkpoint_2026-10-21.zip/original-images/`, created during the prior session. That separate ZIP is not supplied by this checkout, and the inventory does not contain its image bytes. Preserve the distinction between these three repository originals, the optimized atlas, and the historical archive when resuming work.

The build has succeeded and the emitted bracelet bytes match its original. Browser QA and preview deployment status are recorded separately in `WORK_IN_PROGRESS.md`; this README does not establish either as complete.

Displayed sources in order:

1. image_9f667e5b.jpg (tank end WITH guided-wave rings)
2. 7721fe9d-27ef-47bc-aa17-4eae730cd0e2.jpg
3. 9s array.jpg
4. ht probe.jpg
5. hx-up.jpg
6. mst-field-setup.webp
7. tank4543.jpg
8. IMG_1720(1).jpeg
9. ChatGPT Image May 11, 2026, 01_40_06 PM.png
10. water.jpg
11. Backup_of_reppic2.jpg
12. bracelet.jpg (replaces historical atlas tile 12, saw.jpg)
13. clamp-anchors.jpg
14. OMB03089 300.jpg
15. OMB03128 300.jpg
16. 1cb67e98-d2ab-470d-879a-e06b63fe3a61.jpg
