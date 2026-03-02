/* eslint import/no-default-export: 0 */
/* eslint import/no-cycle: 0 */
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import 'reflect-metadata';
import { defineConfig } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [tailwindcss(), react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      util: path.resolve(__dirname, 'src/shared/utils/util-browser.js'),
    },
  },
  define: {
    process: { env: {} },
  },
});
