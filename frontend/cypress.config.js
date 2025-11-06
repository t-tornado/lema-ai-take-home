import { defineConfig } from 'cypress';
import viteConfig from './vite.config';

export default defineConfig({
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
      viteConfig,
    },
    specPattern: 'src/**/*.{cy,test}.{jsx,tsx}',
    supportFile: false,
    setupNodeEvents(on, config) {
      on('task', {
        log(message) {
          console.log(message); // This logs to the Node.js terminal
          return null; // Tasks must return a value or null
        },
      });
    },
  },
});
