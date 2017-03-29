import React from 'react';
import './PersonalInfo.less';

class PersonalInfo extends React.Component {
  render() {
    return <div className="identity">
      <div className="profile-avatar"></div>
      <h2>Welcome, {this.props.name}</h2>
    </div>
  }
}

export default PersonalInfo;
