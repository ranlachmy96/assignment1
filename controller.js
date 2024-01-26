const fs = require('fs');
const {
    getAllReunificationCase,
    getAllActiveReunificationCase,
    getActiveReunificationCase,
    postReunificationCase,
    putReunificationCase,
    deleteRequest
} = require("./repository");
//CHECK
const checkIdValidity = (id) => {
    if (typeof id !== 'number') {
        return false;
    }
    const data = getAllActiveReunificationCase();
    if (data.reunificationCase.some(item => item.id === id)) {
        return false;
    }
}
const bodyParser = (req, res, next) => {
    let data = '';

    req.on('data', chunk => {
        data += chunk;
    });

    req.on('end', () => {
        try {
            req.body = JSON.parse(data);
            next();
        } catch (error) {
            res.statusCode = 400;
            res.setHeader("Content-Type", "text/plain");
            res.end("Invalid JSON payload");
        }
    });
};
const handleRequest = (req, res) => {
    // Assuming req.body is already populated by a middleware
    const newReunificationCase = req.body;
    createReunificationCase(newReunificationCase, res);
};
//POST
const createReunificationCase = (newReunificationCase, res) => {
    // const newReunificationCase = req.body;
    // console.log('newReunificationCase:', newReunificationCase);
    if (checkIdValidity(newReunificationCase.id) === false) {
        res.statusCode = 400;
        res.setHeader("Content-Type", "text/plain");
        res.end("Reunification case Id all ready exists or sent incorrectly");
    } else {
        let existingData = getAllActiveReunificationCase();

        existingData.reunificationCase.push(newReunificationCase);
        console.log('addedData:', existingData);
        const response = postReunificationCase(existingData);

        res.statusCode = 201;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(response));
    }
};
//GET
const readActiveReunificationCase = (req, res) => {
    const response = getAllActiveReunificationCase();
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end(JSON.stringify(response));
}

const readReunificationCase = (req, res) => {
    const url = req.url;
    const caseId = parseInt(url.split("/")[2]);
    const response = getActiveReunificationCase();
    const result = response.reunificationCase.find(item => item.id === caseId && item.active === true);
    if (result) {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(result));
    } else {
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/plain");
        res.end("Reunification case not found or not active anymore");
    }
}
//PUT
const updateCaseDetails = (req, res) => {
    const url = req.url;
    const caseId = parseInt(url.split("/")[2]);
    const response = putReunificationCase(caseId);
    res.statusCode = 201;
    res.setHeader("content-Type", "text/plain");
    res.end(JSON.stringify(response));
}
//DELETE
const deleteCompletedOrCancelledRequest = (req, res) => {
    const url = req.url;
    const caseId = parseInt(url.split("/")[2]);
    const response = deleteRequest(caseId);
    res.statusCode = 201;
    res.setHeader("content-Type", "text/plain");
    res.end(JSON.stringify(response));
}
module.exports = {
    readActiveReunificationCase, createReunificationCase,
    updateCaseDetails, deleteCompletedOrCancelledRequest, readReunificationCase,handleRequest,
    bodyParser
}
