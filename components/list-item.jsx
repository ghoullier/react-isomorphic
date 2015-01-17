'use strict';

var React = require('react');

var Alert = require('./alert.jsx');

var ListItem = module.exports = React.createClass({
  displayName: 'List-Item',
  getInitialState: function() {
    return {
      href: '/app' + this.props.app + '/' + this.props.page
    };
  },
  render: function() {
    return (
      <li>
        <a href={this.state.href}>{this.props.page} in App {this.props.app}</a>
        <Alert name="poke" />
      </li>
    );
  }
});
