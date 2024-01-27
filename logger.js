const morgan = require('morgan');
const loggerMiddleware = morgan(':method :url :status :response-time ms - :res[content-length] [:date[clf]]');
module.exports = loggerMiddleware;