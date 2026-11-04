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
  const newProbe = readFileSync(new URL('../OMB03096 300.jpg', import.meta.url));
  const mst360 = '/case-study-mst360-storage-tank-walls.html';
  const anchors = '/case-study-buried-anchor-rods.html';
  const pipelines = '/pipelines.html';
  const linkPhoto = (href, photo, duplicate) => href
    ? `<a class="gnde-ribbon-link" href="${href}"${duplicate ? ' tabindex="-1"' : ''}>${photo}</a>`
    : photo;

  // Coordinates are measured in the 4256 x 200 atlas. Each range includes the trailing gap.
  const segment = (start, end, alt, duplicate, href) => {
    const photo = `<img class="gnde-photo-atlas" src="/photo-ribbon.avif" width="4256" height="200" alt="${duplicate ? '' : alt}" draggable="false">`;
    return `<div class="gnde-photo-segment" style="--segment-ratio:${(end - start) / 200};--atlas-offset:${-start / 200}">
          ${linkPhoto(href, photo, duplicate)}
        </div>`;
  };
  const original = (src, alt, duplicate, href, dimensions = '') => {
    const photo = `<img class="gnde-photo-original" src="${src}" ${dimensions} alt="${duplicate ? '' : alt}" draggable="false">`;
    return `<div class="gnde-photo-frame">${linkPhoto(href, photo, duplicate)}</div>`;
  };
  const group = (duplicate) => `
      <div class="gnde-photo-strip"${duplicate ? ' aria-hidden="true"' : ''}>
        ${segment(0, 279, 'Guided waves spreading across a tank head. View the MsT 360 case study.', duplicate, mst360)}
        ${segment(279, 558, 'Partial-coverage bracelet on a pipe. View the 11-segment bracelet probe.', duplicate, pipelines + '#eleven-segment-bracelet')}
        ${segment(558, 720, 'Bracelet wrapped around a pipe. View the nine-segment bracelet probe.', duplicate, pipelines + '#nine-segment-bracelet')}
        ${segment(720, 1606, 'High-temperature pipe probe, heat exchanger inspection, field testing, and tank wall inspection.', duplicate)}
        ${segment(1606, 1768, 'Plate probes mounted on a flat steel anchor. View the buried flat-anchor case study.', duplicate, anchors + '#flat-anchor')}
        ${segment(1768, 1925, 'Probe installed on an anchor rod at the ground line. View the buried anchor rod case study.', duplicate, anchors)}
        ${segment(1925, 2237, 'Underwater inspection equipment.', duplicate)}
        ${original('/media/steel-rope-low-profile-probe.webp', 'Low-profile probe on a steel rope. Read about permanent monitoring.', duplicate, '/case-study-steel-rope.html#low-profile-monitoring', 'width="847" height="776"')}
        ${original('/photo-ribbon-bracelet.jpg', 'Bracelet probe mounted on a pipe. View the pipeline bracelet probes.', duplicate, pipelines + '#bracelet-installation', 'width="1358" height="861"')}
        ${segment(2752, 3031, 'Split-ring probes for anchor rods. View the buried anchor rod case study.', duplicate, anchors)}
        ${segment(3031, 3399, 'Inspection probe with long clamp arms.', duplicate)}
        ${segment(3399, 3698, 'Orange pipe monitoring probe. View SHM probes for aboveground and buried piping.', duplicate, '/structural-health-monitoring.html#aboveground-buried-pipes')}
        ${segment(3698, 3977, 'Probe mounted at the tank bottom. View the storage tank bottom case study.', duplicate, '/case-study-storage-tank-bottoms.html')}
        ${original('/photo-ribbon-new-probe.jpg', 'MsT 360 rotating probe. View the tank wall inspection case study.', duplicate, mst360, 'width="1937" height="1296"')}
        ${original('/D026693-magnetostrictive-sensor-reflectometer-02.jpg', 'Magnetostrictive guided-wave inspection instrument with laptop.', duplicate)}
      </div>`;
  const markup = `
<div class="gnde-photo-ribbon" id="inspection-photos" role="region" aria-label="GNDE inspection and sensor photographs" data-photo-count="18">
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
      this.emitFile({ type: 'asset', fileName: 'photo-ribbon-new-probe.jpg', source: newProbe });
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const path = req.url?.split('?')[0];
        if (path === '/photo-ribbon.avif') {
          res.setHeader('Content-Type', 'image/avif');
          return res.end(image);
        }
        if (path === '/photo-ribbon-new-probe.jpg') {
          res.setHeader('Content-Type', 'image/jpeg');
          return res.end(newProbe);
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
