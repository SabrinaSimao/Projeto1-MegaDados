const boom = require('boom');

// wrapper for our async route handlers
// probably you want to move it to a new file
exports.wrapAsync = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(err => {
    if (!err.isBoom) {
      return next(boom.badImplementation(err));
    }
    next(err);
  });
};
