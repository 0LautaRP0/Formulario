const express = require('express');
// const morgan = require('morgan');
// const routerAlumnos = require('./rutas/alumnosRutas');
// const server = require('./app-prueba');
const app = express();

app.use(express.json());
// app.use(morgan('dev'))
// app.use('/api/v1/alumnos', routerAlumnos);
module.exports = app;
