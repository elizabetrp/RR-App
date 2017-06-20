var React = require('react');
require('./App.css');
var Rooms = require('./Rooms.js');
//TEst comment
class App extends React.Component {
  render() {
    return (
      <div className="loadingDiv">
        <div className="App">
          <Rooms />
        </div>
      </div>
    )
  }
}

module.exports = App;
