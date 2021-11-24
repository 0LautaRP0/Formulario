const fs = require('fs');
const http = require('http');
const url = require('url');

const generaTemplate = function (template, alumno) {
  let salida = template.replace(/{%id%}/g, alumno.id);
  salida = salida.replace('{%email%}', alumno.email);
  salida = salida.replace('{%apellido%}', alumno.apellido);
  salida = salida.replace('{%nombre%}', alumno.nombre);
  return salida;
};

const bootstrap = fs.readFileSync(
  `${__dirname}/bootstrap/css/bootstrap.css`,
  'utf-8'
);
let templateIndex = fs.readFileSync('html/template-index.html', 'utf-8');
templateIndex = templateIndex.replace('{%bootstrap%}', bootstrap);
let templateForm = fs.readFileSync('html/template-form.html', 'utf-8');
templateForm = templateForm.replace('{%bootstrap%}', bootstrap);
let templateFila = `<tr>
    <td><a href="/alumnos?id={%id%}">{%id%}</a></td>
    <td>{%email%}</td>
    <td>{%apellido%}</td>
    <td>{%nombre%}</td>
  </tr>`;

const data = fs.readFileSync('dev-data/data2.json', 'utf-8');
let dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const pathname = url.parse(req.url, true);

  if (pathname.pathname === '/') {
    const alumnosHtml = dataObj
      .map((alumno) => generaTemplate(templateFila, alumno))
      .join('');
    templateForm = templateForm.replace('{%alumnos%}', alumnosHtml);
    res.writeHead(200, {
      'Content-type': 'text/html',
    });
    res.end(templateForm);
  } else if (pathname.pathname === '/alumnos') {
    const id = pathname.query.id;
    const alumno = dataObj[id - 1];

    const html = generaTemplate(templateIndex, alumno);

    res.writeHead(200, {
      'Content-type': 'text/html',
    });

    res.end(html);
  }
});

// module.exports = app;

server.listen(3000, '127.0.0.1', () => {
  console.log('Ejecutando servidor en 127.0.0.1:3000');
});
