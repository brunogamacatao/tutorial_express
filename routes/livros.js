const express = require('express');
const router = express.Router();
const db = require('../db/sqlite');

// retorna todos os livros
router.get('/', (req, res) => {
  let sql = 'SELECT ID, NOME, AUTOR FROM LIVRO';
  let params = [];

  db.all(sql, params, (err, rows) => {
    res.json(rows);
  });
})

// retorna um livro pelo id
router.get('/:id', getLivroPorId, (req, res) => {
  res.json(res.livro);
})

// cria um livro
router.post('/', (req, res) => {
  let livro = req.body;

  let sql = 'INSERT INTO LIVRO(NOME, AUTOR) VALUES(?, ?)';
  let params = [livro.nome, livro.autor];

  db.run(sql, params, function (err, result) {
    livro.id = this.lastID;
    res.json(livro);
  });
});

// remove um livro
router.delete('/:id', getLivroPorId, (req, res) => {
  let sql = 'DELETE FROM LIVRO WHERE ID = ?';
  let params = [req.params.id];

  db.run(sql, params, function (err, result) {
    res.json(livro);
  });
});

// atualiza um livro pelo id
router.put('/:id', (req, res) => {
  let livro = req.body;
  let sql = 'UPDATE LIVRO SET NOME = ?, AUTOR = ? WHERE ID = ?';
  let params = [livro.nome, livro.autor, req.params.id];

  db.run(sql, params, function (err, result) {
    res.json(livro);
  });
});

// função de middleware para recuperar um livro pelo id
function getLivroPorId(req, res, next) {
  let sql = 'SELECT ID, NOME, AUTOR FROM LIVRO WHERE ID = ?';
  let params = [req.params.id];

  db.get(sql, params, (err, row) => {
    if (err) {
      return res.status(404).json({ 
        erro: 'Não foi possivel encontrar um livro com o id informado'
      });  
    } else {
      res.livro = row;
    }
    next();
  });

}

module.exports = router;
