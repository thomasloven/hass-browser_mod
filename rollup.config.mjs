import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import json from '@rollup/plugin-json';
import postcss from 'rollup-plugin-postcss';

export default defineConfig([
  // Plugin build
  {
    input: 'js/plugin/main.ts',
    output: {
      file: 'custom_components/browser_mod/browser_mod.js',
      format: 'iife',
      name: 'BrowserMod',
      sourcemap: false,
      inlineDynamicImports: true
    },
    plugins: [
      json(),
      postcss({
        inject: true,
        minimize: true
      }),
      resolve({
        browser: true,
        preferBuiltins: false,
        extensions: ['.js', '.ts', '.mjs', '.json']
      }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: false,
        sourceMap: true
      }),
      terser({
        format: {
          comments: false
        },
        compress: {
          drop_console: false,
          passes: 2
        },
        mangle: {
          properties: false
        }
      })
    ],
    onwarn(warning, warn) {
      // Suppress certain warnings
      if (warning.code === 'THIS_IS_UNDEFINED') return;
      if (warning.code === 'CIRCULAR_DEPENDENCY') return;
      warn(warning);
    }
  },
  // Config panel build
  {
    input: 'js/config_panel/main.ts',
    output: {
      file: 'custom_components/browser_mod/browser_mod_panel.js',
      format: 'iife',
      name: 'BrowserModPanel',
      sourcemap: false,
      inlineDynamicImports: true
    },
    plugins: [
      json(),
      postcss({
        inject: true,
        minimize: true
      }),
      resolve({
        browser: true,
        preferBuiltins: false,
        extensions: ['.js', '.ts', '.mjs', '.json']
      }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: false,
        sourceMap: true
      }),
      terser({
        format: {
          comments: false
        },
        compress: {
          drop_console: false,
          passes: 2
        },
        mangle: {
          properties: false
        }
      })
    ],
    onwarn(warning, warn) {
      if (warning.code === 'THIS_IS_UNDEFINED') return;
      if (warning.code === 'CIRCULAR_DEPENDENCY') return;
      warn(warning);
    }
  }
]);
