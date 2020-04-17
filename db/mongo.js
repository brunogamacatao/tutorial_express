const mongoose = require('mongoose');

const conecta = () => {
  // Conecta ao banco de dados
  mongoose.connect(process.env.MONGO_DATABASE_URL, { useNewUrlParser: true });
  const db = mongoose.connection;
  db.on('error', (error) => console.error(error));
  db.once('open', () => console.log('conectado ao banco de dados'));
};

module.exports = {
  conecta: conecta
};
