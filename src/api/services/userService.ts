import mongoose from "mongoose";
import { User, UserType } from "../models/user";

export const fetchUsers = (): Promise<UserType[]> => {
    try {
        const docs = User.find().select("_id email").exec();
        return docs;
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

export const addNewUserToDb = async (email: string, hash: string) => {
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        email,
        password: hash
    });

    try {
        const results = await user.save();
        return results;
    } catch (e) {
        return e;
    }
};

export const deleteUserFromDb = (userId: string) => {
    try {
        return User.deleteOne({ _id: userId }).exec();
    } catch (e) {
        return e;
    }
};
