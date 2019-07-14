const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

const User = require("../../models/User");

// @route POST api/users/register
// @desc Register user
// @access Public

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({email: req.body.email}).then(user => {
    if (user) {
      return res.status(400).json({email: 'El usuario ya existe'});
    } else {
      const newUser = new User({
        email: req.body.email,
        password: req.body.password,
        nivelUsuario: req.body.nivelUsuario,
        datosPersonales: {
          nombre: req.body.nombre,
          cedula: req.body.cedula,
          rif: req.body.rif,
          direccion: req.body.direccion,
          telefono: req.body.telefono,
          especialidad: req.body.especialidad,
        }
      });
      
      //Encripta la clave antes de guardarla
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user=>{
    // Consigue el usuario
    if (!user) {
      return res.status(400).json({usernotfound: 'No se encontró el correo'});
    }

    //Valida Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user.id,
          nombre: user.datosPersonales.nombre,
          nivelUsuario: user.nivelUsuario
        };

        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926
          },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: 'Contraseña incorrecta' });
      }
    })
  });
});

module.exports = router;