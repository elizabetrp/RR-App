var React = require('react');
var Timestamp = require('react-timestamp');

class Rooms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {

    fetch("https://rr.devlab.ibm.com/ResolutionRoomsBackend/api/rest/rooms/", {
      method: 'GET',
      headers: {
        'Authorization': 'Basic dGlsaWV2YUBiZy5pYm0uY29tOnRlc3Q=',
        'Accept': 'application/json'
      }
    })
    .then(response => {
      return response.json();
    })
    .then(function(data) {
      this.setState(function() {
          return {
            roomData: data
          }
      })
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
          <div className="info">{this.state.roomData.map(function(item, i){
            if(item.roomType === 2){
              item.topic = "Private Room"
              item.roomType = "Private"
            }
            else if(item.roomType === 3) {
              item.topic = "Confidential Room"
              item.roomType = "Confidential"
            }
            else {
              item.roomType = "Public"
            }
              return(
                <span key={i} className="item">
                  <span className="topic">
                    {item.topic}
                  </span>
                  <span className="type">
                    {item.roomType}
                  </span>
                  <span className="date">
                    <Timestamp time={(item.createTms)/1000} format="date" />
                  </span>
                </span>
              )
            })}
          </div>
        </div>
    )
  }
}


module.exports = Rooms;
