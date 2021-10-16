import { Plugin } from 'vue';
import './style/index.scss';
declare const CxUI: Plugin;
export default CxUI;
export * from './lib';
export * from './hooks/state';
export * from './lib/cx-form/hooks';
export * from './lib/cx-table/hooks';
export * from './lib/cx-dialog/useCxDialog';
export * from './lib/cx-form/types';
export * from './lib/cx-table/types';
export * from './lib/cx-dialog/types';
export * from './lib/cx-form/render';
export * from './utils';
export * from './lib/cx-table/utils';
export * from './lib/cx-table/constant';
