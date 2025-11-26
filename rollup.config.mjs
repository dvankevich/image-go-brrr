import { nodeResolve } from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import postcss from 'rollup-plugin-postcss';
import copy from 'rollup-plugin-copy';

export default {
  input: 'src/main.js',
  output: [
    {
      file: 'dist/carousel.esm.js',
      format: 'esm',
    },
    {
      file: 'dist/carousel.cjs.js',
      format: 'cjs',
    },
    {
      file: 'dist/carousel.min.js',
      format: 'iife',
      name: 'Carousel',
      plugins: [terser()],
    },
  ],
  plugins: [
    postcss({
      extract: 'carousel.css',
      minimize: true,
    }),
    nodeResolve(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
    }),
    copy({
      targets: [{ src: 'src/demo.html', dest: 'dist', rename: 'index.html' }],
    }),
  ],
};
