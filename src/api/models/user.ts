import { Schema, Document, model } from "mongoose";

type UserType = Document & {
    _id: string;
    email: string;
    password: string;
};

const userSchema = new Schema({
    _id: Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { type: String, required: true }
});

export const User = model<UserType>("User", userSchema);
