const {
    createReunificationCase,
    readActiveReunificationCase,
    updateCaseDetails,
    deleteCompletedOrCancelledRequest
} = require("./controller");

const router = (res,req) => {
    const { method, url } = req;
    if (method === 'GET' && url === '/familyReunification'){
        readActiveReunificationCase(req,res);
    } else if (method === 'POST' && url === '/familyReunification'){
        createReunificationCase(req,res);
    } else if (method === 'PUT' && url === '/familyReunification'){
        updateCaseDetails(req,res);
    } else if (method === 'DELETE' && url === '/familyReunification'){
        deleteCompletedOrCancelledRequest(req,res);
    } else {
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/plain");
        res.end("Invalid route");
    }
};

module.exports = { router }