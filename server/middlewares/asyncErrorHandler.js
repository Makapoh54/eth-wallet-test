const logger = require('../utils/logger')('asyncErrorHandler');

// Handler to return all async errors from controllers at one place.
// Error can be catched in whatever convenient place and rethrown with specific status and message.
const asyncErrorHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(error => {
    logger.log('error', `${fn.name} - ${error.stack}`);
    res.status(error.httpErrorCode || 500).send({ data: null, error: { message: error.message } });
    next();
  });
};

export default asyncErrorHandler;
