const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (Validator.isEmpty(data.email)) {
    errors.email = "Ingrese su correo";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Ingrese su contraseña";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};