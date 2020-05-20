/// <reference types="multer" />
export declare const policy: {
    root: string;
    title: {
        root: string;
        1: string;
    };
    icon: {
        root: string;
        1: string;
        2: string;
        3: string;
    };
    username: {
        root: string;
        1: string;
    };
    description: {
        root: string;
        1: string;
    };
    externalId: {
        root: string;
        1: string;
        2: string;
    };
    url: {
        root: string;
        1: string;
        2: string;
    };
};
declare function isNetworkTitleAcceptable(value: string, withPolicy?: boolean): string | boolean;
declare function isNetworkUsernameAcceptable(value: string, withPolicy?: boolean): string | boolean;
declare function isNetworkExternalIdAcceptable(value: string, withPolicy: boolean | undefined, networks: object): string | boolean;
declare function isNetworkIconAcceptable(value: {
    name: string;
    type: string;
    size: string | number;
    [key: string]: string | number;
} | Express.Multer.File, withPolicy: boolean | undefined, options: {
    vendor: string;
    [key: string]: string;
}): string | boolean;
declare function isNetworkUrlAcceptable(value: string, withPolicy?: boolean): string | boolean;
declare function isNetworkDescriptionsAcceptable(value: string, withPolicy?: boolean): string | boolean;
declare const _default: {
    isNetworkTitleAcceptable: typeof isNetworkTitleAcceptable;
    isNetworkIconAcceptable: typeof isNetworkIconAcceptable;
    isNetworkExternalIdAcceptable: typeof isNetworkExternalIdAcceptable;
    isNetworkUsernameAcceptable: typeof isNetworkUsernameAcceptable;
    isNetworkUrlAcceptable: typeof isNetworkUrlAcceptable;
    isNetworkDescriptionsAcceptable: typeof isNetworkDescriptionsAcceptable;
};
export default _default;
