/// <reference types="multer" />
export declare const policy: {
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
declare function isArticleTitleAcceptable(value: string, withPolicy?: boolean): string | boolean;
declare function isArticleCoverAcceptable(value: {
    name: string;
    type: string;
    size: string | number;
    [key: string]: string | number;
} | Express.Multer.File, withPolicy: boolean | undefined, options: {
    vendor: string;
    [key: string]: string;
}): string | boolean;
declare function isArticleUrlAcceptable(value: string, withPolicy?: boolean): string | boolean;
declare function isArticleContentAcceptable(value: string, withPolicy?: boolean, isStringified?: boolean): string | boolean;
declare function isArticleSkillListAcceptable(value: any[] | string | undefined, withPolicy?: boolean, isStringified?: boolean): string | boolean;
declare function isArticleCategoryListAcceptable(value: any[] | string | undefined, withPolicy?: boolean, isStringified?: boolean): string | boolean;
declare const _default: {
    isArticleTitleAcceptable: typeof isArticleTitleAcceptable;
    isArticleCoverAcceptable: typeof isArticleCoverAcceptable;
    isArticleUrlAcceptable: typeof isArticleUrlAcceptable;
    isArticleContentAcceptable: typeof isArticleContentAcceptable;
    isArticleSkillListAcceptable: typeof isArticleSkillListAcceptable;
    isArticleCategoryListAcceptable: typeof isArticleCategoryListAcceptable;
};
export default _default;
