import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import eslint from 'rollup-plugin-eslint';
import flow from 'rollup-plugin-flow';

import pegjs from './src/rollup/plugins/pegjs';

const pkg = require('./package.json');
const external = Object.keys(pkg.dependencies);

export default {
  entry: 'src/scripts/index.js',
  dest: 'dist/bundle.js',
  plugins: [
    nodeResolve({ jsnext: true }),
    commonjs({
      include: [
        'node_modules/**',
      ],
    }),
    eslint({
      include: [
        'src/scripts/**/*.js',
      ],
    })
    babel({
      exclude: [
        'node_modules/**',
        'src/scripts/grammars/*.pegjs',
      ],
    }),
    flow(),
    pegjs({ optimize: 'speed' }),
  ]
};
