import { CxConfigAdaptor as adaptor } from './adaptor';
import { dataInitPlugin, businessPlugin } from './plugins';

// 加载插件, 先添加业务组件插件, 再添加字段处理插件, 顺序请勿变更
adaptor.use(businessPlugin);
adaptor.use(dataInitPlugin);

export const CxConfigAdaptor = adaptor;
