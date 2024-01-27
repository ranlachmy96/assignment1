//index
/***************************************************************************************
 Importing required modules for creating an HTTP server, routing, and logging middleware.
 ***************************************************************************************/

const http = require("http");
const {router} = require("./router");
const loggerMiddleware = require("./logger");

/***************************************************************************************
 Creating an HTTP server using the http module, with a middleware chain.
 - The loggerMiddleware logs incoming requests.
 - The router function handles routing based on the incoming request.
 ***************************************************************************************/

const server = http.createServer((req, res) => {
    loggerMiddleware(req, res, () => {
        router(req, res);
    });
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

