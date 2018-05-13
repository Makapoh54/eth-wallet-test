const logger = require('../utils/logger')('asyncErrorHandler');

// DEPRECATED. Use new handleApi instead.
const asyncErrorHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(error => {
    logger.log('error', `${fn.name} - ${error.stack}`);
    res.status(500).send(error.message);
    // next();  -- causes "curl: (18) transfer closed with 1 bytes remaining to read".
  });
};

export default asyncErrorHandler;
