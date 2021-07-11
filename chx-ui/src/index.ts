import { Plugin } from 'vue';
import * as components from './lib'
import './style/index.scss'

const CxUI:Plugin = {
  install: (app) => {
    Object.values(components).forEach(component => {
      app.use(component);
    });
  }
}

// 全局引入
export default CxUI

// 局部引入
export const comps = components