import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

// Preserve the original atlas, but replace its blurry brown-pipe tile (12)
// with the original bracelet photograph. Keep the plain-tank tile (17) hidden.
export function photoRibbonPlugin() {
  const image = Buffer.concat([1, 2, 3, 4].map((n) =>
    readFileSync(new URL(`../assets/photo-ribbon/strip.part${n}`, import.meta.url))));
  const expected = '84d73f4452df37235d7ace3e708dbd862e45c90c677510077017546e5a2571a2';
  if (createHash('sha256').update(image).digest('hex') !== expected) {
    throw new Error('Photo ribbon asset failed its integrity check.');
  }
  const bracelet = readFileSync(new URL('../assets/source-images/bracelet.jpg', import.meta.url));
  if (createHash('sha256').update(bracelet).digest('hex') !==
      '65ce53db155d3d9f0309ba82289c02c9ef026dabfad16965e888ef5bb552e73b') {
    throw new Error('Original bracelet photograph failed its integrity check.');
  }
  // Atlas coordinates include each complete retained photograph and its gap.
  // 0..2467: photos 1-11; 2467..2752: old photo 12; 2752..3977: photos 13-16.
  const segment = (start, width, alt) => `
        <div class="gnde-photo-segment" style="--segment-ratio:${width / 200};--atlas-offset:${-start / 200}">
          <img class="gnde-photo-atlas" src="/photo-ribbon.avif" width="4256" height="200" alt="${alt}" draggable="false">
        </div>`;
  const group = (duplicate) => `
      <div class="gnde-photo-strip"${duplicate ? ' aria-hidden="true"' : ''}>
        ${segment(0, 2467, duplicate ? '' : 'GNDE tank inspection with guided-wave rings, pipe installations, sensor arrays, heat exchanger inspection, field testing, tank wall inspection, anchor monitoring, underwater inspection, and wire rope monitoring.')}
        <div class="gnde-photo-frame">
          <img class="gnde-photo-original" src="/photo-ribbon-bracelet.jpg" width="1358" height="861" alt="${duplicate ? '' : 'Black magnetostrictive sensor bracelet on a brown pipe, with the inspection instrument beside it.'}" draggable="false">
        </div>
        ${segment(2752, 1225, duplicate ? '' : 'GNDE clamp sensors, probe products, and field inspection equipment.')}
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
      this.emitFile({ type: 'asset', fileName: 'photo-ribbon-bracelet.jpg', source: bracelet });
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const path = req.url?.split('?')[0];
        if (path === '/photo-ribbon.avif') {
          res.setHeader('Content-Type', 'image/avif');
          return res.end(image);
        }
        if (path === '/photo-ribbon-bracelet.jpg') {
          res.setHeader('Content-Type', 'image/jpeg');
          return res.end(bracelet);
        }
        next();
      });
    },
  };
}
