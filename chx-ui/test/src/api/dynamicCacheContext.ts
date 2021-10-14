import { CxAxios } from './axios/constructor';
import $factory from '.';
import { DYNAMIC_MODULE_TYPE } from '@/enums/dynamicConfig';
import { DYNAMIC_CONFIG, TypeOption, CacheContext, useCxTable } from '../../../src';
import { $inventory } from './inventory';

export type DynamicKeys = Partial<Pick<DYNAMIC_CONFIG, 'businessType' | 'modelType' | 'priceType'>>;

export type Rule = DynamicKeys & { api: string; requestInstance: CxAxios };

export type RuleList = Record<DYNAMIC_MODULE_TYPE, Rule[]>;

const dynamicCacheContext = {
  requestApiMap: {
    [TypeOption.未提交]: '/draft/manager/draft/list',
    [TypeOption.已反审]: '/draft/manager/order/list',
    [TypeOption.已驳回]: '/draft/manager/order/list'
  },
  removeApiMap: {
    [TypeOption.未提交]: '/draft/manager/draft/delete/',
    [TypeOption.已驳回]: '/draft/manager/order/delete/',
    [TypeOption.已反审]: '/draft/manager/order/delete/'
  },
  requestInstance: {
    [DYNAMIC_MODULE_TYPE.采购]: $inventory,
    [DYNAMIC_MODULE_TYPE.库存]: $inventory,
    default: $factory
  },
  cacheTypeTab: props => {
    return props.dynamic?.moduleType !== DYNAMIC_MODULE_TYPE.下单;
  },
  cacheLabelConfig: [
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
  ]
} as CacheContext;

export const registDynamicCacheContext = () => {
  const handle = useCxTable();
  Object.entries(dynamicCacheContext).forEach(([key, val]) => {
    handle.setDynamicCacheContext(key as any, val);
  });
};
