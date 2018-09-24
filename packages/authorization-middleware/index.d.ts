import { Request, RequestHandler } from 'express';
export default function authorizationMiddleware({
  isAuthenticated,
  isAuthorized,
}: {
  isAuthenticated: (req: Request) => boolean;
  isAuthorized: (req: Request) => boolean;
}): RequestHandler;
