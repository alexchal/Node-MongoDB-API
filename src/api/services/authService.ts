import { Request } from "express";
import mongoose from "mongoose";
import { User } from "../models/user";

export const signUpUser = (req: Request) => {
    try {
        const user = User.find({ email: req.body.email }).exec();
        return user;
    } catch (err) {
        return err;
    }
};

export const createUser = async (req: Request, hash: string) => {
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        password: hash
    });
    user.save()
        .then((result) => {
            return result;
        })
        .catch((err) => {
            console.log(err);
            return err;
        });
};
