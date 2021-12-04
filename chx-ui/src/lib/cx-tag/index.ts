import CxTag from './cx-tag.vue';
import { App } from 'vue';
import { SFCWithInstall } from '../../types/interface';

const script = CxTag as SFCWithInstall<typeof CxTag>;

script.install = (app: App) => {
  app.component(script.name, script);
};

const _CX_TAG = script as SFCWithInstall<typeof script>;

export default _CX_TAG;
