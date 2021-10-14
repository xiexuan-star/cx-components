import { isNumber } from "../../..";
import { CxTableAdaptorPlugin, CxTableDynamicColumn } from "../../../../..";
import { getPrecision } from "../../adaptorUtils";

export const dataInitPlugin: CxTableAdaptorPlugin = {
  onInit: config => {
    // 处理dynamic
    config.dynamicCalculate && Reflect.set(config, 'calculate', config.dynamicCalculate);
    config.dynamicValidator && Reflect.set(config, 'validator', config.dynamicValidator);
    config?.control?.dynamicOptions &&
      Reflect.set(config.control, 'options', config.control.dynamicOptions);

    // 处理index
    (config.index || config.prop === 'index') &&
      !config.control?.type &&
      Reflect.set(config, 'control', { type: 'index' });

    // 处理特殊的align
    ((config.children?.length ?? 0) > 0 ||
      ['nativeCheckbox', 'nativeCheckRadio', 'index'].includes(config.control?.type as any)) &&
      Reflect.set(config, 'align', 'center');

    // 处理特殊宽度
    ['nativeCheckbox'].includes(config.control?.type as any) && Reflect.set(config, 'width', 50);

    // 处理number-input
    config.input && Reflect.set(config, 'number', config.input);

    isNumber(config.number?.decimal) &&
      Reflect.set(config.number!, 'decimal', getPrecision(config.number?.decimal));

    // 处理accuracy
    isNumber(config.accuracy) && Reflect.set(config, 'accuracy', getPrecision(config.accuracy));

    // 处理宽度,将动态表头的宽度设置为最高优先级的宽度
    config.width && Reflect.set(config, 'importantWidth', config.width);

    // 处理fixed,原则上顶级表头的所有子项都应该是相同的fixed
    function setFixed(config: CxTableDynamicColumn, fixed: CxTableDynamicColumn['fixed']) {
      Reflect.set(config, 'fixed', fixed);
      Array.isArray(config.children) && config.children.forEach(child => setFixed(child, fixed));
    }
    setFixed(config, config.fixed);

    // 特殊处理, 所有的select强制转换为search
    config.control?.type === 'select' && Reflect.set(config.control, 'type', 'search');

    // 特殊处理,部分单号相关的列都修改为orderText组件
    if (
      ['订单编号', '商户单号', '生产单号', '销售单号'].includes(config.label) &&
      !config.control
    ) {
      config.control = { type: 'orderText' };
    }
    return config;
  }
};
