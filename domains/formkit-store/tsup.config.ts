/* eslint import/no-default-export:0 */
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/exports.ts'],
  format: ['esm'],
  dts: true,
  splitting: true,
  sourcemap: true,
  minify: true,
  target: 'esnext',
  clean: true,
});
