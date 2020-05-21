/// <reference types="multer" />
import * as limits from "./atoms/limits";
/**
 * Interpret the policy values for out atomic Inputs
 *
 * @param {function} gate
 * @param {*} value
 */
declare function interpret(gate: Function, value: any): any;
declare const policy: {
    article: {
        root: string;
        title: {
            root: string;
            1: string;
        };
        cover: {
            root: string;
            1: string;
            2: string;
            3: string;
        };
        url: {
            root: string;
            1: string;
            2: string;
        };
        skills: {
            root: string;
            1: string;
            2: string;
        };
        categories: {
            root: string;
            1: string;
            2: string;
        };
        content: {
            root: string;
            1: string;
        };
    };
    user: {
        password: {
            root: string;
            1: string;
            2: string;
            3: string;
        };
        name: {
            root: string;
            1: string;
        };
        username: {
            root: string;
            1: string;
        };
        email: {
            root: string;
            1: string;
        };
    };
    network: {
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
};
declare const guards: {
    isNetworkTitleAcceptable: (value: string, withPolicy?: boolean) => string | boolean;
    isNetworkIconAcceptable: (value: Express.Multer.File | {
        [key: string]: string | number;
        name: string;
        type: string;
        size: string | number;
    }, withPolicy: boolean | undefined, options: {
        [key: string]: string;
        vendor: string;
    }) => string | boolean;
    isNetworkExternalIdAcceptable: (value: string, withPolicy: boolean | undefined, networks: object) => string | boolean;
    isNetworkUsernameAcceptable: (value: string, withPolicy?: boolean) => string | boolean;
    isNetworkUrlAcceptable: (value: string, withPolicy?: boolean) => string | boolean;
    isNetworkDescriptionsAcceptable: (value: string, withPolicy?: boolean) => string | boolean;
    isEmailAcceptable: (value: string, withPolicy?: boolean) => string | boolean;
    isNameAcceptable: (value: string, withPolicy?: boolean) => string | boolean;
    isPasswordAcceptable: (value: string, withPolicy?: boolean) => string | boolean;
    isUsernameAcceptable: (value: string, withPolicy?: boolean) => string | boolean;
    isArticleTitleAcceptable: (value: string, withPolicy?: boolean) => string | boolean;
    isArticleCoverAcceptable: (value: {
        [key: string]: string | number;
        name: string;
        type: string;
        size: string | number;
    } | Express.Multer.File, withPolicy: boolean | undefined, options: {
        [key: string]: string;
        vendor: string;
    }) => string | boolean;
    isArticleUrlAcceptable: (value: string, withPolicy?: boolean) => string | boolean;
    isArticleContentAcceptable: (value: string, withPolicy?: boolean, isStringified?: boolean) => string | boolean;
    isArticleSkillListAcceptable: (value: string | any[] | undefined, withPolicy?: boolean, isStringified?: boolean) => string | boolean;
    isArticleCategoryListAcceptable: (value: string | any[] | undefined, withPolicy?: boolean, isStringified?: boolean) => string | boolean;
    interpret: typeof interpret;
};
export default guards;
export { limits, policy };
