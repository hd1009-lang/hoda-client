export type StringOrNumber = string | number;
export interface ResponseCommon<T> {
    message: string;
    data: T;
}
