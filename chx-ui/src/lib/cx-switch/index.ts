import {
  App
} from 'vue';
import { SFCWithInstall } from '../../types/interface';
import script from './cx-switch.vue';

script.install = (app: App) => {
  app.component(script.name, script);
};

const _CX_SWITCH = script as SFCWithInstall<typeof script>

export default _CX_SWITCH
