// const express = require('express');
const fs = require('fs');

const alumnos = JSON.parse(fs.readFileSync('./dev-data/data2.json', 'utf-8'));

exports.chekId = (req, res, next) => {
  const ids = alumnos.map((alu) => alu.id);
  const existe = ids.findIndex((id) => id === Number(req.params.id));
  if (existe === -1) {
    return res.status(404).json({
      status: 'failure',
      data: null,
    });
  }
  console.log(ids, existe);
  next();
};

exports.mostrarAlumnos = (req, res) => {
  console.log('Todos los alumnos');
  res.status(200).json({
    status: 'success',
    data: {
      alumnos,
    },
  });
};

exports.crearAlumno = (req, res) => {
  const id = alumnos.length === 0 ? 1 : alumnos[alumnos.length - 1].id + 1;
  // console.log(id, req.body);
  req.body.id = id;
  alumnos.push(req.body);
  fs.writeFile('./dev-data/data2.json', JSON.stringify(alumnos), (err) => {
    res.status(201).json({
      status: 'success',
      data: req.body,
    });
  });
};

exports.mostarAlumno = (req, res) => {
  const alumno = alumnos.find((alu) => alu.id === Number(req.params.id));
  if (alumno) {
    console.log(`Mostrar alumno ${req.params.id}`);
    res.status(200).json({
      status: 'success',
      data: alumno,
    });
  }
};

exports.actualizarAlumno = (req, res) => {
  const alumno = alumnos.find((alu) => alu.id === Number(req.params.id));
  if (alumno) {
    Object.assign(alumno, req.body);

    fs.writeFile('./dev-data/data2.json', JSON.stringify(alumnos), (err) => {
      console.log(`Mostrar alumno ${req.params.id}`);
      res.status(200).json({
        status: 'success',
        data: alumno,
      });
    });
  }
};

exports.eliminarAlumno = (req, res) => {
  const idx = alumnos.find((alu) => alu.id === Number(req.params.id));
  if (alumnos[idx]) {
    alumnos.splice(idx, 1);
    Object.assign(alumno, req.body);

    fs.writeFile('./dev-data/data2.json', JSON.stringify(alumnos), (err) => {
      console.log(`Mostrar alumno ${req.params.id}`);
      res.status(200).json({
        status: 'success',
        data: null,
      });
    });
  }
};
