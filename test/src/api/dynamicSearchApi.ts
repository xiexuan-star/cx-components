import { DYNAMIC_BUSINESS_TYPE, DYNAMIC_MODULE_TYPE } from '@/enums/dynamicConfig';
import { CxAxios } from './axios/constructor';
import { $inventory } from './inventory';
import $factory from '.';
import { DYNAMIC_CONFIG, useCxTable } from '../../../chx-ui/src';
import * as R from 'ramda'

export type DynamicKeys = Partial<Pick<DYNAMIC_CONFIG, 'businessType' | 'modelType' | 'priceType'>>;

export type Rule = DynamicKeys & { api: string; requestInstance: CxAxios };

export type RuleList = Record<DYNAMIC_MODULE_TYPE, Rule[]>;

const mergeInventoryRequest = R.mergeRight<Partial<Rule>>({
  requestInstance: ($inventory as unknown) as CxAxios
});

const mergeFactoryRequest = R.mergeRight<Partial<Rule>>({
  requestInstance: ($factory as unknown) as CxAxios
});

const dynamicSearchApi = {
  [DYNAMIC_MODULE_TYPE.销售]: [
    { businessType: DYNAMIC_BUSINESS_TYPE['销售-日志'], api: '/sell/log' },
    { businessType: DYNAMIC_BUSINESS_TYPE['销售-待审核-日志'], api: '/sell/unAuditLog' },
    { businessType: DYNAMIC_BUSINESS_TYPE['销售-审核日志'], api: '/sell/auditLog' },
    { businessType: DYNAMIC_BUSINESS_TYPE['销售-退货-日志'], api: '/sell/refund/log' },
    { businessType: DYNAMIC_BUSINESS_TYPE['销售-退货-待审核日志'], api: '/sell/refund/unAuditLog' },
    { businessType: DYNAMIC_BUSINESS_TYPE['销售-退货-审核日志'], api: '/sell/refund/auditLog' }
  ].map(mergeFactoryRequest),
  [DYNAMIC_MODULE_TYPE.下单]: [].map(mergeFactoryRequest),
  [DYNAMIC_MODULE_TYPE.库存]: [
    { businessType: DYNAMIC_BUSINESS_TYPE['库存-入库-日志'], api: '/stock/in/log' },
    { businessType: DYNAMIC_BUSINESS_TYPE['库存-出库-日志'], api: '/stock/out/log' },
    { businessType: DYNAMIC_BUSINESS_TYPE['库存-调拨-日志'], api: '/stock/allot/log' },
    { businessType: DYNAMIC_BUSINESS_TYPE['库存-损耗-日志'], api: '/stock/loss/log' },
    {
      businessType: DYNAMIC_BUSINESS_TYPE['库存-入库-待审核日志'],
      api: '/stock/in/waiting/audit/list'
    },
    {
      businessType: DYNAMIC_BUSINESS_TYPE['库存-出库-待审核日志'],
      api: '/stock/out/waiting/audit/list'
    },
    {
      businessType: DYNAMIC_BUSINESS_TYPE['库存-调拨-待审核日志'],
      api: '/stock/allot/waiting/audit/list'
    },
    { businessType: DYNAMIC_BUSINESS_TYPE['库存-入库-审核日志'], api: '/stock/in/audit/list' },
    { businessType: DYNAMIC_BUSINESS_TYPE['库存-出库-审核日志'], api: '/stock/out/audit/list' },
    { businessType: DYNAMIC_BUSINESS_TYPE['库存-调拨-审核日志'], api: '/stock/allot/audit/list' },

    // { businessType: DYNAMIC_BUSINESS_TYPE['库存-盘点-操作'], api: '/cycleList' },
    { businessType: DYNAMIC_BUSINESS_TYPE['库存-盘点-待审核日志'], api: '/cycleList' },
    { businessType: DYNAMIC_BUSINESS_TYPE['库存-盘点-审核日志'], api: '/cycleList' },
    { businessType: DYNAMIC_BUSINESS_TYPE['库存-盘点-日志'], api: '/cycleList' }
  ].map(mergeInventoryRequest),
  [DYNAMIC_MODULE_TYPE.生产]: [
    { businessType: DYNAMIC_BUSINESS_TYPE['待生产-打单日志'], api: '/print/history' },
    { businessType: DYNAMIC_BUSINESS_TYPE['分件台-审核'], api: '/handOut/audit/list' },
    { businessType: DYNAMIC_BUSINESS_TYPE['分件台-审核-日志'], api: '/handOut/audit/logs' },
    { businessType: DYNAMIC_BUSINESS_TYPE['分件台-日志'], api: '/handOut/logs' }
  ].map(mergeFactoryRequest),
  [DYNAMIC_MODULE_TYPE.订单]: [].map(mergeFactoryRequest),
  [DYNAMIC_MODULE_TYPE.进度]: [].map(mergeFactoryRequest),
  [DYNAMIC_MODULE_TYPE.采购]: [
    { businessType: DYNAMIC_BUSINESS_TYPE['采购-日志'], api: '/purchase/log' },
    { businessType: DYNAMIC_BUSINESS_TYPE['采购-审核'], api: '/purchase/waiting/audit/list' },
    { businessType: DYNAMIC_BUSINESS_TYPE['采购-审核日志'], api: '/purchase/audit/list' },
    { businessType: DYNAMIC_BUSINESS_TYPE['采购-退货-日志'], api: 'purchase/return/log' },
    {
      businessType: DYNAMIC_BUSINESS_TYPE['采购-退货-审核'],
      api: '/purchase/return/waiting/audit/list'
    },
    {
      businessType: DYNAMIC_BUSINESS_TYPE['采购-退货-审核日志'],
      api: '/purchase/return/audit/list'
    }
  ].map(mergeInventoryRequest),
  [DYNAMIC_MODULE_TYPE.首页]: [].map(mergeFactoryRequest),
  [DYNAMIC_MODULE_TYPE.配石台]: [
    { businessType: DYNAMIC_BUSINESS_TYPE['配石台-审核'], api: '/part/stone/audit/list' },
    { businessType: DYNAMIC_BUSINESS_TYPE['配石台-审核日志'], api: '/part/stone/audit/logs' },
    { businessType: DYNAMIC_BUSINESS_TYPE['配石台-日志'], api: '/part/stone/log/data' }
  ].map(mergeFactoryRequest),
  [DYNAMIC_MODULE_TYPE.收发台]: [
    { businessType: DYNAMIC_BUSINESS_TYPE['收发台-日志'], api: '/allotLog/logs' },
    { businessType: DYNAMIC_BUSINESS_TYPE['收发台-审核'], api: '/allot/audit/list' },
    { businessType: DYNAMIC_BUSINESS_TYPE['收发台-审核日志'], api: '/allot/audit/logs' },
    { businessType: DYNAMIC_BUSINESS_TYPE['收发台-报废日志'], api: '/scrap/log' }
  ].map(mergeFactoryRequest),
  [DYNAMIC_MODULE_TYPE.过货台]: [
    { businessType: DYNAMIC_BUSINESS_TYPE['过货台-接货日志'], api: '/transfer/accept/logs' },
    { businessType: DYNAMIC_BUSINESS_TYPE['过货台-过货日志'], api: '/transfer/send/logs' },
    { businessType: DYNAMIC_BUSINESS_TYPE['过货台-拒接待处理日志'], api: '/transfer/refuse/logs' }
  ].map(mergeFactoryRequest),
  [DYNAMIC_MODULE_TYPE.打包台]: [
    { businessType: DYNAMIC_BUSINESS_TYPE['打包台-审核'], api: '/packaging/audit/list' },
    { businessType: DYNAMIC_BUSINESS_TYPE['打包台-审核日志'], api: '/packaging/audit/logs' },
    { businessType: DYNAMIC_BUSINESS_TYPE['打包台-日志'], api: '/packaging/log' }
  ].map(mergeFactoryRequest),
  [DYNAMIC_MODULE_TYPE.回收台]: [
    {
      businessType: DYNAMIC_BUSINESS_TYPE['回收台-金料-审核'],
      api: '/recycle/wait/audit/pageList'
    },
    { businessType: DYNAMIC_BUSINESS_TYPE['回收台-金料-审核日志'], api: 'recycle/audit/log' },
    { businessType: DYNAMIC_BUSINESS_TYPE['回收台-金料-日志'], api: '/recycle/gold/log' },
    { businessType: DYNAMIC_BUSINESS_TYPE['回收台-报废回收-审核'], api: '/recycle/wait/list' },
    { businessType: DYNAMIC_BUSINESS_TYPE['回收台-报废回收-审核日志'], api: '/recycle/auditLog' },
    { businessType: DYNAMIC_BUSINESS_TYPE['回收台-报废回收-日志'], api: '/recycle/log' }
  ].map(mergeFactoryRequest),
  [DYNAMIC_MODULE_TYPE.生产数据统计]: [],
  [DYNAMIC_MODULE_TYPE.工人计件统计]: [],
  [DYNAMIC_MODULE_TYPE.采购统计]: [],
  [DYNAMIC_MODULE_TYPE.非生产销售统计]: [],
  [DYNAMIC_MODULE_TYPE.生产销售统计]: [],
  [DYNAMIC_MODULE_TYPE.售后统计]: []
} as RuleList;

export const registDynamicFormApi = () => {
  const handle = useCxTable();
  Object.entries(dynamicSearchApi).forEach(([key, val]) => {
    handle.setDynamicFormSearchApi(key, val);
  });
};
