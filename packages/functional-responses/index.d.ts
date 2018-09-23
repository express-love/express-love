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
/**
 * Sends a specified response using the specified express `res` object.
 *
 * @example
 * const express = require('express');
 * const functionalMiddleware = require('@express-love/functional-middleware');
 * const responses = require('@express-love/functional-responses');
 *
 * const apiHandler = createResponse => functionalMiddleware({
 *   createResponse,
 *   sendResponse: responses.send,
 * });
 *
 * const app = express();
 * app.get('/api/examples', apiHandler(async (req) => {
 *   return responses.ok('hello world');
 * }));
 */
export declare function send(
  res: Response,
  /**
   * A response object created by this module.
   */
  response: IResponse,
): void;
/**
 * @returns a 200 response.
 */
export declare function ok(body?: ResponseBody): IResponse;
/**
 * @returns a 201 response.
 */
export declare function created(body?: ResponseBody): IResponse;
/**
 * @returns a 400 response.
 */
export declare function badRequest(body?: ResponseBody): IResponse;
/**
 * @returns a 401 response.
 */
export declare function unauthorized(): IResponse;
/**
 * @returns a 403 response.
 */
export declare function forbidden(): IResponse;
/**
 * Adds headers to a response. This function returns a new object.
 *
 * @example
 * const responses = require('@express-love/functional-responses');
 *
 * const createResponse = async (req) => {
 *   return responses.setHeaders(
 *     responses.ok('{}'),
 *     { 'Content-Type': 'application/json' },
 *   );
 * }
 */
export declare function setHeaders(
  /**
   * The original response.
   */
  response: IResponse,
  /**
   * The headers to add.
   */
  headers: ResponseHeaders,
): IResponse;
