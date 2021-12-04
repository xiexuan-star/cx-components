import { App } from 'vue';
import { SFCWithInstall } from '../../types/interface';
import script from './cxTable';

export * from './types/index';

script.install = (app: App) => {
  app.component(script.name, script);
};

const _CX_TABLE = script as SFCWithInstall<typeof script>;

export default _CX_TABLE;
