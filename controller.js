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
    const requestData = req.body;
    switch (req.method) {
        case 'POST':
            createReunificationCase(requestData, res);
            break;
        case 'PUT':
            updateReunificationCase(requestData, res);
            break;
        default:
    }
};
//POST
const createReunificationCase = (newReunificationCase, res) => {
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
const updateReunificationCase = (updatedData, res) => {
    try {
        let existingData = getAllActiveReunificationCase();
        const existingCaseIndex = existingData.reunificationCase.findIndex(item => item.id === updatedData.id);

        if (existingCaseIndex === -1) {
            res.statusCode = 404;
            res.setHeader("Content-Type", "text/plain");
            res.end("Reunification case not found");
        } else {
            existingData.reunificationCase[existingCaseIndex] = {...existingData.reunificationCase[existingCaseIndex], ...updatedData};
            const response = postReunificationCase(existingData);

            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({message: response}));
        }
    } catch (error) {
        console.error('Error in updateReunificationCase:', error.message);
        res.statusCode = 500; // Internal Server Error
        res.setHeader("Content-Type", "text/plain");
        res.end("Internal Server Error");
    }
};
//DELETE
const deleteReunificationCase = (req, res) => {
    try {
        const url = req.url;
        const caseId = parseInt(url.split("/")[2]);
        const existingData = getActiveReunificationCase();
        const existingCaseIndex = existingData.reunificationCase.findIndex(item => item.id === caseId);

        if (existingCaseIndex === -1) {
            res.statusCode = 404;
            res.setHeader("Content-Type", "text/plain");
            res.end("Reunification case not found");
        } else {
            existingData.reunificationCase.splice(existingCaseIndex, 1);
            const response = postReunificationCase(existingData);
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ message: response }));
        }
    } catch (error) {
        console.error('Error in deleteReunificationCase:', error.message);
        res.statusCode = 500; // Internal Server Error
        res.setHeader("Content-Type", "text/plain");
        res.end("Internal Server Error");
    }
};
module.exports = {
    readActiveReunificationCase, createReunificationCase,
    updateReunificationCase, deleteReunificationCase, readReunificationCase, handleRequest,
    bodyParser
}
