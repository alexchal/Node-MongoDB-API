import { User, UserType } from "../models/user";

export const getUsersService = (): Promise<UserType[]> => {
    try {
        const docs = User.find().select("_id email").exec();
        return docs;
    } catch (err) {
        return err;
    }
};
