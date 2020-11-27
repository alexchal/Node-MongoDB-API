import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    try {
        const token = authorization?.split(" ")[1] as string;
        const decoded = jwt.verify(token, process.env.JWT_KEY as string);
        req.body.userData = decoded;
        next();
    } catch (error) {
        res.status(401).json({
            message: "Authentication failed"
        });
    }
};
