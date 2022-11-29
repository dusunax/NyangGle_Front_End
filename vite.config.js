import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api' : 'http://ec2-15-164-250-89.ap-northeast-2.compute.amazonaws.com:8081'
    },
  },
});
