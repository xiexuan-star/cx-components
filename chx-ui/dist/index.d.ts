import { Plugin } from 'vue';
import './style/index.scss';
declare const CxUI: Plugin;
export default CxUI;
export * from './lib';
export * from './lib/cx-form/hooks';
export * from './lib/cx-table/src/hooks';
export * from './lib/cx-dialog/useCxDialog';
export * from './lib/cx-form/types';
export * from './lib/cx-table/src/types';
export * from './lib/cx-dialog/types';
export * from './lib/cx-form/render';
export * from './lib/cx-table/src/utils';
export * from './lib/cx-table/src/constant';
