import React from 'react';

import PersonalInfo from '../PersonalInfo/PersonalInfo.jsx';
import BadgeList from '../BadgeList/BadgeList.jsx';

class Profile extends React.Component {
  render() {
    return <div className="main-container">
      <PersonalInfo name="Kaan"/>
      <BadgeList />
    </div>
  }
}

export default Profile;
