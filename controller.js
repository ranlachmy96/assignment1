const {
    getAllReunificationCase,
    getActiveReunificationCase,
    postReunificationCase,
    putReunificationCase,
    deleteRequest
} = require("./repository");

const createReunificationCase = (req,res) => {
    const reunificationCase = req.body;
    const response = postReunificationCase(reunificationCase);
    res.statusCode = 201;
    res.setHeader("content-Type","text/plain");
    res.end(JSON.stringify(response));
};

const readActiveReunificationCase = (req,res) =>  {
    const response = getActiveReunificationCase();
    res.statusCode = 200;
    res.setHeader("content-Type","text/plain");
    res.end(JSON.stringify(response));
}

const updateCaseDetails = (req,res) => {
    const url = req.url;
    const caseId = parseInt(url.split("/")[2]);
    const response = putReunificationCase(caseId);
    res.statusCode = 201;
    res.setHeader("content-Type","text/plain");
    res.end(JSON.stringify(response));
}

const deleteCompletedOrCancelledRequest = (req,res) => {
    const url = req.url;
    const caseId = parseInt(url.split("/")[2]);
    const response = deleteRequest(caseId);
    res.statusCode = 201;
    res.setHeader("content-Type","text/plain");
    res.end(JSON.stringify(response));
}
