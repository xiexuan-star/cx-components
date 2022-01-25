import {
  App
} from 'vue';
import { SFCWithInstall } from '../../types/interface';
import script from './cx-description-item';

script.install = (app: App) => {
  app.component(script.name, script);
};

const _CX_DESCRIPTION_ITEM = script as SFCWithInstall<typeof script>

export default _CX_DESCRIPTION_ITEM
