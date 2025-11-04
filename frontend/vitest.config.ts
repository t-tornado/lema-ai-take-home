import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.ts',
    coverage: {
      enabled: false,
      reporter: ['text', 'html', 'lcov'],
      exclude: ['src/main.tsx', 'src/vite-env.d.ts'],
    },
    include: ['src/**/*.test.ts'],
    exclude: ['src/**/*.test.tsx', 'src/**/*.cy.tsx'],
  },
});
