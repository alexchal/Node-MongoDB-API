import mongoose from "mongoose";
import supertest from "supertest";
import app from "../../../app";
import setupDB from "../../../../test-setup";
import { User, UserType } from "../../models/user";

const request = supertest(app);

describe("Users Route", () => {
    setupDB.setupDB("endpoint-testing");

    it("it should fetch users", async (done) => {
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            email: "fakeemai@gmail.com",
            password: "testtest"
        });

        await user.save();

        const res = await request.get("/api/users");

        console.log("user", res.body);
        expect(res.status).toBe(200);
        expect(res.body.count).toBe(1);
        res.body.users.map((user: UserType) => {
            expect(user).toMatchObject({
                _id: user._id,
                email: user.email,
                request: {
                    type: "GET",
                    url: `http://localhost:8080/api/products/${user._id}`
                }
            });
        });
        done();
    });
});
