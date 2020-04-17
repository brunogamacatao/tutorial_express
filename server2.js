const express = require('express');
const app = express();

app.use(express.static('static'));

app.get('/hello', (req, res) => {
  res.send('Olá Mundo!');
});

app.get('/oi/:nome', (req, res) => {
  res.send('Oi ' + req.params.nome + ", tudo bem?");
});


app.listen(3000, () => {
  console.log('servidor rodando em http://localhost:3000');
});
