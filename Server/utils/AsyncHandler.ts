import { NextFunction, Request, Response } from "express";

const asyncHandler = (requestHandler: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        Promise.resolve(requestHandler(req, res, next)).catch((err: Error) => { console.log(err); res.status(500).json(err) });
    }
}

export { asyncHandler }