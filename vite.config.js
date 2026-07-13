import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import postcssNesting from 'postcss-nesting';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  return {
    plugins: [
      vue(),
    ],
    build: {
      sourcemap: false,
    },
    server: {
      sourcemap: false,
    },
    // build: {
    //   outDir: '../dist',
    //   assetsDir: '',
    //   sourcemap: true,
    //   chunkSizeWarningLimit: 1800,
    //   rollupOptions: {
    //     output: {
    //       assetFileNames: assetInfo => {
    //         const info = assetInfo.name.split('.');
    //         const extType = info[info.length - 1];
    //         if (/\.(png|jpe?g|gif|svg|webp|webm|mp3)$/.test(assetInfo.name)) {
    //           return `img/[name]-[hash].${extType}`;
    //         }
    //         if (/\.(css)$/.test(assetInfo.name)) {
    //           return `css/[name]-[hash].${extType}`;
    //         }
    //         if (/\.(woff|woff2|eot|ttf|otf)$/.test(assetInfo.name)) {
    //           return `fonts/[name]-[hash].${extType}`;
    //         }
    //         return `${extType}/[name]-[hash][extname]`;
    //       },
    //       chunkFileNames: "js/[name]-[hash].js",
    //       entryFileNames: "js/[name]-[hash].js",
    //   }
    //   }
    // },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    css: {
      postcss: {
          plugins: [
              postcssNesting
          ],
      },
    },
    // base:
    //   env.NODE_ENV === 'production'
    //     ? env.BASE_PATH || env.VITE_MKT_CONSOLE_BASE_PATH
    //     : '/',
  } 
})
