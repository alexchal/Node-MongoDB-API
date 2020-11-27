import mongoose from "mongoose";
import { User, UserType } from "../models/user";

export const fetchUsers = (): Promise<UserType[]> => {
    try {
        return User.find().select("_id email").exec();
    } catch (e) {
        return e;
    }
};

export const findUser = (email: string): Promise<UserType[]> => {
    try {
        return User.find({ email }).exec();
    } catch (e) {
        return e;
    }
};

export const addNewUserToDb = async (
    email: string,
    hash: string
): Promise<UserType> => {
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        email,
        password: hash
    });

    try {
        return await user.save();
    } catch (e) {
        return e;
    }
};

export const deleteUserFromDb = (userId: string): void => {
    try {
        User.deleteOne({ _id: userId }).exec();
    } catch (e) {
        return e;
    }
};
