const app = require('./app');

const puerto = 3000;

app.listen(3000, () => {
  console.log(`Escuchando en 127.0.0.1:${puerto}`);
});

// "start": "nodemon server.js",
