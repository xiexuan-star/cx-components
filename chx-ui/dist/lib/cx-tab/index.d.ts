import { PropType } from 'vue';
import { SFCWithInstall } from '../../types/interface';
import { CxTabOption } from './type';
declare const _CX_TAB: SFCWithInstall<import("vue").DefineComponent<{
    /**
     * tab等级,分1,2,3级,默认1级
     */
    level: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    modelValue: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    /**
     * tab项列表,支持只传入数字项与字符创项,它们会自动转化为name+id形式
     */
    options: {
        type: PropType<(string | number | CxTabOption)[]>;
        default: () => any[];
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * badge数据源,对应tab项中的badgeKey
     */
    badgeObj: {
        type: PropType<AnyObject>;
        default: () => {};
    };
}, (_: any, cache: any[]) => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "change")[], "update:modelValue" | "change", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    level?: unknown;
    modelValue?: unknown;
    options?: unknown;
    disabled?: unknown;
    badgeObj?: unknown;
} & {
    level: string | number;
    modelValue: string | number;
    options: (string | number | CxTabOption)[];
    disabled: boolean;
    badgeObj: {};
} & {}> & {
    "onUpdate:modelValue"?: (...args: any[]) => any;
    onChange?: (...args: any[]) => any;
}, {
    level: string | number;
    modelValue: string | number;
    options: (string | number | CxTabOption)[];
    disabled: boolean;
    badgeObj: {};
}>>;
export default _CX_TAB;
