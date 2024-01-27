const http = require("http");
const { router } = require("./router");
const server = http.createServer((req, res) => {
    router(req,res);
});
const port = 3000;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

