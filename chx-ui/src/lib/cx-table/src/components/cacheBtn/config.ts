import { DYNAMIC_MODULE_TYPE } from '@/enums/dynamicConfig';
import { DYNAMIC_CONFIG } from '../../..';

type labelProp = { label?: string; prop: string; defaultValue?: string } & {
  [P in `label_1` | `label_0` | `label_2`]?: string;
};
export type CacheRule = Partial<DYNAMIC_CONFIG> & {
  config: { listTitle: labelProp; tableInfo: labelProp[] };
};

export const cacheConfigList: CacheRule[] = [
  {
    moduleType: DYNAMIC_MODULE_TYPE.下单,
    config: {
      listTitle: { label: '商户', prop: 'merchantName' },
      tableInfo: [
        { label: '商户名', prop: 'merchantName' },
        { label: '提交人', prop: 'createBy' },
        { label: '提交时间', prop: 'gmtCreate' }
      ]
    }
  },
  {
    moduleType: DYNAMIC_MODULE_TYPE.销售,
    config: {
      listTitle: { label: '商户', prop: 'merchantName' },
      tableInfo: [
        { label: '商户', prop: 'merchantName' },
        { label: '计价方式', prop: 'goldModeText' },
        { label: '提交人', prop: 'createBy' },
        { label: '提交时间', prop: 'gmtCreate' },
        { label_1: '驳回时间', label_2: '反审时间', prop: 'gmtModified' }
      ]
    }
  },
  {
    moduleType: DYNAMIC_MODULE_TYPE.配石台,
    config: {
      listTitle: { label: '生产单号', prop: 'orderProperty' },
      tableInfo: [
        { label: '生产单号', prop: 'orderProperty' },
        { label: '提交人', prop: 'createBy' },
        { label: '提交时间', prop: 'gmtCreate' },
        { label_1: '驳回时间', label_2: '反审时间', prop: 'gmtModified' }
      ]
    }
  },
  {
    moduleType: DYNAMIC_MODULE_TYPE.库存,
    config: {
      listTitle: { label: '商户名', prop: 'orderProperty' },
      tableInfo: [
        { label: '商户名', prop: 'orderProperty' },
        { label: '提交人', prop: 'createBy' },
        { label: '提交时间', prop: 'gmtCreate' },
        { label_1: '驳回时间', label_2: '反审时间', prop: 'gmtModified' }
      ]
    }
  },
  {
    moduleType: DYNAMIC_MODULE_TYPE.采购,
    config: {
      listTitle: { label: '供应商', prop: 'orderProperty' },
      tableInfo: [
        { label: '业务类型', prop: '_____', defaultValue: '向供应商采购' },
        { label: '供应商', prop: 'orderProperty' },
        { label: '业务单号', prop: 'relatedBusinessNum' },
        { label: '提交人', prop: 'createBy' },
        { label: '提交时间', prop: 'gmtCreate' },
        { label_1: '驳回时间', label_2: '反审时间', prop: 'gmtModified' }
      ]
    }
  }
];
