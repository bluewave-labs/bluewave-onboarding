import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 4173
  },
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/tests/**/*.test.jsx'],
    css: {
      modules: {
        classNameStrategy: 'non-scoped'
      }
    },
    server: {
      deps: {
        inline: ['mui-color-input']
      },
    },
  }
});
