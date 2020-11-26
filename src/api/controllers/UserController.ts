import { Request, Response, NextFunction } from "express";
import { fetchUsersService } from "../services/userService";

export const fetchUsers = async function (
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const users = await fetchUsersService();
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
