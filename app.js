var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
require('dotenv').config()


var fileAccessRouter = require('./routes/fileAccess');
var fileExlorerRouter = require('./routes/fileExplorer');

var app = express();
app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/file', fileExlorerRouter);
app.use('/access', fileAccessRouter);

module.exports = app;
