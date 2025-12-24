/* eslint import/no-default-export: 0 */
/* eslint import/no-cycle: 0 */
import { defineConfig, vitestConfig } from '@kurocado-studio/qa';

export default defineConfig({
  ...vitestConfig,
  test: {
    ...vitestConfig.test,
    environment: 'jsdom',
    setupFiles: ['./setup.web.ts'],
  },
});
