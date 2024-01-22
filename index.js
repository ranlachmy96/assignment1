const http = require("http");
const { router } = require("./router");
const server = http.createServer((req, res) => {
    if (req.method === 'POST' || req.method ==='GET') {}
    // res.statusCode = 200;
    // res.setHeader("Content-Type", "text/plain");
    // res.end(req.url);
    router(req,res);
});
const port = 3000;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

