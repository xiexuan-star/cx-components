import { App } from 'vue';
import { SFCWithInstall } from '../../types/interface';
import script from './number-input';

const _CX_NUMBER_INPUT = script as SFCWithInstall<typeof script>

_CX_NUMBER_INPUT.install = (app: App) => {
  app.directive(script.name, script)
}

export default _CX_NUMBER_INPUT
