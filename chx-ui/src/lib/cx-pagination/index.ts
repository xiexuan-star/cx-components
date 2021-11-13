import { App } from 'vue';
import { SFCWithInstall } from '../../types/interface';
import script from './cx-pagination';

script.install = (app: App) => {
  app.component(script.name, script);
};

const _CX_PAGINATION = script as SFCWithInstall<typeof script>;

export default _CX_PAGINATION;
