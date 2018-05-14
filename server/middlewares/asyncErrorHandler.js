const logger = require('../utils/logger')('asyncErrorHandler');

const asyncErrorHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(error => {
    logger.log('error', `${fn.name} - ${error.stack}`);
    res.status(500).send(error.message);
    next();
  });
};

export default asyncErrorHandler;
