import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "./config";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization!;

    if(!token) {
        return res.status(403).json({
            message: "invalid token"
        })
    }

    try {
        const secret = JWT_SECRET;

        const payload = jwt.verify(token, secret as string) as JwtPayload;

        req.user_id = payload.user_id!;

        next();
    } catch (e) {
        return res.status(401).json({
            message: "Not Authorized"
        })
    }
}