import supertest from "supertest";
import app from "../../../app";
import setupDB from "../../../../test-setup";
import { User } from "../../models/user";

const request = supertest(app);

describe("Sign up route", () => {
    setupDB.setupDB("endpoint-testing");

    it("Should save user to database", async (done) => {
        const res = await request.post("/api/user/signup").send({
            email: "testing@gmail.com",
            password: "12345678"
        });

        const user = await User.findOne({ email: "testing@gmail.com" });
        console.log("user", res.body);
        expect(res.body.message).toBe(
            `Account has been successfully created. Email: ${user?.email}`
        );
        done();
    });
});
