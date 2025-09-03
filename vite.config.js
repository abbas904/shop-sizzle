import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // تحسين حجم البناء
    rollupOptions: {
      output: {
        manualChunks: {
          // فصل مكتبات كبيرة
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          animation: ['framer-motion'],
          ui: ['react-hot-toast', 'lucide-react'],
          swiper: ['swiper'],
          query: ['@tanstack/react-query'],
        },
      },
    },
    // تحسين الأداء
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // تحسين حجم الملفات
    chunkSizeWarningLimit: 1000,
  },
  // تحسين الخادم المحلي
  server: {
    hmr: {
      overlay: false,
    },
  },
  // تحسين الأداء
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      'react-hot-toast',
      'lucide-react',
      'swiper',
      '@tanstack/react-query',
    ],
  },
});