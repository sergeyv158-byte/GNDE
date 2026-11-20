import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { photoRibbonPlugin } from './build/photo-ribbon.js';
import { technologyVideoPlugin } from './build/technology-video.mjs';
import { webAnalyticsPlugin } from './build/web-analytics.mjs';

export default defineConfig({
  plugins: [react(), photoRibbonPlugin(), technologyVideoPlugin(), webAnalyticsPlugin()],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        products: 'products.html',
        technology: 'magnetostrictive-guided-wave-technology.html',
        about: 'about.html',
      },
    },
  },
  server: { allowedHosts: ['terminal.local'] },
});

