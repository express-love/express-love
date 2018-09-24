import { Response } from 'express';
export interface IHash<T> {
  [key: string]: T;
}
export declare type ResponseHeaders = IHash<string>;
export interface IResponse {
  body?: any;
  headers?: IHash<string>;
  status: number;
}
export declare function send(res: Response, response: IResponse): void;
export declare function ok(body?: any): IResponse;
export declare function created(body?: any): IResponse;
export declare function badRequest(body?: any): IResponse;
export declare function unauthorized(): IResponse;
export declare function forbidden(): IResponse;
export declare function setHeaders(
  response: IResponse,
  headers: ResponseHeaders,
): IResponse;
