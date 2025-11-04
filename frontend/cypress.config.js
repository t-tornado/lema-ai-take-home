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
  },
});
