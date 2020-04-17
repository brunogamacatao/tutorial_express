// Lê o arquivo .env e atribui as variáveis de ambiente
require('dotenv').config();

const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');
const Busboy = require('busboy');

const app = express();

// Configura o servidor web
app.use(cors());

// Habilita o uso de arquivos estáticos
app.use(express.static('static'));

// UPLOAD DA FOTO
app.post('/upload_foto', (req, res) => {
  var busboy = new Busboy({ headers: req.headers });

  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    var saveTo = path.join(__dirname, 'uploads/' + filename);
    file.pipe(fs.createWriteStream(saveTo));
  });

  busboy.on('finish', () => {
    res.writeHead(200, { 'Connection': 'close' });
    res.end("That's all folks!");
  });
   
  return req.pipe(busboy);  
});

// DOWNLOAD DA FOTO
app.get('/download/:foto', (req, res) => {
  const file = `${__dirname}/uploads/${req.params.foto}`;
  res.download(file);
});

// VISUALIZAR A FOTO
app.get('/visualiza/:foto', (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(`
  <html>
    <body>
      <img src='/download/${req.params.foto}'/>
    </body>
  </hmtl>
  `);
  res.end();
});

// Inicia o servidor
const serverPort = parseInt(process.env.SERVER_PORT);
app.listen(serverPort, () => {
  console.log('servidor rodando em http://localhost:' + serverPort);
});
