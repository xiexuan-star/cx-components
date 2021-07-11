import { App } from "vue";
export declare type SFCWithInstall<T> = T & {
    install(app: App): void;
};
export interface AnyObject {
    [k: string]: any;
}
export interface NameWithId {
    name: string | number;
    id: string | number;
}
