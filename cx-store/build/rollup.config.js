import typescript from 'rollup-plugin-typescript2'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { name } from '../package.json'
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser'

const file = type => `dist/${name}.${type}.js`

const overrides = {
  compilerOptions: { declaration: true },
  exclude: ["tests/**/*.ts"]
}

export { name, file }
export default {
  input: 'src/index.ts',
  output: {
    name,
    file: file('esm'),
    format: 'es'
  },
  plugins: [
    nodeResolve(),

    typescript({ tsconfigOverride: overrides }),
    commonjs({
      include: [
        "node_modules/**",
        "node_modules/**/*"
      ]
    }),
    terser()
  ],
}
