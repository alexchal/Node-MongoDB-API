import { Request, Response, NextFunction, Router } from "express";
// Models
import { User } from "../models/user";

const router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
    User.find()
        .select("_id email")
        .exec()
        .then((docs) => {
            const response = {
                count: docs.length,
                users: docs.map((doc) => {
                    return {
                        _id: doc._id,
                        email: doc.email,
                        request: {
                            type: "GET",
                            url: `http://localhost:8080/api/products/${doc._id}`
                        }
                    };
                })
            };

            res.status(200).json(response);
        })
        .catch((err) => {
            res.status(201).json({
                error: err
            });
        });
});

export default router;
