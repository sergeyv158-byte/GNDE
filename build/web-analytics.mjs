import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve, join } from 'node:path';

const analyticsMarkup = `<!-- GNDE Web Analytics -->
<script>window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };</script>
<script defer src="/_vercel/insights/script.js"></script>
`;
const insightsTag = /<script\b[^>]*\bsrc=["']\/_vercel\/insights\/script\.js["'][^>]*>/i;
const cityTag = /<script\b[^>]*\bsrc=["']\/api\/visitor-city["'][^>]*>/i;
const cityScript = '<script defer src="/api/visitor-city"></script>';

// GNDE serves static HTML, including pages copied directly from public/.
// Inject after writing the build so both Vite entrypoints and copied pages
// receive tracking. A component in the unused React app cannot cover them.
export function webAnalyticsPlugin() {
  let outputDirectory;

  function addAnalytics(directory) {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) {
        addAnalytics(path);
      } else if (entry.isFile() && entry.name.endsWith('.html')) {
        const html = readFileSync(path, 'utf8');
        let tracked = html;
        if (!insightsTag.test(tracked)) {
          if (!/<\/head\s*>/i.test(tracked)) {
            throw new Error(`Cannot add Web Analytics: missing </head> in ${path}`);
          }
          tracked = tracked.replace(/<\/head\s*>/i, `${analyticsMarkup}$&`);
        }
        if (!cityTag.test(tracked)) {
          tracked = tracked.replace(insightsTag, `${cityScript}\n$&`);
        }
        if (tracked !== html) writeFileSync(path, tracked);
      }
    }
  }

  return {
    name: 'gnde-static-web-analytics',
    apply: 'build',
    configResolved(config) {
      outputDirectory = resolve(config.root, config.build.outDir);
    },
    closeBundle() {
      addAnalytics(outputDirectory);
    },
  };
}
