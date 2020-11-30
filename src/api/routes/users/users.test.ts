import mongoose from "mongoose";
import supertest from "supertest";
import app from "../../../app";
import setupDB from "../../../../test-setup";
import { User, UserType } from "../../models/user";

const request = supertest(app);

describe("Users Routeee", () => {
    setupDB.setupDB("endpoint-testing");

    it("it should fetch users", async (done) => {
        const users = [
            new User({
                _id: new mongoose.Types.ObjectId(),
                email: "fakeemai@gmail.com",
                password: "testtest"
            }),
            new User({
                _id: new mongoose.Types.ObjectId(),
                email: "fakeemai@gmail.com",
                password: "testtest"
            })
        ];

        const mongoDBPromises = [];

        for (let i = 0; i < users.length; i++) {
            mongoDBPromises.push(await users[i].save());
        }

        await Promise.all(mongoDBPromises);

        const res = await request.get("/api/users");

        expect(res.status).toBe(200);
        expect(res.body.count).toBe(users.length);

        res.body.users.map((user: UserType, i: number) => {
            expect(user).toEqual({
                _id: users[i]._id.toJSON(),
                email: users[i].email,
                request: {
                    type: "GET",
                    url: `http://localhost:8080/api/products/${users[i]._id}`
                }
            });
        });
        done();
    });
});
