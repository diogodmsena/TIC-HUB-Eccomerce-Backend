import type { Request, Response, NextFunction } from "express";

export const validateBodyNotEmpty = (req: Request, res: Response, next: NextFunction) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        res.status(400).json({ error: "Request body cannot be empty" });
        return;
    }
    next();
};
