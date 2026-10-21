import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

// Preserve the optimized source atlas. The displayed group ends at x=3977,
// just before the final (plain tank) tile. All 16 retained photos stay whole.
export function photoRibbonPlugin() {
  const image = Buffer.concat([1, 2, 3, 4].map((n) =>
    readFileSync(new URL(`../assets/photo-ribbon/strip.part${n}`, import.meta.url))));
  const expected = '84d73f4452df37235d7ace3e708dbd862e45c90c677510077017546e5a2571a2';
  if (createHash('sha256').update(image).digest('hex') !== expected) {
    throw new Error('Photo ribbon asset failed its integrity check.');
  }
  const group = (duplicate) => `
      <div class="gnde-photo-strip"${duplicate ? ' aria-hidden="true"' : ''}>
        <img class="gnde-photo-atlas" src="/photo-ribbon.avif" width="4256" height="200" alt="${duplicate ? '' : 'Sixteen GNDE photographs: tank end inspection with guided-wave rings, pipe installations, sensor arrays, heat exchanger inspection, field testing, tank wall inspection, anchor monitoring, underwater inspection, wire rope monitoring, and probe products.'}" draggable="false">
      </div>`;
  const markup = `
<div class="gnde-photo-ribbon" id="inspection-photos" role="region" aria-label="GNDE inspection and sensor photographs" data-photo-count="16">
  <div class="gnde-photo-window" tabindex="0" aria-label="Scrolling inspection photos. Use arrow keys or swipe to browse.">
    <div class="gnde-photo-track">${group(true)}${group(false)}${group(true)}
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
