import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  base: '/',
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/tests/**/*.test.jsx']
  },
});
