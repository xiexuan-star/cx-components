<template>
  <cx-table :table-config="tableConfig" :table-data="tableData" v-bind="$attrs"/>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'TableDemo',
  setup() {
    const tableConfig = {
      items: [
        { label: '序号', prop: 'index', control: { type: 'index' } },
        { label: '数量(可编辑)', prop: 'num', control: { type: 'input' } },
        { label: '单价(静态)', prop: 'price' },
        {
          label: '总价(自动计算)', prop: 'total', calculate: (rowData) => {
            return rowData.total = rowData.num * rowData.price;
          }
        },
        {
          label: '带属性的控件', prop: 'num2', sum: 'add', control: {
            type: 'input',
            attrs({ rowData, rowIndex }) {
              return { placeholder: '请输入大于' + rowData.total + '的数值' };
            }
          }
        }
      ]
    };
    const tableData = ref([
      { num: 10, price: 20 }
    ]);
    return { tableData, tableConfig };
  }
};
</script>
