// Selectores
//    Formulario
const lblId = document.querySelector('.lbl-id');
const formAlumnos = document.querySelector('.form-alumnos');
const txtEmail = document.getElementById('txt-email');
const txtApellido = document.getElementById('txt-apellido');
const txtNombre = document.getElementById('txt-nombre');
const btnGuardar = document.querySelector('.btn-guardar');
const btnActualizar = document.querySelector('.btn-actualizar');
const btnLimpiar = document.querySelector('.btn-limpiar');
//    Lista
const listaAlumnos = document.querySelector('.lista-alumnos');
const filasAlumnos = document.querySelector('.filas-alumnos');

// Datos
let data = {
  lastId: 0,
  alumnos: [
    /*
        {
          id: 1,
          nombre: 'John',
          apellido: 'Doe',
          email: 'john@example.com'
        },
      */
  ],
};

btnGuardar.addEventListener('click', function () {
  if (Number(lblId.textContent)) return;

  // Crear un objeto alumno con los datos del form
  data.lastId++;
  const alumno = {
    id: data.lastId,
    nombre: txtNombre.value,
    apellido: txtApellido.value,
    email: txtEmail.value,
  };
  // Cargar el objeto en data
  data.alumnos.push(alumno);
  console.log(data);
  // Actualizar el storage
  localStorage.setItem('data', JSON.stringify(data));
  // Actualizar la interfaz gráfica
  limpiarForm();
  // tabla
  cargaAlumnos();
});

filasAlumnos.addEventListener('click', function (evt) {
  // Seleccionar la fila
  console.dir(evt.target.classList.contains('close'));
  const fila = evt.target.closest('tr');
  const id = Number(fila.dataset.id);
  if (evt.target.classList.contains('close')) {
    let alumno = data.alumnos.find(function (alu) {
      return alu.id === id;
    });
    const posicion = data.alumnos.indexOf(alumno);
    data.alumnos.splice(posicion, 1);
    // actualizar localstorage
    localStorage.setItem('data', JSON.stringify(data));
    // actualizar interfaz de usuario
    cargaAlumnos();
  } else {
    lblId.textContent = fila.dataset.id;
    txtEmail.value = fila.querySelector('.celda-email').textContent;
    txtApellido.value = fila.querySelector('.celda-apellido').textContent;
    txtNombre.value = fila.querySelector('.celda-nombre').textContent;
    txtEmail.focus();
  }
});

btnActualizar.addEventListener('click', function () {
  const id = Number(lblId.textContent);
  if (!id) return;
  let alumno = data.alumnos.find(function (alu) {
    return alu.id === id;
  });
  if (alumno) {
    alumno.email = txtEmail.value;
    alumno.apellido = txtApellido.value;
    alumno.nombre = txtNombre.value;
    // actualizar storage
    localStorage.setItem('data', JSON.stringify(data));
    // actualizar la tabla
    cargaAlumnos();
  }
});

btnLimpiar.addEventListener('click', function () {
  limpiarForm();
});
const limpiarForm = function () {
  formAlumnos.reset();
  txtEmail.focus();
  lblId.textContent = '';
};
/*
  localStorage
      setItem(almacen, datos)
      getItem(almacen) -> datos o null

      JSON.stringify(objeto) -> convierte objeto a string
      JSON.parse(string) -> convierte string a objeto
*/
window.addEventListener('load', function () {
  if (localStorage.getItem('data')) {
    data = JSON.parse(localStorage.getItem('data'));
  } else {
    localStorage.setItem('data', JSON.stringify(data));
  }
  cargaAlumnos();
});

const cargaAlumnos = function () {
  let html = data.alumnos.map(function (alumno) {
    return `<tr data-id="${alumno.id}">
          <td class="celda-nombre">${alumno.nombre}</td>
          <td class="celda-apellido">${alumno.apellido}</td>
          <td class="celda-email">${alumno.email}</td>
          <th><button class="close">&times;</button></th>
        </tr>`;
  });
  html = html.join('\n');
  filasAlumnos.innerHTML = html;
};

const limpiarForm = function () {
  formAlumnos.reset();
  txtEmail.focus();
};
