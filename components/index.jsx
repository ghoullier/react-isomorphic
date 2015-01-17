'use strict';

var React = require('react');

var components = {
  'app0': function(){
    return require('./app0.jsx');
  },
  'app1': function(){
    return require('./app1.jsx');
  }
};

exports.start = function start() {
  var properties = JSON.parse(document.documentElement.dataset.props);
  var content = document.getElementById('content');
  if (content != null) {
    var component = components[content.dataset.component]();
    var instance = component(properties);

    console.log('React.render', instance, content);

    return React.render(instance, content);
  }
};
