const express = require("express");
const logger = require('morgan');

const bodyParser = require('body-parser');

const index = require('./routes/index');
const state = require('./routes/state');
const teams = require('./routes/teams');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', index);
app.use('/api/teams', teams);
app.use('/api/state', state);

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.listen(3000, () => console.log("Server running on port 3000"));