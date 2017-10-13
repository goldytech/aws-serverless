'use strict'
import JsonValidator from './src/jsonvalidator'

module.exports.hello = (event, context, callback) => {
  const data = JSON.parse(event.body)
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true
  }
  let jsonValidator = new JsonValidator()
  jsonValidator.validate(data)
  if (jsonValidator.errors.length > 0) {
    const response = {
      statusCode: 400,
      headers: headers,
      body: JSON.stringify({status: jsonValidator.errors})
    }
    callback(null, response)
  } else {
    const response = {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify(data)
    }
    callback(null, response)
  }
}

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
