(globalThis as typeof globalThis & { global?: typeof globalThis }).global ??=
  globalThis;
// @ts-expect-error while QA package gets updated
await import('@kurocado-studio/qa/web/setup');
// @ts-expect-error while QA package gets updated
await import('@testing-library/jest-dom');
