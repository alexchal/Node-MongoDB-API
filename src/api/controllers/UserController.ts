import { Request, Response, NextFunction } from "express";
import { getUsersService } from "../services/userService";

const getUsers = async function (
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const users = await getUsersService();
        const response = {
            count: users.length,
            users: users.map((user) => {
                return {
                    _id: user._id,
                    email: user.email,
                    request: {
                        type: "GET",
                        url: `http://localhost:8080/api/products/${user._id}`
                    }
                };
            })
        };

        return res.status(200).json(response);
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

export { getUsers };
