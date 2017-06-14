var React = require('react');

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
      if (!response.ok) {
        throw Error("Network request failed")
      }
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
      if (!response.ok) {
        throw Error("Network request failed")
      }
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
        <div className="table" id="title">List of rooms
          <div className="names">{this.state.roomData.map(function(item, i){
            if(typeof(JSON.stringify(item.topic)) === "undefined"){
              return ""
            }
              return(
                <span key={i} className="item">
                  {JSON.stringify(item.topic) + ", type: " + JSON.stringify(item.roomType)}
                </span>
              )
          })}
          {this.state.nomenclatures.map(function(item, i){
              return(
                <span key={i} className="item">
                  {JSON.stringify(item)}
                </span>
              )
          })
        }
          </div>
        </div>
    )
  }
}


module.exports = Rooms;
