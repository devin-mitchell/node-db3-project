const schemeModel = require('./scheme-model')

/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = (req, res, next) => {
  schemeModel.findById(req.params.id)
    .then(scheme => {
      if (!scheme) {
        next({
          status: 404,
          message: `scheme with ${req.params.id} not found`
        })
      } else {
        next()
      }
    }) 
}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  const { name } = req.body
  if (!name || name === '' || typeof name !== 'string') {
    next({
      status: 400,
      message: `invalid scheme_name`
    })
  } else {
    next()
  }
}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
  const { instructions, step_number } = req.body
  if (!instructions || 
      instructions === '' || 
      typeof instructions !== 'string' ||
      typeof step_number !== 'number' ||
      step_number < 1) {
        next({
          status: 400,
          message: 'invalid step'
        })
  } else {
    next()
  }
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
