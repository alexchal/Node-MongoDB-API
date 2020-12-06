import { NextFunction, Request, Response } from "express";
import cache from "memory-cache";
var newCache = new cache.Cache();

function getUrlFromRequest(req: Request) {
    const url = req.protocol + "://" + req.headers.host + req.originalUrl;
    return url;
}

export const cacheRequest = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const url = getUrlFromRequest(req);
    const cacheContent = JSON.parse(newCache.get(url as unknown) as string);
    if (cacheContent) {
        console.log("fetching from cache");
        res.send(cacheContent);
    } else {
        console.log("fetcing from database");
        (res as any).sendResponse = res.send;
        (res as any).send = (body: any) => {
            newCache.put(url, body);
            (res as any).sendResponse(body);
        };
        next();
    }
};

export const resetCache = (req: Request) => {
    const url = getUrlFromRequest(req);
    console.log("removingg key ", url, "from cache");
    return newCache.del(url);
};
