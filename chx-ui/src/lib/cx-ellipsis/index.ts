import { App } from 'vue';
import { SFCWithInstall } from '../../types/interface';
import script from './cx-ellipsis.vue';

script.install = (app: App) => {
  app.component(script.name, script);
};

const _CX_ELLIPSIS = script as SFCWithInstall<typeof script>;

export default _CX_ELLIPSIS;
