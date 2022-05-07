import vue from 'rollup-plugin-vue';
import typescript from 'rollup-plugin-typescript2';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { name } from '../package.json';
import commonjs from 'rollup-plugin-commonjs';
import scss from 'rollup-plugin-scss';
import fs from 'fs';

const file = type => `dist/${name}.${type}.js`;
const overrides = {
  compilerOptions: { declaration: true },
  exclude: ["tests/**/*.ts", "tests/**/*.tsx"]
};

export { name, file };

let components = fs.readdirSync('src/lib');
components = components.filter(component => !component.includes('.ts'));

export default {
  // input: {
  //   // index: 'src/index.ts',
  //   ...components.reduce((res, dirName) => {
  //     res[dirName] = `src/lib/${dirName}/index.ts`;
  //     return res;
  //   }, {})
  // },
  input: 'src/index.ts',
  plugins: [
    nodeResolve(),
    typescript({ tsconfigOverride: overrides }),
    vue(),
    scss(),
    commonjs({
      include: [
        "node_modules/**",
        "node_modules/**/*"
      ]
    }),
    // terser()
  ],
  external: ['vue', 'dayjs', 'ramda', 'pinyin-match', 'vuedraggable', 'cx-store', 'chx-utils']
};
