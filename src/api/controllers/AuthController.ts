import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { User } from "../models/user";
import bcrypt from "bcrypt";
import { signUpUser, createUser } from "../services/authService";

export const signUp = async function (
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const user = await signUpUser(req);
        if (user.length >= 1) {
            return res.status(409).json({
                message: "Email alreadt exists"
            });
        } else {
            bcrypt.hash(req.body.password, 10, async (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                } else {
                    const results = await createUser(req, hash);
                    res.status(201).json({
                        results,
                        message: "User created"
                    });
                }
            });
        }
    } catch (err) {
        return res.status(400).json({ status: 400, message: err.message });
    }
};
