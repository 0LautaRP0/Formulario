const express = require('express');
const controller = require('./../controladores/alumnosController');
const routerAlumnos = express.Router();

routerAlumnos
  .route('/')
  .get(controller.mostrarAlumnos)
  .post(controller.crearAlumno);
routerAlumnos
  .route('/:id')
  .get(controller.mostarAlumno)
  .patch(controller.actualizarAlumno)
  .delete(controller.eliminarAlumno);

module.exports = routerAlumnos;
