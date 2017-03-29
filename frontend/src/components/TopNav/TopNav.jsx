import React from 'react';
import { Route, Link } from 'react-router-dom';

import Profile from '../Profile/Profile.jsx';
import BadgeList from '../BadgeList/BadgeList.jsx';

import './TopNav.less';

class TopNav extends React.Component{
  render() {
    return (<div>
      <div id="top-nav">
        <ul className="left">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/dum1">Dum1</Link></li>
          <li><Link to="/dum2">Dum2</Link></li>
          <li><Link to="/dum3">Dum3</Link></li>
        </ul>
        <ul className="right">
          <li><Link to="/profile">Profile</Link></li>
        </ul>

      </div>

      <Route exact path="/" component={Profile} />
    </div>)
  }
}


export default TopNav;
