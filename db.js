require('dotenv').config();
const mongoose = require('mongoose');

const dbURI = process.env.DB_URI;

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Erfolgreich mit MongoDB verbunden');
  })
  .catch((err) => {
    console.error('Fehler beim Verbinden mit MongoDB:', err);
  });

module.exports = mongoose;
