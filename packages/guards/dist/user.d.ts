export declare const policy: {
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
declare function isPasswordAcceptable(value: string, withPolicy?: boolean): string | boolean;
declare function isNameAcceptable(value: string, withPolicy?: boolean): string | boolean;
declare function isEmailAcceptable(value: string, withPolicy?: boolean): string | boolean;
declare function isUsernameAcceptable(value: string, withPolicy?: boolean): string | boolean;
declare const _default: {
    isEmailAcceptable: typeof isEmailAcceptable;
    isNameAcceptable: typeof isNameAcceptable;
    isPasswordAcceptable: typeof isPasswordAcceptable;
    isUsernameAcceptable: typeof isUsernameAcceptable;
};
export default _default;
