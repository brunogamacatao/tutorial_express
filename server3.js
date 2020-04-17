const express = require('express');
const cors = require('cors');
const app = express();
const filmes = require('./routes/filmes');

// Configura o servidor web
app.use(cors()); // permite requisições CORS de qualquer host
app.use(express.json()); // se o corpo da requisição é json, popula um objeto req.body com seu valor

// Rotas da aplicação
app.get('/', (req, res) => {
  res.send('API Facisaflix');
});
app.use('/filmes', filmes);

// Inicia o servidor
app.listen(3000, () => {
  console.log('servidor rodando em http://localhost:3000');
});
