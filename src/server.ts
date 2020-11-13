import http from "http";
import app from "./app";

const port = process.env.PORT || 8080;

const server = new http.Server(app);

server.listen(port, () => {
    console.debug(`🚀 Server Started at PORT: ${port}`);
});
