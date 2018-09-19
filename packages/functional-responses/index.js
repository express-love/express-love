const { STATUS_CODES } = require('http');

/**
 * Sends a specified response using the specified express `res` object.
 *
 * @param {Object} res An express `res` object.
 * @param {Object} response A response object created by this module.
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
function send(res, response) {
  const { status, headers, body } = response;
  res.status(status);
  res.set(headers);
  res.send(body == null ? STATUS_CODES[status] : body);
}

/**
 * Returns a 200 response.
 *
 * @param {(string|Object)} body The body parameter can be a String, an object,
 * or an Array.
 * @returns {Object} A response object.
 */
function ok(body) {
  return { status: 200, body };
}

/**
 * Returns a 400 response.
 *
 * @param {(string|Object)} body The body parameter can be a String, an object,
 * or an Array.
 * @returns {Object} A response object.
 */
function badRequest(body) {
  return { status: 400, body };
}

/**
 * Returns a 401 response.
 *
 * @returns {Object} A response object.
 */
function unauthorized() {
  return { status: 401 };
}

/**
 * Returns a 403 response.
 *
 * @returns {Object} A response object.
 */
function forbidden() {
  return { status: 403 };
}

/**
 * Adds headers to a response. This function returns a new object.
 *
 * @param {Object} response The original response.
 * @param {Object.<string, string>} headers The headers to add.
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
 *
 * @returns {Object} A response object.
 */
function setHeaders(response, headers) {
  const nextHeaders = Object.assign({}, response.headers, headers);
  return Object.assign({}, response, { headers: nextHeaders });
}

module.exports = {
  send,
  ok,
  badRequest,
  unauthorized,
  forbidden,
  setHeaders,
};
