const express = require('express');
const router = express.Router();

let proxId = 0;
let filmes = [];

// retorna todos os filmes
router.get('/', (req, res) => {
  res.json(filmes);
})

// retorna um filme pelo id
router.get('/:id', getFilmePorId, (req, res) => {
  res.json(res.filme);
})

// cria um filme
router.post('/', (req, res) => {
  let novoFilme = req.body;
  novoFilme.id = proxId++;
  filmes.push(novoFilme);
  res.json(novoFilme);
})

// remove um filme
router.delete('/:id', getFilmePorId, (req, res) => {
  let idFilme = filmes.findIndex(f => f.id === parseInt(req.params.id));
  filmes.splice(idFilme, 1);
  res.json(res.filme);
})

// atualiza um filme pelo id
router.put('/:id', getFilmePorId, (req, res) => {
  let idFilme = filmes.findIndex(f => f.id === parseInt(req.params.id));
  let filmeAtualizado = res.filme;
  filmes[idFilme] = filmeAtualizado;
  res.json(filmeAtualizado);
})

// função de middleware para recuperar um filme pelo id
function getFilmePorId(req, res, next) {
  let idFilme = filmes.findIndex(f => f.id === parseInt(req.params.id));
  
  if (idFilme >= 0) {
    res.filme = filmes[idFilme];
  } else {
    return res.status(404).json({ 
      erro: 'Não foi possivel encontrar um filme com o id informado'
    });
  }

  next();
}

module.exports = router;
