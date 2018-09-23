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
/**
 * Creates an express middleware function that allows endpoints to be expressed
 * as a function returning a response value. The specified `createResponse`
 * function will be called and the response value that is returned will be sent
 * to the specified `sendResponse` function.
 *
 * @example
 * import * as express from 'express';
 * import functionalMiddleware from '@express-love/functional-middleware';
 *
 * const sendResponse = (res, response) => res.status(response.status).send(response.body);
 * const apiHandler = (createResponse) => functionalMiddleware({ createResponse, sendResponse });
 *
 * const app = express();
 *
 * app.get('/api/examples', apiHandler(async (req) => {
 *   await doSomething();
 *   return { status: 200, body: 'hello world' };
 * }));
 */
export default function functionalMiddleware({
  createResponse,
  sendResponse,
}: {
  createResponse: (req?: Request) => Promise<IResponse>;
  /**
   * Sends the created response object.
   */
  sendResponse: (res?: Response, response?: IResponse) => void;
}): RequestHandler;
