import { Request, Response, NextFunction, Router } from "express";
const router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    const response = {
        users: 'Alexandros'
    }
    res.status(200).json(response);
});


export default router;
