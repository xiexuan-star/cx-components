# Button 按钮

常用的操作按钮。

## 等级与类型

不同等级和类型对应了UI界面中不同的应用场景。

:::demo { primary | success | danger } type 默认为primary; {1|2|4|4} level 默认为2级

```vue

<template>
  <section style="display: flex;flex-wrap: wrap">
    <section class="platform">
      <cx-btn level="1" type="primary">1级主要按钮</cx-btn>
      <cx-btn level="1" type="success">1级主要按钮</cx-btn>
      <cx-btn level="1" type="danger">1级主要按钮</cx-btn>
    </section>
    <section class="platform">
      <cx-btn level="2" type="primary">2级主要按钮</cx-btn>
      <cx-btn level="2" type="success">2级成功按钮</cx-btn>
      <cx-btn level="2" type="danger">2级危险按钮</cx-btn>
    </section>
    <section class="platform">
      <cx-btn level="3" type="primary">3级主要按钮</cx-btn>
      <cx-btn level="3" type="success">3级成功按钮</cx-btn>
      <cx-btn level="3" type="danger">3级危险按钮</cx-btn>
    </section>
    <section class="platform">
      <cx-btn level="4" type="primary">4级主要按钮</cx-btn>
      <cx-btn level="4" type="success">4级成功按钮</cx-btn>
      <cx-btn level="4" type="danger">4级危险按钮</cx-btn>
    </section>
  </section>
</template>
```

:::

## loading状态与disabled状态

loading时按钮自动处于disabled

:::demo {boolean} disabled ; {boolean} loading

```vue

<template>
  <section class="platform">
    <!--  没有loading图标, 因为是借助了element-icon, 此处没有引入  -->
    <cx-btn level="1" loading>loading</cx-btn>
    <cx-btn level="1" disabled>disabled</cx-btn>
  </section>
</template>
```

:::

## 尺寸

调整padding实现

:::demo { large | middle | small } size 默认为middle

```vue

<template>
  <section class="platform">
    <cx-btn level="1" size="large">large</cx-btn>
    <cx-btn level="1">middle</cx-btn>
    <cx-btn level="1" size="small">small</cx-btn>
  </section>
</template>
```

:::

## tips

依赖于uni-popper指令

:::demo {UniPopperOption} tipOption

```vue

<template>
  <section class="platform">
    <cx-btn level="1" :tip-option="{text:'popper'}">popper</cx-btn>
    <cx-btn level="1" :tip-option="{list:[{text:'popper'},{text:'demo'}]}">popper2</cx-btn>
  </section>
</template>
```

:::

## badge与icon

icon字段只需要传递icon-之后的部分 icon-left-arrow => icon='left-arrow'

:::demo {number|string} badge badge的内容; {Object} badgeAttrs 添加在badge元素上的属性; {string} icon 为icon-之后的部分,如icon-left只需传递left

```vue

<template>
  <section class="platform">
    <cx-btn level="1" :badgeAttrs="{'badge-router-key':''}" badge="99+">popper</cx-btn>
    <cx-btn level="1" icon="close">close</cx-btn>
  </section>
</template>
```

:::
