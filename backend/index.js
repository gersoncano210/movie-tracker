require('dotenv').config();
const express = require('express');
const moviesRouter = require('./routes/movies');
const tvRouter = require('./routes/tv');
const mylistRouter = require('./routes/mylist');

const app = express();
const PORT = 3001;

app.use(express.json());

app.use('/api/movies', moviesRouter);
app.use('/api/tv', tvRouter);
app.use('/api/mylist', mylistRouter);


app.get('/', (req, res) => {
  res.send('Servidor del Movie Tracker funcionando 🎬');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});