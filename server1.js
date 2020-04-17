const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Olá Mundo!');
});

app.listen(3000, () => {
  console.log('servidor rodando em http://localhost:3000');
});
