//Response
/***************************************************************************************
 Function to set the HTTP status code and send a
 response based on the provided code and response data.
 ***************************************************************************************/

const statusCode = (res, code, response) => {

    switch (code) {
        case 200 :
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/plain");
            res.end(JSON.stringify(response));
            break;
        case 201 :
            res.statusCode = 201;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(response));
            break;
        case 400:
            res.statusCode = 400;
            res.setHeader("Content-Type", "text/plain");
            res.end(JSON.stringify({message: response}));
            break;
        case 404 :
            res.statusCode = 404;
            res.setHeader("Content-Type", "text/plain");
            res.end(JSON.stringify({message: response}));
            break;
        case 500:
            res.statusCode = 500; // Internal Server Error
            res.setHeader("Content-Type", "text/plain");
            res.end(JSON.stringify({message: response}));
            break;
    }
}
module.exports = {statusCode}