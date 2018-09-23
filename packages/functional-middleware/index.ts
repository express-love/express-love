/**
 * Creates an express middleware function that allows endpoints to be expressed
 * as a function returning a response value. The specified `createResponse`
 * function will be called and the response value that is returned will be sent
 * to the specified `sendResponse` function.
 *
 * @param {Object} options
 * @param {Function} options.createResponse An async function that creates a response
 * object.
 * @param {Function} options.sendResponse A function that will send the created response
 * object.
 *
 * @example
 * const express = require('express');
 * const functionalMiddleware = require('@express-love/functional-middleware');
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
 *
 * @returns {Function} An express middleware function.
 */

function functionalMiddleware({ createResponse, sendResponse }) {
  return async (req, res, next) => {
    try {
      const response = await createResponse(req);
      sendResponse(res, response);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = functionalMiddleware;
