import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

// The four checked-in transport parts assemble into one optimized photo atlas.
// All 17 photos retain their entire frame and their original aspect ratio.
export function photoRibbonPlugin() {
  const image = Buffer.concat([1, 2, 3, 4].map((n) =>
    readFileSync(new URL(`../assets/photo-ribbon/strip.part${n}`, import.meta.url))));
  const expected = '84d73f4452df37235d7ace3e708dbd862e45c90c677510077017546e5a2571a2';
  if (createHash('sha256').update(image).digest('hex') !== expected) {
    throw new Error('Photo ribbon asset failed its integrity check.');
  }
  const markup = `
<div class="gnde-photo-ribbon" id="inspection-photos" role="region" aria-label="GNDE inspection and sensor photographs">
  <div class="gnde-photo-window" tabindex="0" aria-label="Scrolling inspection photos. Use arrow keys or swipe to browse.">
    <div class="gnde-photo-track">
      <img class="gnde-photo-strip" src="/photo-ribbon.avif" width="4256" height="200" alt="" aria-hidden="true" draggable="false">
      <img class="gnde-photo-strip" src="/photo-ribbon.avif" width="4256" height="200" alt="Seventeen GNDE photographs: tank end inspection, pipe installations, sensor arrays, heat exchanger inspection, field testing, tank wall inspection, anchor monitoring, underwater inspection, wire rope monitoring, and probe products." draggable="false">
      <img class="gnde-photo-strip" src="/photo-ribbon.avif" width="4256" height="200" alt="" aria-hidden="true" draggable="false">
    </div>
  </div>
  <div class="gnde-photo-controls" hidden>
    <button type="button" data-ribbon-action="previous" aria-label="Previous photos">&#8592;</button>
    <button type="button" data-ribbon-action="toggle" aria-label="Pause photo scrolling" aria-pressed="false">Pause</button>
    <button type="button" data-ribbon-action="next" aria-label="Next photos">&#8594;</button>
  </div>
</div>`;
  return {
    name: 'gnde-uncropped-photo-ribbon',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        if (html.includes('id="inspection-photos"')) return html;
        const hero = /(<section\b[^>]*\bid=["']home["'][^>]*>[\s\S]*?<\/section>)/i;
        if (!hero.test(html)) throw new Error('Cannot find the homepage hero for photo ribbon placement.');
        return {
          html: html.replace(hero, (match) => match + markup),
          tags: [
            { tag: 'link', attrs: { rel: 'stylesheet', href: '/photo-ribbon.css' }, injectTo: 'head' },
            { tag: 'script', attrs: { src: '/photo-ribbon.js', defer: true }, injectTo: 'body' },
          ],
        };
      },
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'photo-ribbon.avif', source: image });
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url?.split('?')[0] !== '/photo-ribbon.avif') return next();
        res.setHeader('Content-Type', 'image/avif');
        res.end(image);
      });
    },
  };
}
