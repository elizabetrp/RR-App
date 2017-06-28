var React = require('react');
require('./App.css');
var Rooms = require('./Rooms.js');
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Rooms />
      </div>
    )
  }
}

module.exports = App;
