import $factory from '@/api';
import { registDynamicCacheContext } from '@/api/dynamicCacheContext';
import { registDynamicFormApi } from '@/api/dynamicSearchApi';
import { useDynamicType } from '@/enums/dynamicConfig';
import 'chx-ui/dist/chx-ui.umd.css';
import { ElMessage } from 'element-plus';
import { App } from 'vue';
import CxUI, { useCxTable } from '../../../../src';
import { useCxFormRenderer } from './cx-form/renderer';
import useCxTableDefaultRenderer from './cx-table/renderer';

export const useChxUI = (app: App) => {
  app.use(CxUI as any);

  useCxTableDefaultRenderer();
  registDynamicFormApi();
  registDynamicCacheContext();
  useCxTable().setDynamicRequestInstance($factory);
  useCxTable().setMessageInstance(ElMessage);
  useCxFormRenderer();
  setTimeout(() => {
    useCxTable().setPrecision({ stoneAccuracy:2, priceAccuracy:3, goldAccuracy:3 });
  });
  useDynamicType();
};
