"use strict";

var express = require('express');

var lib = require("./lib/");
var handlers = lib.handlers;
var middlewares = lib.middlewares;


var app = express();

app.engine('html', require('ejs').renderFile);
app.set('views', './templates');
app.set('view engine', 'html');


app.use('/link', middlewares.checkParameters);
app.use('/ics', middlewares.checkParameters);

app.use(middlewares.errorHandler);

app.get('/', handlers.index.get);

app.get('/link', handlers.link.get);

app.get('/ics', handlers.ics.get);



module.exports = app;
