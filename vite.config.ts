import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/muse-catalog',
  plugins: [react()],
  resolve: {
    alias: {
      '@/assets': '/src/assets',
      '@/components': '/src/components',
      '@/containers': '/src/containers',
      '@/hooks': '/src/hooks',
      '@/layouts': '/src/layouts',
      '@/pages': '/src/pages',
      '@/routes': '/src/routes',
      '@/services': '/src/services',
      '@/ui': '/src/ui',
    },
  },
})
