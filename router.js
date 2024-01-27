//router
/******************************************************************************
 Importing controller functions and response-related utilities.
 *******************************************************************************/

const {
    readActiveReunificationCase,
    deleteReunificationCase,
    readReunificationCase,
    bodyParser,
    createReunificationCase,
    updateReunificationCase
} = require("./controller");
const {statusCode} = require("./response")

/******************************************************************************
 Router function that handles incoming requests
 and routes them to the appropriate controller function.
 *******************************************************************************/

const router = (req, res) => {
    const {method, url} = req;
    const parts = url.split('/');
    const route = parts[1];
    if (method === 'GET' && route === 'familyReunification' && parts.length === 2) {
        readActiveReunificationCase(req, res);
    } else if (method === 'GET' && route === 'familyReunification' && parts.length >= 3) {
        readReunificationCase(req, res);
    } else if ((method === 'POST' || method === 'PUT') && route === 'familyReunification') {
        bodyParser(req, res, () => {
            const requestData = req.body;
            switch (method) {
                case 'POST':
                    createReunificationCase(requestData, res);
                    break;
                case 'PUT':
                    updateReunificationCase(requestData, res);
                    break;
            }
        });
    } else if (method === 'DELETE' && route === 'familyReunification') {
        deleteReunificationCase(req, res);
    } else {
        statusCode(res, 404, "Invalid route");
    }
};

module.exports = {router}