const express = require("express");
const logger = require('morgan');

const bodyParser = require('body-parser');

const index = require('./routes');
const teams = require('./routes/teams');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.get('/', (req, res) => res.send('Welcome to the API'))

app.use('/api/', index);
app.use('/api/', teams);

app.listen(3000, () => console.log("Server running on port 3000"))
