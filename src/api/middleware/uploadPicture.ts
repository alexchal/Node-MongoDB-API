import { Request } from "express";
import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req: Request, file: Express.Multer.File, cb) {
        cb(null, "uploads");
    },
    filename: function (req: Request, file: Express.Multer.File, cb) {
        cb(null, new Date().toDateString() + file.originalname);
    }
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: any) => {
    if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
        //accept a file
        cb(null, true);
    } else {
        console.log("file rejected");
        // reject a file
        cb(new Error("You can only upload image/jpg or image/png"), false);
    }
};

export const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter
});
