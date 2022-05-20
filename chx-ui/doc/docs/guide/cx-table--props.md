# Table 可操作表格Props

除与动态表格相关的功能介绍

## showTotalSum

表格是否显示底部合计

:::demoBlock

```vue

<template>
  <cx-table :table-config="tableConfig" :table-data="tableData" showTotalSum/>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'TableDemo',
  setup() {
    const tableConfig = {
      items: [
        { label: '序号', prop: 'index', sum: '总计', control: { type: 'index' } },
        { label: '数量(可编辑)', prop: 'num', sum: 'add', control: { type: 'input' } },
        {
          label: '单价(静态)',
          sum(rows) {
            const average = rows.reduce((sum, cur) => {
              return sum + cur.price
            }, 0) / rows.length
            return `平均单价:${average}`
          },
          prop: 'price'
        },
        {
          label: '总价(自动计算)', sum: 'add', prop: 'total', calculate: (rowData) => {
            return rowData.total = rowData.num * rowData.price;
          }
        },
        {
          label: '带属性的控件', prop: 'num2', sum: '占个位置', control: {
            type: 'input',
            attrs({ rowData, rowIndex }) {
              return { placeholder: '请输入大于' + rowData.total + '的数值' };
            }
          }
        }
      ]
    };
    const tableData = ref([
      { num: 10, price: 20 },
      { num: 20, price: 30 }
    ]);
    return { tableData, tableConfig };
  }
};
</script>

```

:::

## fixTotalSum/height/fixed

表格四个方向的固定

垂直方向的固定(表头,合计)只会在提供了height属性的情况下生效

提供height属性后, 表头自动固定, 合计通过fixTotalSum属性开启固定

水平方向的列固定通过列配置生效

::: demoBlock

```vue

<template>
  <cx-table
    :table-config="tableConfig"
    :table-data="tableData"
    showTotalSum
    fixTotalSum
    height="300px"
  />
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const tableConfig = {
      items: [
        { label: '序号', fixed: 'left', prop: 'index', sum: '总计', control: { type: 'index' } },
        ...Array.from({ length: 50 }).map((_, idx) => {
          return { label: idx + '', prop: idx + '' }
        }),
        { label: 'right', prop: 'right', fixed: 'right' }
      ]
    };
    const tableData = ref(Array.from({ length: 50 }).map((_, idx) => {
      return { label: idx + '', prop: idx + '' }
    }));
    return { tableData, tableConfig };
  }
};
</script>
```

:::
