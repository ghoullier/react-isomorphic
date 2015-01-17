'use strict';

var path = require('path');
var React = require('react');
var jsx = require('node-jsx');

jsx.install({
  extension: '.jsx'
});

module.exports = function(options) {
  options = options || {};
  return function reactViewEngine(view, locals, callback) {
    if (!locals._locals.props) {
      locals._locals.props = {};
    }

    var component = path.relative(locals.settings.views, view);

    locals.component = component.slice(0, -4);
    locals.props = merge(locals._locals.props, locals.props);

    delete locals._locals;
    delete locals.cache;
    delete locals.settings;

    try {
      var Component = require(view);
      locals.content = React.renderToString(new Component(locals.props));

      return callback(null, options.layout(locals));
    } catch (error) {
      console.error(error.stack);
      return callback(new Error('Could not require component: ' + view));
    }
  };
};

function merge(obj, src){
  var hasOwn = {}.hasOwnProperty;
  for (var key in src) {
    if (hasOwn.call(src, key)) {
      obj[key] = src[key];
    }
  }
  return obj;
}
