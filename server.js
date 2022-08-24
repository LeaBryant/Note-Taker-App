const express = require('express');

const apiRoutes = require('./routes/api');
const htmlRoutes = require('./routes/html');

//Create local host port
const PORT = process.env.PORT || 3001;

//Create express app
const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api', apiRoutes);
app.use('/', htmlRoutes)

// if request is not found
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🎮`));