'use strict';

var React = require('react');
var page = require('page');

var ListItem = require('./list-item.jsx');

module.exports = React.createClass({
  displayName: 'App1',
  getInitialState: function() {
    return {
      page: this.props.page
    };
  },
  componentDidMount: function() {
    page('/app1/:page', function (item) {
      return this.setState({
        page: item.params.page
      });
    }.bind(this));
    return page.start();
  },
  render: function() {
    return (
      <div>
        <h1>app1 {this.state.page}</h1>
        <ul>
          <ListItem app="0" page="page1" />
          <ListItem app="0" page="page2" />
          <ListItem app="1" page="page1" />
          <ListItem app="1" page="page2" />
        </ul>
      </div>
    );
  }
});
