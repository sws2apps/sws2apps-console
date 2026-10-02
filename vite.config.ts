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
        replacement: resolve(import.meta.dirname, 'src/components'),
      },
      {
        find: '@pages',
        replacement: resolve(import.meta.dirname, 'src/pages'),
      },
      {
        find: '@features',
        replacement: resolve(import.meta.dirname, 'src/features'),
      },
      {
        find: '@icons',
        replacement: resolve(import.meta.dirname, 'src/icons'),
      },
      {
        find: '@states',
        replacement: resolve(import.meta.dirname, 'src/states'),
      },
      {
        find: '@services',
        replacement: resolve(import.meta.dirname, 'src/services'),
      },
      {
        find: '@definition',
        replacement: resolve(import.meta.dirname, 'src/definition'),
      },
    ],
  },
});
