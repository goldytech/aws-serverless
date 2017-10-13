import Ajv from 'ajv'
class JsonValidator {
  constructor () {
    this._errors = []
    this._validationResult = false
  }

  get errors () {
    return this._errors
  }

  get validationResult () {
    return this._validationResult
  }

  validate (data) {
    let ajv = new Ajv({coerceTypes: true, removeAdditional: true})
    let schema = {
      'type': 'object',
      'additionalProperties': false,
      'properties': {
        'firstName': {'type': 'string'},
        'age': {'type': 'integer'},
        'dateofBirth': {'type': 'string', 'format': 'date'}
      },
      'required': [ 'firstName' ]
    }
    let valid = ajv.validate(schema, data)
    if (!valid) {
      this._errors = ajv.errors
      this._validationResult = valid
    }
  }
}
module.exports = JsonValidator
