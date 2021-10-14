import { PropType } from 'vue';
import { SFCWithInstall } from '../../types/interface';
declare const _CX_BTN: SFCWithInstall<import("vue").DefineComponent<{
    size: {
        type: PropType<"large" | "medium" | "mini">;
        default: string;
    };
    level: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    type: {
        type: PropType<"primary" | "success" | "danger">;
        default: string;
    };
    content: {
        type: StringConstructor;
        default: string;
    };
    icon: {
        type: StringConstructor;
        default: string;
    };
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
}, (_: any, cache: any[]) => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    size: "large" | "medium" | "mini";
    level: string | number;
    type: "primary" | "success" | "danger";
    content: string;
    icon: string;
    loading: boolean;
    disabled: boolean;
} & {}>, {
    size: "large" | "medium" | "mini";
    level: string | number;
    type: "primary" | "success" | "danger";
    content: string;
    icon: string;
    loading: boolean;
    disabled: boolean;
}>>;
export default _CX_BTN;
