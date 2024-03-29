import CxForm from './cxForm';
import { App } from 'vue';
import { SFCWithInstall } from '../../types/interface';

const script = CxForm as SFCWithInstall<typeof CxForm>;

script.install = (app: App) => {
  app.component(script.name, script);
};

const _CX_FORM = script as SFCWithInstall<typeof script>;

export default _CX_FORM;
