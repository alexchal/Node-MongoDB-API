import express, { Request, Response, Application, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";

import usersRoutes from "./api/routes/users";

const app: Application = express();

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
    cors({
        origin: "*",
        credentials: true,
        optionsSuccessStatus: 200
    })
);

// Routes which should handle requests
app.use("/api/users", usersRoutes);

app.use((req: Request, res: Response, next) => {
    const error = new Error("Not Found");
    next(error);
});

app.use(
    (
        error: { status: any; message: any },
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        res.status(error.status || 500);
        res.json({
            error: {
                message: error.message
            },
            req
        });
    }
);

export default app;
