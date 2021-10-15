import { SFCWithInstall } from '@/types/interface';
import { App } from 'vue';
import script from './src/cxTable';
export * from './src/types/index';

script.install = (app: App) => {
  app.component(script.name, script)
}

const _CX_TABLE = script as SFCWithInstall<typeof script>

export default _CX_TABLE
