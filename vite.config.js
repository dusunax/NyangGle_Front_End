import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const dev = 'https://localhost:8081';
const prod = 'https://www.nyangnyang-letter.xyz';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': dev,
    },
  },
  esbuild: {
    // drop: ['console', 'debugger'],
  },
});
