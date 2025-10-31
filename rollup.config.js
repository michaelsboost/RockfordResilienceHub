import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/script.js',
  output: {
    file: 'dist/script.js',
    format: 'iife', // Immediately Invoked Function Expression, suitable for <script> tags
    name: 'rockfordresiliencehub',
    sourcemap: false,
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    terser(),                // minify JS
  ],
  treeshake: { moduleSideEffects: true },
};
