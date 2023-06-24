const joi = require('joi')

const scheme = joi.object({
  name: joi.string().regex(/^[A-Za-z\s]+$/, 'Only characters allowed').required(),
  lastname: joi.string().regex(/^[A-Za-z\s]+$/, 'Only characters allowed').required(),
  email: joi.string().email().required(),
  phone: joi.string().regex(/^\d+$/, 'Only numbers allowed').required(),
  profileImage: joi.required()
})

function validateUser(req, res, next){
  const {error} = scheme.validate(req.body)
  return error ? res.status(400).json({error: error.details[0].message}) : next()
}

module.exports = validateUser