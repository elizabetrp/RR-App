var React = require('react');
var authorization = require("./authorization_header.json");
var Type = require("./Type.js");

class Rooms extends React.Component {


  sortRooms(rooms) {
    rooms.sort((a, b) =>
      new Date(b.createTms) - new Date(a.createTms));
      return rooms;
  }

  constructor(props) {
    super(props);

    this.state = {};

    this.sortRooms = this.sortRooms.bind(this);
  }

  componentDidMount() {

    fetch(authorization.path, {
      method: 'GET',
      headers: {
        'Authorization': authorization.header,
        'Accept': authorization.accept
      }
    })
    .then(response => {
      return response.json();
    })
    .then(function(data) {
      this.sortRooms(data);
      this.setState(function(){
        return {
          roomData: data
        }
      });
    }.bind(this));
  }

  render(){
    if(!this.state.roomData) {
      return (
        <p className="table loading">Loading...</p>
      )}
    return (
      <div className="table">
        <h1>List of rooms</h1>
        <div className="info">
          <Type roomData={this.state.roomData}/>
        </div>
      </div>
    )
  }
}


module.exports = Rooms;
