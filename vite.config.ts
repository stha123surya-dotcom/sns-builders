import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import crypto from 'crypto';

function sriPlugin() {
  return {
    name: 'sri',
    enforce: 'post',
    transformIndexHtml(html, context) {
      if (!context.bundle) return html;

      // Extract all script and link tags that have src/href pointing to local assets
      let newHtml = html;
      
      const assetUrls = Object.values(context.bundle)
        .filter(chunk => chunk.type === 'chunk' || chunk.type === 'asset')
        .map(chunk => `/${chunk.fileName}`);

      for (const [key, chunk] of Object.entries(context.bundle)) {
        const url = `/${chunk.fileName}`;
        let source;
        if (chunk.type === 'asset') {
          source = chunk.source;
        } else {
          source = chunk.code;
        }
        
        const hash = `sha384-${crypto.createHash('sha384').update(source).digest('base64')}`;
        // replace the un-hashed script/link with hashed one.
        // Vite generates things like <script type="module" crossorigin src="/assets/index-DXYG.js"></script>
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
