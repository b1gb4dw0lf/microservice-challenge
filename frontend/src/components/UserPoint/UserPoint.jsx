import React from 'react';


class UserPoint extends React.Component {
  render() {
    return (<li>
      <h3 className="userName left">{this.props.firstName + " " + this.props.lastName}</h3>
      <h3 className="userPoint right">{this.props.points}</h3>
    </li>);
  }
}


export default UserPoint;
