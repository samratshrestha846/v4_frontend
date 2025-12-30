import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import commonjs from 'vite-plugin-commonjs';
// eslint-disable-next-line import/no-extraneous-dependencies
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  // depending on your application, base can also be "/"
  base: '/',
  plugins: [
    svgr({
      svgrOptions: {
        icon: true, // Allows easy resizing
      },
    }),
    react(),
    viteTsconfigPaths(),
    commonjs(),
  ],
  server: {
    // this ensures that the browser opens upon server start
    open: true,
    // this sets a default port to 3000
    port: 3000,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  assetsInclude: [
    '**/*.woff',
    '**/*.woff2',
    '**/*.eot',
    '**/*.ttf',
    '**/*.svg',
  ],
});
