import { Response } from 'express';
export interface IHash<T> {
  [key: string]: T;
}
export declare type ResponseBody =
  | string
  | IHash<string>
  | Array<string | IHash<string>>;
export declare type ResponseHeaders = IHash<string>;
export interface IResponse {
  body?: ResponseBody;
  headers?: ResponseHeaders;
  status: number;
}
export declare function send(
  res: Response,
  response: IResponse,
): void;
export declare function ok(body?: ResponseBody): IResponse;
export declare function created(body?: ResponseBody): IResponse;
export declare function badRequest(body?: ResponseBody): IResponse;
export declare function unauthorized(): IResponse;
export declare function forbidden(): IResponse;
export declare function setHeaders(
  response: IResponse,
  headers: ResponseHeaders,
): IResponse;
