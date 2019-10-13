require('dotenv').config();


var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var usersRouter = require('./routes/users');
var authRouter = require('./routes/authentication');

var app = express();

app.use(logger('dev'));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


/* expose API v1 */
const version_1 = '/v1';
app.use( version_1 + '/users', usersRouter);
app.use( version_1 + '/auth', authRouter);

module.exports = app;
