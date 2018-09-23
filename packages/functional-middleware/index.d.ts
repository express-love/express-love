import { Request, RequestHandler, Response } from 'express';
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
export default function functionalMiddleware({
  createResponse,
  sendResponse,
}: {
  createResponse: (req?: Request) => Promise<IResponse>;
  sendResponse: (res?: Response, response?: IResponse) => void;
}): RequestHandler;
