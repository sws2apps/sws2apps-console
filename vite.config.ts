import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: '@components',
        replacement: resolve(__dirname, 'src/components'),
      },
      {
        find: '@pages',
        replacement: resolve(__dirname, 'src/pages'),
      },
      {
        find: '@features',
        replacement: resolve(__dirname, 'src/features'),
      },
      {
        find: '@icons',
        replacement: resolve(__dirname, 'src/icons'),
      },
      {
        find: '@states',
        replacement: resolve(__dirname, 'src/states'),
      },
      {
        find: '@services',
        replacement: resolve(__dirname, 'src/services'),
      },
      {
        find: '@definition',
        replacement: resolve(__dirname, 'src/definition'),
      },
    ],
  },
});
