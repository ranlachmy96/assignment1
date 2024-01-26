const {
    createReunificationCase,
    readActiveReunificationCase,
    updateCaseDetails,
    deleteCompletedOrCancelledRequest,
    readReunificationCase,
    bodyParser,
    handleRequest
} = require("./controller");

const router = (req,res) => {
    const { method, url } = req;
    const parts = url.split('/');
    const route = parts[1];
    if (method === 'GET' && route === 'familyReunification' && parts.length === 2){
        readActiveReunificationCase(req,res);
    } else if (method === 'GET' && route === 'familyReunification' && parts.length >= 3){
        readReunificationCase(req,res);
    } else if (method === 'POST' && route === 'familyReunification'){
        bodyParser(req, res, () => {
            handleRequest(req, res);
        });
    } else if (method === 'PUT' && route === 'familyReunification'){
        updateCaseDetails(req,res);
    } else if (method === 'DELETE' && route === 'familyReunification'){
        deleteCompletedOrCancelledRequest(req,res);
    } else {
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/plain");
        res.end("Invalid route");
    }
};

module.exports = { router }