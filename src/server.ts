// import http from "http";
// import app from "./app";
const http = require('http');
const app = require('./app.ts');

const port = process.env.PORT || 8080;

const server = http.createServer(app);

server.listen(port, () => {
    console.debug(`App listening on ${port}`);
});

