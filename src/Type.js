var React = require('react');
var Timestamp = require('react-timestamp');

class Type extends React.Component {

constructor(props) {
  super(props);

  this.state = {
    counterObj: {
      publicCount: 0,
      privateCount: 0,
      confCount: 0
    }
  }
}
  render(){
    return(
        <div>
          {
            this.props.roomData.map(function(item, i){
                switch(item.roomType) {
                  case 2:
                    item.topic = "Private Room";
                    item.roomType = "Private";
                    this.state.counterObj.privateCount++;
                    break;
                  case 3:
                    item.topic = "Confidential Room";
                    item.roomType = "Confidential";
                    this.state.counterObj.confCount++
                    break;
                  default:
                    item.roomType = "Public"
                    this.state.counterObj.publicCount++
                }
            return (
              <div key={i}>
                <div>
                  <span>Name: {item.topic}, </span>
                  <span>Type: {item.roomType}, </span>
                  <span>Date: <Timestamp time={(item.createTms)/1000} format="date" /></span>
                </div>
              </div>
              )
            }.bind(this))
          }
          
          <div>
            <div>Public: {this.state.counterObj.publicCount}</div>
            <div>Private: {this.state.counterObj.privateCount}</div>
            <div>Confidential: {this.state.counterObj.confCount}</div>
          </div>
        </div>
    )
  }
}

module.exports = Type;
