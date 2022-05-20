# Table 可操作表格使用时的前置工作

## 如何注册渲染器

```typescript
import { useCxTable } from 'chx-ui';

const { registCxRenderer } = useCxTable();

/**
 * @param {string} type control.type名称
 * @param {import('chx-ui').CxRendererRegister} 渲染器,具体类型参照type中的定义
 */
registCxRenderer(type, renderer);

```

## 如何注册插件

::: tip

插件中的功能注册是全局适用的

:::

#### 组件插件

```typescript
import { useCxTable } from 'chx-ui';

const { use } = useCxTable();

/**
 * @param {import('chx-ui').CxTablePlugins} plugin
 * @description 目前plugin中只有注册全局dynamicInject一个功能
 */
use(Plugin);
```

#### 适配器插件

```typescript
import { CxConfigAdaptor } from 'chx-ui'

/**
 * @param {import('chx-ui').CxTableAdaptorPlugin} plugin
 * @description 目前只提供介入单列初始化数据的能力,具体类型参照type定义
 */
CxConfigAdaptor.use(Plugin)
```

## 其他前置工作

::: warning
此处的前置功能都是将组件中与业务耦合的部分抽离后，需要进行注册的一些业务功能
:::

```typescript
import { useCxTable } from 'chx-ui'

const handler = useCxTable();

// 用于注册对应业务场景中请求接口的函数
// rules对应的类型为{businessType,api}[]
handler.setDynamicFormSearchApi(ModuleType, Rules);
// 用于注册暂存列表相关功能的context
/**
 * 拉取数据接口api
 * requestApiMap: Record<number, string>;
 * 暂存列表类型在不同模块的显示(未提交, 已驳回, 已反审)
 * cacheTypeTab: (props: CxTablePropType) => boolean;
 * 删除数据接口api
 * removeApiMap: Record<number, string>;
 * 用于发送请求的实例
 * requestInstance: Record<string | number, any>;
 * 暂存列表左侧nav与暂存列表表格顶部description信息需要取值的列表
 * cacheLabelConfig: CacheRule[];
 */
handler.setDynamicCacheContext(type, any)
// 注册动态表头发送请求的实例
handler.setDynamicRequestInstance($factory);
// 注册在表格组件内部toast功能使用的实例
handler.setMessageInstance({ ...ElMessage } as any);
setTimeout(() => {
  const { stoneAccuracy, priceAccuracy, goldAccuracy } = usePrecision();
  // 注册表格中对应小数精度的值
  handler.setPrecision({ stoneAccuracy, priceAccuracy, goldAccuracy });
});
// 注册对应的type, 用于表格组件读取一些type相关的文字信息
handler.setDynamicType({
  DYNAMIC_MODULE_TYPE,
  DYNAMIC_BUSINESS_TYPE,
  DYNAMIC_MODEL_TYPE,
  DYNAMIC_PRICE_TYPE
});
```

