import { Plugin } from 'vue';
import * as components from './lib';
import './style/index.scss';
declare const CxUI: Plugin;
export default CxUI;
export declare const comps: typeof components;
export * from './lib/cx-form/hooks/index';
export * from './lib/cx-form/types';
export * from './lib/cx-form/render';
