import { Response } from 'express';

import { STATUS_CODES } from 'http';

export interface IHash<T> {
  [key: string]: T;
}

export type ResponseBody =
  | string
  | IHash<string>
  | Array<string | IHash<string>>;

export type ResponseHeaders = IHash<string>;

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
export function send(
  res: Response,
  /**
   * A response object created by this module.
   */
  response: IResponse,
) {
  const { status, headers, body } = response;
  res.status(status);
  res.set(headers);
  res.send(body == null ? STATUS_CODES[status] : body);
}

/**
 * @returns a 200 response.
 */
export function ok(body?: ResponseBody) {
  return { status: 200, body } as IResponse;
}

/**
 * @returns a 201 response.
 */
export function created(body?: ResponseBody) {
  return { status: 201, body } as IResponse;
}

/**
 * @returns a 400 response.
 */
export function badRequest(body?: ResponseBody) {
  return { status: 400, body } as IResponse;
}

/**
 * @returns a 401 response.
 */
export function unauthorized() {
  return { status: 401 } as IResponse;
}

/**
 * @returns a 403 response.
 */
export function forbidden() {
  return { status: 403 } as IResponse;
}

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
export function setHeaders(
  /**
   * The original response.
   */
  response: IResponse,
  /**
   * The headers to add.
   */
  headers: ResponseHeaders,
) {
  const nextHeaders = {
    ...response.headers,
    ...headers,
  };
  return {
    ...response,
    headers: nextHeaders,
  } as IResponse;
}
