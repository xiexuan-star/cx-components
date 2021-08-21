import { Plugin } from 'vue'
import * as components from './lib'

import './style/index.scss'

const CxUI: Plugin = {
  install: (app) => {
    Object.values(components).forEach((component) => {
      app.use(component)
    })
  },
}

// 全局引入
export default CxUI

// 局部引入
export * from './lib'

// 导出各组件hooks
export * from './lib/cx-form/hooks/index'

// 导出各组件types
export * from './lib/cx-form/types'

// 导出各组件renderer
export * from './lib/cx-form/render'
