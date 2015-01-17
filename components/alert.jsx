'use strict';

var React = require('react');

var Alert = module.exports = React.createClass({
  displayName: 'Alert',
  render: function() {
    return (
      <button type="button" onClick={this.onClick}>{this.props.name}</button>
    );
  },
  onClick: function() {
    console.log('onClick', this);
  }
});
