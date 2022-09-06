//Import dependencies & files
const express = require('express');
const htmlRoutes = require('./routes/html')
const apiRoutes = require('./routes/api')

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

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🎮`));