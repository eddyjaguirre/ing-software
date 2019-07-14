const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');

const users = require('./routes/api/users');
const levels = require('./routes/api/levels');
const tecnicos = require('./routes/api/tecnicos');

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

const db = 'mongodb://localhost:27017/ingSoftware';

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(()=>console.log('Conexion exitosa con MongoDB'))
  .catch(err => console.log(err));

app.use(passport.initialize());

require('./config/passport')(passport);

app.use(cors());

app.use('/api/users', users);
app.use('/api/levels', levels)
app.use('/api/tecnicos', tecnicos)

const port = 5000;
app.listen(port, () => console.log(`Servidor funcionando en el puerto ${port}!`));