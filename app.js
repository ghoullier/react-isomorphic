'use strict';

var bodyParser = require('body-parser');
var express = require('express');
var jade = require('jade');
var fs = require('fs');
var path = require('path');

var reactViewEngine = require('./lib/react-view-engine');
var routes = require('./routes');

var app = express();

app.locals.title = 'xx';

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json());
app.use(routes);

app.set('views', path.join(__dirname, 'components'));
app.set('view engine', 'jsx');

app.engine('jsx', reactViewEngine({
  layout: jade.compile(fs.readFileSync(path.join(__dirname, 'views/layout.jade'), 'utf8'))
}));


module.exports = app;
