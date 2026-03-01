/* eslint import/no-default-export: 0 */
import { execSync } from 'node:child_process';
import { defineConfig } from 'tsup';

export default defineConfig((options) => ({
  ...options,
  bundle: false,
  entry: ['./src/index.ts', './src/setup.web.ts'],
  target: ['esnext'],
  format: ['esm'],
  dts: true,
  clean: true,
  splitting: true,
  treeshake: true,
  onSuccess: async (): Promise<void> => {
    execSync('copyfiles -u 1 src/**/tsconfig.*.json dist', {
      stdio: 'inherit',
    });
  },
}));
