export interface Auth {
    message: string;
    token?: string;
}

export interface AuthLogin<T> extends Auth {
    data: T;
}
export interface AuthAccessToken extends Auth {
    token: string;
}
export interface AuthModel {
    username: string;
    password: string;
}
