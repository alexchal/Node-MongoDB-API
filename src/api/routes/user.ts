import { Router, Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jtw from "jsonwebtoken";
// Models
import { User } from "../models/user";

const router = Router();

router.post("/signup", (req: Request, res: Response, next: NextFunction) => {
    User.find({ email: req.body.email })
        .exec()
        .then((user) => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "Email alreadt exists"
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        });
                        user.save()
                            .then((result) => {
                                console.log("req", result);
                                res.status(201).json({
                                    message: "User created"
                                });
                            })
                            .catch((err) => {
                                console.log(err);
                                res.status(201).json({
                                    error: err
                                });
                            });
                    }
                });
            }
        });
});

router.post("/login", (req: Request, res: Response, next: NextFunction) => {
    User.find({ email: req.body.email })
        .exec()
        .then((user) => {
            if (user.length < 1) {
                return res.status(401).json({
                    messgage: "Auth failed"
                });
            }
            bcrypt.compare(
                req.body.password,
                user[0].password,
                (err, result) => {
                    if (err) {
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
                            token: token
                        });
                    }

                    res.status(401).json({
                        messgage: "Auth failed"
                    });
                }
            );
        })
        .catch((err) => {
            res.status(500).json({
                error: err
            });
        });
});

router.delete("/:userId", (req: Request, res: Response, next: NextFunction) => {
    User.deleteOne({ _id: req.params.userId })
        .exec()
        .then((result) => {
            res.status(200).json({
                message: "User deleted"
            });
        })
        .catch((err) => {
            res.status(201).json({
                error: err
            });
        });
});

export default router;
