const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  // data.nombre = !isEmpty(data.nombre) ? data.nombre : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (Validator.isEmpty(data.email)) {
    errors.email = "Ingrese su correo electrónico";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "El correo electrónico ingresado no es válido";
  }

  // if (Validator.isEmpty(data.nombre)) {
  //   errors.nombre = "Ingrese su nombre";
  // }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Ingrese una contraseña";
  }

  if (!Validator.isLength(data.password, {min: 8, max: 30})) {
    errors.password = "La contraseña debe incluir al menos 8 caracteres";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};