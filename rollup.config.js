import {
  nodeResolve
} from '@rollup/plugin-node-resolve'
import globals from 'rollup-plugin-node-globals'
import commonjs from '@rollup/plugin-commonjs'
import {
  terser
} from 'rollup-plugin-terser'

// Plugins for web
const plugins = [nodeResolve({
  jsnext: true,
  main: true,
  browser: true,
}), commonjs(), globals(), terser()]

export default [{
    input: ['web/js/main.js'],
    output: {
      dir: 'dist/js',
      format: 'iife',
    },
    plugins
  }, {
    input: ['web/js/basics.js'],
    output: {
      dir: 'dist/js',
      format: 'iife',
    },
    plugins
  }, {
    input: ['web/js/screener.js'],
    output: {
      dir: 'dist/js',
      format: 'iife',
    },
    plugins
  }
]