<template>
  <div id="nav">
    <CxTable :tableConfig="tableConfig" :tableData="[]"></CxTable>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { DYNAMIC_CONFIG } from '../../src';
import {
  DYNAMIC_MODULE_TYPE,
  DYNAMIC_BUSINESS_TYPE,
  DYNAMIC_PRICE_TYPE,
  DYNAMIC_MODEL_TYPE
} from './enums/dynamicConfig';
export default defineComponent({
  setup() {
    const dynamicConfig: DYNAMIC_CONFIG = {
      moduleType: DYNAMIC_MODULE_TYPE.采购,
      businessType: DYNAMIC_BUSINESS_TYPE['采购-操作'],
      modelType: DYNAMIC_MODEL_TYPE.金料,
      priceType: DYNAMIC_PRICE_TYPE.默认
    };

    const tableConfig = [{ label: 'aa', prop: 'aa' }];

    return { dynamicConfig, tableConfig };
  }
});
</script>
