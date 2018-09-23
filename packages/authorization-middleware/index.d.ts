import { Request, RequestHandler } from 'express';
/**
 * Creates an express middleware function that wraps a specified handler. The
 * specified handler will only be called if the request has been authorized. If
 * the request has not been authorized then a 401 or 403 response will be
 * returned.
 *
 * @example
 * import * as express from 'express';
 * import authorizationMiddleware from '@express-love/authorization-middleware';
 *
 * // A mock implementation of an application's access control system
 * const hasPermission = (identity, permission) => true;
 *
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
 */
export default function authorizationMiddleware({
  isAuthenticated,
  isAuthorized,
}: {
  /**
   * Indicate whether a request is associated with an authenticated user.
   */
  isAuthenticated: (req?: Request) => boolean;
  /**
   * Indicate whether a request is authorized.
   */
  isAuthorized: (req?: Request) => boolean;
}): RequestHandler;
