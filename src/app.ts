import express, { Request, Response, Application, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import helmet from "helmet";
import dotnev from "dotenv";

// -----------Routes-----------
import usersRoutes from "./api/routes/users";
import productsRoutes from "./api/routes/products";
import authenticationRoutes from "./api/routes/user";

const app: Application = express();
dotnev.config();

app.use(helmet());
app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));
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
app.use("/api/products", productsRoutes);
app.use("/api/user", authenticationRoutes);

mongoose.connect(
    "mongodb+srv://node-mongo-app:" +
        process.env.MONGO_ATLAS_PW +
        "@node-mongodb-app-nisc3.mongodb.net/test?retryWrites=true",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

app.use((req: Request, res: Response, next: NextFunction) => {
    try {
        throw new Error("Not found");
    } catch (error) {
        error.name = 404;
        next(error);
    }
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    res.status((error.name as unknown) as number).send({
        error: {
            status: error.name || 500,
            message: error.message || "Internal Server Error"
        }
    });
});

export default app;
