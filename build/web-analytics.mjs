import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve, join } from 'node:path';

const analyticsMarkup = `<!-- GNDE Web Analytics -->
<script>window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };</script>
<script defer src="/_vercel/insights/script.js"></script>
`;

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
        if (html.includes('src="/_vercel/insights/script.js"')) continue;
        if (!/<\/head\s*>/i.test(html)) {
          throw new Error(`Cannot add Web Analytics: missing </head> in ${path}`);
        }
        writeFileSync(path, html.replace(/<\/head\s*>/i, `${analyticsMarkup}$&`));
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
