import { defineConfig } from 'vite'
// If mode cjs(vite.config.cjs), should use `veaury/vite/cjs/index.cjs`
// If mode esm(vite.config.mjs), should use `veaury/vite/esm/index.mjs`
// If the configuration file of vite has a `.js` suffix(vite.config.js), it is recommended to import it in the following way.
import veauryVitePlugins from 'veaury/vite/index'
import { copyPackageJsonPlugin } from './vite-plugins/copy.plugin'
import dts from 'vite-plugin-dts'

export default defineConfig({
  server: {
    port: 8008
  },
  plugins: [
    dts({
      entryRoot: 'packages',
      outDir: ['dist/es', 'dist/lib'],
    }),
    // Turn off vue and vuejsx plugins
    // vue(),
    // vueJsx(),
    // When the type of veauryVitePlugins is set to vue,
    // only jsx in files in the directory named 'react_app' will be parsed with react jsx,
    // and jsx in other files will be parsed with vue jsx
    veauryVitePlugins({
      type: 'vue',
      // Configuration of @vitejs/plugin-vue
      // vueOptions: {...},
      // Configuration of @vitejs/plugin-react
      // reactOptions: {...},
      // Configuration of @vitejs/plugin-vue-jsx
      vueJsxOptions: {
      }
    }),
    copyPackageJsonPlugin(),
  ],
  build: {
    sourcemap: true,
    cssMinify: 'esbuild',
    lib: {
      entry: 'packages/index.ts',
      name: 'block-note-vue'
    },
    rollupOptions: {
      external: ['vue'],
      output: [
        {
          globals: {
            vue: 'Vue',
          },
          // Формат сборки
          format: 'es',
          // Имя выходного файла
          entryFileNames: '[name].mjs',
          // Сохранять структуру каталогов при сборке
          preserveModules: true,
          exports: 'auto',
          // Корневая директория выходной сборки
          dir: './dist/es'
        },
        {
          globals: {
            vue: 'Vue',
          },
          // Формат сборки
          format: 'cjs',
          // Имя выходного файла
          entryFileNames: '[name].js',
          // Сохранять структуру каталогов при сборке
          preserveModules: true,
          exports: 'auto',
          // Корневая директория выходной сборки
          dir: './dist/lib'
        }
      ]
    }
  }
})
