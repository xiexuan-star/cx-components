import { App } from 'vue';
import { SFCWithInstall } from '../../types/interface';
import script from './uniPopper';

export * from './types';

const _CX_UNI_POPPER = script as SFCWithInstall<typeof script>;

_CX_UNI_POPPER.install = (app: App) => {
  app.directive(script.name, script);
};

export default _CX_UNI_POPPER;
