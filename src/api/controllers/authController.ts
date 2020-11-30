import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jtw from "jsonwebtoken";
import * as UserService from "../services/userService";
import * as EmailService from "../services/emailService";

export const signUpUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const {
        body: { password, email }
    } = req;

    try {
        const user = await UserService.findUser(email);
        if (user.length >= 1) {
            return res.status(409).json({
                message: "Email already exists in our database"
            });
        } else {
            bcrypt.hash(password, 10, async (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                } else {
                    const results = await UserService.addNewUserToDb(
                        email,
                        hash
                    );

                    res.status(201).json({
                        message: `Account has been successfully created. Email: ${results.email}`
                    });

                    // await EmailService.sendEmail(email);
                }
            });
        }
    } catch (err) {
        return res.status(400).json({ status: 400, message: err.message });
    }
};

export const loginUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const {
        body: { email, password }
    } = req;

    try {
        const user = await UserService.findUser(email);

        if (user.length < 1) {
            return res.status(401).json({
                messgage: "Auth failed"
            });
        }

        bcrypt.compare(password, user[0].password, (error, result) => {
            if (error) {
                return res.status(401).json({
                    messgage: "Auth failed"
                });
            }
            if (result) {
                const token = jtw.sign(
                    {
                        email: user[0].email,
                        userId: user[0]._id
                    },
                    process.env.JWT_KEY as string,
                    {
                        expiresIn: "1h"
                    }
                );

                return res.status(200).json({
                    messgage: "Auth successul",
                    token
                });
            }

            res.status(401).json({
                messgage: "Auth failed"
            });
        });
    } catch (error) {
        res.status(500).json({
            error
        });
    }
};

export const deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const {
        params: { userId }
    } = req;

    try {
        UserService.deleteUserFromDb(userId);

        res.status(200).json({
            message: "User deleted"
        });
    } catch (error) {
        res.status(201).json({
            error
        });
    }
};
