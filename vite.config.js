import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { photoRibbonPlugin } from './build/photo-ribbon.js';
import { technologyVideoPlugin } from './build/technology-video.mjs';

export default defineConfig({
  plugins: [react(), photoRibbonPlugin(), technologyVideoPlugin()],
  server: { allowedHosts: ['terminal.local'] },
});
