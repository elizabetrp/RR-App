var React = require('react');
var Timestamp = require('react-timestamp');

class Rooms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    // fetch('https://idaas.iam.ibm.com/idaas/oidc/endpoint/default/token', {
    //   method: 'POST',
    //   mode: 'no-cors',
    //   headers: {
    //     'Authorization': 'Basic dGlsaWV2YUBiZy5pYm0uY29tOnRlc3Q=',
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   },
    //   body: JSON.stringify({
    //     reqBody: 'grant_type=client_credentials&scope=openid'
    //   })
    // })

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

    fetch("https://rr.devlab.ibm.com/ResolutionRoomsBackend/api/rest/nomenclatures/", {
      method: 'GET',
      headers: {
        'Authorization': 'Basic dGlsaWV2YUBiZy5pYm0uY29tOnRlc3Q=',
        'Accept': 'application/json'
      }
    })
    .then(response => {
      return response.json();
    })
    .then(function(info) {
      this.setState(function() {
          return {
            nomenclatures: info
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
          <h1 id="title">List of rooms</h1>
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
                  <span>Name of room: </span>
                  {item.topic + ", "}
                  <span>Type: </span>
                  {item.roomType + ", Date: "}
                  <Timestamp time={(item.createTms)/1000} format="date" />
                </span>
              )
            })}
          </div>
        </div>
    )
  }
}


module.exports = Rooms;
