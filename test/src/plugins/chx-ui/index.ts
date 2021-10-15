import $factory from '@/api';
import { registDynamicCacheContext } from '@/api/dynamicCacheContext';
import { registDynamicFormApi } from '@/api/dynamicSearchApi';
import CxUI from '@/components';
import { useCxTable } from '@/components/cx-table/src/hooks';
import { useDynamicType } from '@/enums/dynamicConfig';
import { ElMessage } from 'element-plus';
import { App } from 'vue';
import useCxTableDefaultRenderer from './cx-table/renderer';

export const useChxUI = (app: App) => {
  app.use(CxUI as any);

  useCxTableDefaultRenderer();
  registDynamicFormApi();
  registDynamicCacheContext();
  useCxTable().setDynamicRequestInstance($factory);
  useCxTable().setMessageInstance(ElMessage);
  setTimeout(() => {
    useCxTable().setPrecision({ stoneAccuracy:2, priceAccuracy:3, goldAccuracy:3 });
  });
  useDynamicType();
};
