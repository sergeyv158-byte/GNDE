# Homepage photo ribbon

Review-only ribbon displaying 16 user-supplied inspection and product images. Every retained source image is resized proportionally to a common height without cropping, overlays, captions, or generated replacement content. Portrait images remain narrow; landscape images remain wide.

The plain tank-end photograph without wave rings (`4eb14cf6-4902-4148-8a64-039342f779bf.jpg`) was removed from the displayed ribbon at the user's request. The tank-end photograph WITH guided-wave rings remains first.

The four binary transport parts concatenate into the original 4256 x 200 AVIF atlas (23,971 bytes). `build/photo-ribbon.js` validates SHA-256 and serves/emits it as `/photo-ribbon.avif`. Each displayed group ends at x=3977: the first 16 complete photo tiles with their spacing. The final 279-pixel tile (267-pixel plain tank photograph plus 12-pixel spacing) is excluded by the group boundary. The source asset is preserved, without any recompression or cropping of the retained photographs.

The build injects the ribbon immediately below the existing homepage hero without rewriting the original homepage or replacing its slideshow. Desktop height: 190 CSS pixels. Mobile height: 150 CSS pixels. Motion: left to right at 30 CSS pixels per second. Includes pause/play, previous/next, hover pause, touch browsing, keyboard controls, and reduced-motion support.

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
12. saw.jpg
13. clamp-anchors.jpg
14. OMB03089 300.jpg
15. OMB03128 300.jpg
16. 1cb67e98-d2ab-470d-879a-e06b63fe3a61.jpg
