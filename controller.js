//controller
const {
    getAllReunificationCase,
    postReunificationCase,
} = require("./repository");
const {statusCode} = require("./response")

//CHECK
const checkIdValidity = (id) => {
    if (typeof id !== 'number') {
        return false;
    }
    const data = getAllReunificationCase();
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
            statusCode(res, 400, "Invalid JSON payload");
        }
    });
};
//POST
const createReunificationCase = (newReunificationCase, res) => {
    if (checkIdValidity(newReunificationCase.id) === false) {
        statusCode(res, 400, "Reunification case Id all ready exists or sent incorrectly");
    } else {
        let existingData = getAllReunificationCase();
        existingData.reunificationCase.push(newReunificationCase);
        const response = postReunificationCase(existingData);
        statusCode(res, 201, response);
    }
};
//GET
const readActiveReunificationCase = (req, res) => {
    const response = getAllReunificationCase();
    statusCode(res, 200, response);
}
const readReunificationCase = (req, res) => {
    const url = req.url;
    const caseId = parseInt(url.split("/")[2]);
    const response = getAllReunificationCase();
    const result = response.reunificationCase.find(item => item.id === caseId && item.active === true);
    if (result) {
        statusCode(res, 200, result);
    } else {
        statusCode(res, 404, "Reunification case not found or not active anymore");
    }
}
//PUT
const updateReunificationCase = (updatedData, res) => {
    try {
        let existingData = getAllReunificationCase();
        const existingCaseIndex = existingData.reunificationCase.findIndex(item => item.id === updatedData.id);

        if (existingCaseIndex === -1) {
            statusCode(res, 404, "Reunification case not found");
        } else {
            existingData.reunificationCase[existingCaseIndex] = {...existingData.reunificationCase[existingCaseIndex], ...updatedData};
            const response = postReunificationCase(existingData);
            statusCode(res, 200, response);
        }
    } catch (error) {
        console.error('Error in updateReunificationCase:', error.message);
        statusCode(res, 500, "Internal Server Error");
    }
};
//DELETE
const deleteReunificationCase = (req, res) => {
    try {
        const url = req.url;
        const caseId = parseInt(url.split("/")[2]);
        const existingData = getAllReunificationCase();
        const existingCaseIndex = existingData.reunificationCase.findIndex(item => item.id === caseId);

        if (existingCaseIndex === -1) {
            statusCode(res, 404, "Reunification case not found");
        } else {
            existingData.reunificationCase.splice(existingCaseIndex, 1);
            const response = postReunificationCase(existingData);
            statusCode(res, 200, response);
        }
    } catch (error) {
        console.error('Error in deleteReunificationCase:', error.message);
        statusCode(res, 500, "Internal Server Error");
    }
};
module.exports = {
    readActiveReunificationCase, createReunificationCase,
    updateReunificationCase, deleteReunificationCase, readReunificationCase,
    bodyParser
}
