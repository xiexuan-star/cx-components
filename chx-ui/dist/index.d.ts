import { Plugin } from 'vue';
import './style/index.scss';
declare const CxUI: Plugin;
export default CxUI;
export * from './lib';
export * from './lib/cx-form/hooks/index';
export * from './lib/cx-form/types';
export * from './lib/cx-form/render';
