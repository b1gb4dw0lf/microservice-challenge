import React from 'react';
import Badge from '../Badge/Badge.jsx';

import './BadgeList.less';

class BadgeList extends React.Component{
  render() {
    return <div className="badge-list-container">
      <h2>Badge List</h2>
      <div className="badge-list">
        <Badge url="../../assests/lock-badge.png"/>
        <Badge url="../../assests/lock-badge.png"/>
        <Badge url="../../assests/lock-badge.png"/>
        <Badge url="../../assests/lock-badge.png"/>
      </div>
    </div>
  }
}


export default BadgeList;
