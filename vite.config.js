import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { photoRibbonPlugin } from './build/photo-ribbon.js';

export default defineConfig({
  plugins: [react(), photoRibbonPlugin()],
});
