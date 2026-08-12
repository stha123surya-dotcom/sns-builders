import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv, Plugin} from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import crypto from 'crypto';

function sriPlugin(): Plugin {
  return {
    name: 'sri',
    enforce: 'post',
    transformIndexHtml(html: string, context: any) {
      if (!context.bundle) return html;

      let newHtml = html;

      for (const [, chunk] of Object.entries(context.bundle) as [string, any][]) {
        const url = `/${chunk.fileName}`;
        let source: string | Buffer;
        if (chunk.type === 'asset') {
          source = chunk.source;
        } else {
          source = chunk.code;
        }
        
        if (!source) continue;
        const hash = `sha384-${crypto.createHash('sha384').update(source).digest('base64')}`;
        newHtml = newHtml.replace(
          new RegExp(`(src|href)="\\.?${url}"`, 'g'),
          `$1="${url}" integrity="${hash}" crossorigin="anonymous"`
        );
      }
      return newHtml;
    }
  };
}

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    base: './',
    plugins: [
      react(), 
      tailwindcss(),
      sriPlugin(),
      VitePWA({
        registerType: 'autoUpdate',
        devOptions: {
          enabled: false
        },
        workbox: {
          navigateFallbackDenylist: [/^\/__/],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/firestore\.googleapis\.com\/.*/i,
              handler: 'NetworkOnly',
            },
            {
              urlPattern: /^https:\/\/securetoken\.googleapis\.com\/.*/i,
              handler: 'NetworkOnly',
            },
            {
              urlPattern: /^https:\/\/identitytoolkit\.googleapis\.com\/.*/i,
              handler: 'NetworkOnly',
            }
          ]
        },
        manifest: {
          name: 'Shape and Structure Builders',
          short_name: 'S&S Builders',
          description: 'Shape and Structure Builders app',
          theme_color: '#ffffff',
          background_color: '#ffffff',
          display: 'standalone',
          icons: [
            {
              src: 'https://github.com/stha123surya-dotcom/website-practice/blob/main/Images/logo.png?raw=true',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: 'https://github.com/stha123surya-dotcom/website-practice/blob/main/Images/logo.png?raw=true',
              sizes: '512x512',
              type: 'image/png'
            }
          ]
        }
      })
    ],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY || ''),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
