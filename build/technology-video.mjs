import { readFileSync } from 'node:fs';
import { gunzipSync } from 'node:zlib';
import { createHash } from 'node:crypto';

// Lossless transport parts preserve the exact owner-supplied MP4 in Git.
export function technologyVideoPlugin() {
  const packed = Buffer.concat(Array.from({ length: 16 }, (_, i) =>
    readFileSync(new URL(`../assets/technology-video/video.mp4.gz.part${String(i + 1).padStart(2, '0')}`, import.meta.url))));
  const video = gunzipSync(packed);
  const expected = '98ccf6333140ab1542c4a62fac544216b4714e5b83c50da7c6554b6eff817a99';
  if (video.length !== 64278 || createHash('sha256').update(video).digest('hex') !== expected) {
    throw new Error('FeCo video integrity check failed. Restore the original transport parts.');
  }
  const fileName = 'feco-wave-propagation.mp4';
  // The owner requested 2x drawing size inside the same player. The original
  // remains intact; this derivative removes only the surrounding white margins.
  const displayFileName = 'feco-wave-propagation-2x.mp4';
  const placeholder = '<div class="wiedemann-animation">\n<div class="media-slot tech-media"><div><strong>Guided-wave generation animation</strong><br>Coil 1 and Coil 2 excitation<br>Waves propagating outward from the central FeCo patch</div></div>\n<p class="tech-caption">Approved 15.6-second MP4 animation to be embedded here when its video file is available. The animation illustrates guided-wave propagation from the FeCo strip.</p>\n</div>';
  const player = `<figure class="wiedemann-animation feco-video" id="feco-wave-animation">
<h4 id="feco-video-title">Guided-wave generation animation</h4>
<video controls playsinline preload="metadata" width="1280" height="720" aria-labelledby="feco-video-title" aria-describedby="feco-video-caption">
<source src="/${displayFileName}" type="video/mp4">
Your browser cannot play this video. <a href="/${displayFileName}">Open the MP4 animation</a>.
</video>
<figcaption class="tech-caption" id="feco-video-caption">Coil excitation and guided-wave propagation from the central FeCo strip. Silent, 15.6-second animation; use the controls to play, pause, seek, or view fullscreen.</figcaption>
</figure>`;
  return {
    name: 'gnde-feco-technology-video',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        if (html.includes('id="feco-wave-animation"')) return html;
        // The approved page now embeds the video directly; keep that markup
        // and point it to the verified MP4 emitted below.
        if (html.includes('<div class="wiedemann-animation">') &&
            html.includes('/feco-wave-propagation-3x.mp4')) {
          return html;
        }
        if (html.includes('<div class="wiedemann-animation">') &&
            html.includes('/feco-wave-propagation-2x.mp4')) {
          return html.replace('/feco-wave-propagation-2x.mp4', '/feco-wave-propagation.mp4');
        }
        if (!html.includes(placeholder)) throw new Error('Cannot locate the approved FeCo animation placeholder.');
        return {
          html: html.replace(placeholder, player),
          tags: [{ tag: 'link', attrs: { rel: 'stylesheet', href: '/technology-video.css' }, injectTo: 'head' }],
        };
      },
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName, source: video });
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url?.split('?')[0] !== `/${fileName}`) return next();
        if (!['GET', 'HEAD'].includes(req.method)) {
          res.statusCode = 405;
          res.setHeader('Allow', 'GET, HEAD');
          return res.end();
        }
        res.setHeader('Content-Type', 'video/mp4');
        res.setHeader('Accept-Ranges', 'bytes');
        res.setHeader('Cache-Control', 'no-cache');
        let start = 0, end = video.length - 1;
        if (req.headers.range && req.method === 'GET') {
          const match = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
          if (!match || (!match[1] && !match[2])) {
            res.statusCode = 416;
            res.setHeader('Content-Range', `bytes */${video.length}`);
            return res.end();
          }
          start = match[1] ? Number(match[1]) : Math.max(0, video.length - Number(match[2]));
          end = match[1] && match[2] ? Math.min(Number(match[2]), end) : end;
          if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start > end || start >= video.length) {
            res.statusCode = 416;
            res.setHeader('Content-Range', `bytes */${video.length}`);
            return res.end();
          }
          res.statusCode = 206;
          res.setHeader('Content-Range', `bytes ${start}-${end}/${video.length}`);
        }
        res.setHeader('Content-Length', end - start + 1);
        return res.end(req.method === 'HEAD' ? undefined : video.subarray(start, end + 1));
      });
    },
  };
}
