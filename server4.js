// Lê o arquivo .env e atribui as variáveis de ambiente
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();

// Importa e conecta com os bancos de dados
require('./db/mongo').conecta();

// Configura o servidor web
app.use(cors()); // permite requisições CORS de qualquer host
app.use(express.json()); // popula o objeto req.body com dados json

// Rotas da aplicação
app.use('/produtos', require('./routes/produtos'));
app.use('/livros', require('./routes/livros'));

// Inicia o servidor
const serverPort = parseInt(process.env.SERVER_PORT);
app.listen(serverPort, () => {
  console.log('servidor rodando em http://localhost:' + serverPort);
});
