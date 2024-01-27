const http = require("http");
const {router} = require("./router");
const loggerMiddleware = require("./logger");

const server = http.createServer((req, res) => {
    loggerMiddleware(req, res, () => {
        router(req, res);
    });
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

