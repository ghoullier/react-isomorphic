'use strict';

var express, react, routes, baseProps;

var express = require('express');
var react = require('react');

var routes = module.exports = express.Router();

routes.get('/:app/:page', baseProps, function(request, response) {
  response.locals.title = "App " + request.params.app;
  return response.render(request.params.app, {
    props: {
      page: request.params.page
    }
  });
});

function baseProps(request, response, next) {
  if (!response.locals.props) {
    response.locals.props = {};
  }
  response.locals.props.base = true;

  return next();
}
