import { Request, RequestHandler, Response } from 'express';
export default function functionalMiddleware<T extends any>({ createResponse, sendResponse, }: {
    createResponse: (req: Request) => Promise<T>;
    sendResponse: (res: Response, response: T) => void;
}): RequestHandler;
