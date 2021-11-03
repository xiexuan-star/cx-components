import { App } from 'vue'
import { SFCWithInstall } from '../../types/interface'
import script from './cx-overlay.vue'

script.install = (app: App) => {
  app.component(script.name, script)
}

const _CX_OVERLAY = script as SFCWithInstall<typeof script>

export default _CX_OVERLAY
