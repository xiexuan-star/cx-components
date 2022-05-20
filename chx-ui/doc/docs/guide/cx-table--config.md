# Table 可操作表格

可操作表格, 适用于业务中的大部分功能

## 基本使用

::: demo 通过传入tableConfig与tableData即可渲染基础表格

```vue

<template>
  <cx-table :table-data="tableData" :table-config="tableConfig"></cx-table>
</template>
<script>
import { ref } from 'vue';

export default {
  setup() {
    const tableConfig = {
      items: Array.from({ length: 10 }).map((_, index) => {
        return { label: 'label' + index, prop: 'prop' + index }
      })
    }
    const tableData = ref([
      Array.from({ length: 10 }).reduce((fin, cur, idx) => {
        fin['prop' + idx] = 'prop' + idx
        return fin
      }, {})
    ])
    return { tableData, tableConfig }
  }
}
</script>
```

:::

## label与prop

label对应表头内容, prop对应表格行数据中所取值的字段

## calculate计算属性

用于自动计算表格中的数据

::: demo {Function} calculate

```vue

<template>
  <cx-table :table-data="tableData" :table-config="tableConfig"></cx-table>
</template>
<script>
import { ref } from 'vue';

export default {
  setup() {
    const tableConfig = {
      items: [
        { label: '数量', prop: 'num' },
        { label: '单价', prop: 'price' },
        {
          label: '总价', prop: 'total', calculate: (rowData) => {
            return rowData.num * rowData.price
          }
        }
      ]
    }
    const tableData = ref([
      { num: 10, price: 20 }
    ])
    return { tableData, tableConfig }
  }
}
</script>
```

:::

## control对象

用于控制单元格中的控件, 此处只展示基本用法, 全部功能见CxTableControl定义

:::demo

```vue

<template>
  <cx-table :table-data="tableData" :table-config="tableConfig">
    <template #slotName="{rowData}">{{rowData.price}}</template>
  </cx-table>
</template>
<script>
import { ref } from 'vue';

export default {
  setup() {
    const tableConfig = {
      items: [
        // 这里的type需要预先注册(见表格前置)
        { label: '数量(可编辑)', prop: 'num', control: { type: 'input' } },
        { label: '单价(静态)', prop: 'price' },
        {
          label: '总价(自动计算)', prop: 'total', calculate: (rowData) => {
            // 这里进行了赋值供其他列使用,一般会进行赋值
            return rowData.total = rowData.num * rowData.price
          }
        },
        {
          label: '带属性的控件', prop: 'num2', slot: 'slotName'
        }
      ]
    }
    const tableData = ref([
      { num: 10, price: 20 }
    ])
    return { tableData, tableConfig }
  }
}
</script>
```

:::
