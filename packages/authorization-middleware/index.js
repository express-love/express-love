/**
 * Creates an express middleware function that wraps a specified handler. The
 * specified handler will only be called if the request has been authorized. If
 * the request has not been authorized then a 401 or 403 response will be
 * returned.
 *
 * @param {Object} options
 * @param {Function} options.isAuthenticated A function that takes an express `req`
 * object and returns a boolean indiciating if the request is associated with an
 * authenticated user.
 * @param {Function} options.isAuthorized A function that takes an express `req` object
 * and returns a boolean indicating if the request is authorized.
 *
 * @example
 * const express = require('express');
 * const authorizationMiddleware = require('@express-love/authorization-middleware');
 *
 * // A mock implementation of an application's access control system
 * const hasPermission = (identity, permission) => true;

 * // These functions know how our app handles authentication and authorization
 * const demandPermission = (permission) => authorizationMiddleware({
 *   isAuthenticated: (req) => !!req.session.identity,
 *   isAuthorized: (req) => hasPermission(req.session.identity, permission),
 * });
 *
 * const app = express();
 *
 * app.get(
 *   '/api/examples',
 *   demandPermission('GET_EXAMPLES'),
 *   (req, res, next) => {
 *     // this function will only be called if the user is authorized
 *     res.send('hello world');
 *   },
 * );
 *
 * @returns {Function} An express middleware function.
 */
function authorizationMiddleware({ isAuthenticated, isAuthorized }) {
  return (req, res, next) => {
    if (isAuthorized(req)) next();
    else if (isAuthenticated(req)) res.sendStatus(403);
    else res.sendStatus(401);
  };
}

module.exports = authorizationMiddleware;
