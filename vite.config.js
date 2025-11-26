import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'My Widget PWA',
        short_name: 'WidgetPWA',
        start_url: '/widget',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/svg+xml'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/svg+xml'
          }
        ],
        widgets: [
          {
            name: 'Random Word Widget',
            short_name: 'WordWidget',
            description: 'Shows random words',
            id: 'word-widget',
            path: '/widget',
            icon: '/pwa-192x192.png',
            live_data: {
              type: 'text'
            }
          }
        ]
      }
    })
  ]
});
