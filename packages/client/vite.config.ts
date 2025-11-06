import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import path from 'path'
dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
    proxy: {
      '/api/v2': {
        changeOrigin: true,
        cookieDomainRewrite: {
          '*': '',
        },
        target: 'http://localhost:3001',
      },
    },
  },
  define: {
    __EXTERNAL_SERVER_URL__: JSON.stringify(process.env.EXTERNAL_SERVER_URL),
    __INTERNAL_SERVER_URL__: JSON.stringify(process.env.INTERNAL_SERVER_URL),
  },
  build: {
    outDir: path.join(__dirname, 'dist/client'),
    manifest: true,
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'),
    },
  },
  ssr: {
    format: 'cjs',
    noExternal: ['@gravity-ui/uikit'],
  },
  plugins: [
    react(),
    // Подключаем PWA-плагин только если он установлен (чтобы dev не падал)
    ...(() => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const { VitePWA } = require('vite-plugin-pwa')
        return [
          VitePWA({
            strategies: 'injectManifest',
            srcDir: 'src',
            filename: 'custom-sw.js',
            injectManifest: {
              globPatterns: [
                '**/*.{js,css,html,png,svg,ico,webp,jpg,jpeg,woff2}',
              ],
            },
            manifest: {
              name: 'Crocodile Game',
              short_name: 'Crocodile',
              start_url: '/',
              display: 'standalone',
              background_color: '#000',
              theme_color: '#000',
            },
          }),
        ]
      } catch {
        return []
      }
    })(),
  ],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@apis': path.resolve(__dirname, 'src/apis'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@slices': path.resolve(__dirname, 'src/slices'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@utils': path.resolve(__dirname, 'src/utils'),
    },
  },
  css: {
    modules: {
      generateScopedName: '[name]__[local]___[hash:base64:5]',
    },
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
})
