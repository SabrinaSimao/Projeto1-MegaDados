const logger = require('winston')

const handleInvalidParamError = err => {
  let details = err
  if (!Array.isArray(details)) {
    details = err.details
  }
  const errors = details.map(error => {
    let type = 'invalid_request_error'
    if (error.message === '"api_key" is required') {
      type = 'authentication_error'
    }
    return {
      type,
      message: error.message,
      param: error.path,
    }
  })

  return {
    errors,
  }
}

const handleInvalidParamPagarMeError = err => ({
  type: 'invalid_request_error',
  message: err.message,
  param: err.param,
})

const handleInvalidApiError = err => ({
  errors: [
    {
      type: 'authentication_error',
      message: err.message,
      param: 'api_key',
    },
  ],
})

const handleInvalidRequestError = err => ({
  errors: [
    {
      type: 'invalid_request_error',
      message: err.message,
    },
  ],
})

/**
 * Formata todos os tipos de erros possíveis de uma maneira padronizada
 * @param  {Object} err objeto de erro
 * @return {Object}  erro formatado
 */
const errorFormatter = err => {
  // Deals with portal API error
  if (err.isJoi || err.message.isJoi) {
    err = handleInvalidParamError(err.details || err.message)
    err.status = 400
  } else if (err.type === 'invalid_parameter') {
    err = handleInvalidParamError(err)
  } else if (err.name === 'NotFound') {
    err = handleInvalidRequestError(err)
    err.status = 404
  } else if (err.name === 'PortalError') {
    err = handleInvalidRequestError(err)
    err.status = 400
  } else {
    err = handleInvalidApiError(err)
  }
  return err
}

exports.handleError = (err, req, res, next) => {
  res.set({ 'content-type': 'application/json charset=utf-8' })

  let status = err.statusCode
  const stack = err.stack

  // Format API errors
  if (Array.isArray(err)) {
    err = err.map(error => handleInvalidParamPagarMeError(error))
  } else {
    err = errorFormatter(err)
  }
  // If after formatting error, there's some new status code, change status variable to it
  if (err.status) {
    status = err.status
  }

  if (req.app.get('env') === 'development' || req.app.get('env') === 'test') {
    logger.error(err)
  }

  if (req.app.get('env') !== 'development' && req.app.get('env') !== 'test') {
    delete err.stack
  } else {
    err.stacktrace = stack
  }

  res.status(status || 500).json(err)
}
