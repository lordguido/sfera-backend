import { defineConfig } from 'vitest';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['tests/**/*.test.js'],
    coverage: {
      provider: 'c8',
      reporter: ['text', 'html'],
    },
  },
});
