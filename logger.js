//http logger
/***************************************************************************************
 Uses 'morgan' middleware to log incoming HTTP requests with specific details.
 - Imports 'morgan' for request logging.
 - Configures loggerMiddleware with a specific log format.
 - Exports configured middleware for server integration.
 Log Format:
 - ':method', ':url', ':status', ':response-time', ':res[content-length]', ':date[clf]'.
 ***************************************************************************************/

const morgan = require('morgan');
const loggerMiddleware = morgan(':method :url :status :response-time ms - :res[content-length] [:date[clf]]');
module.exports = loggerMiddleware;