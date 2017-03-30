import React from 'react';
import { Route, Link } from 'react-router-dom';

import Profile from '../Profile/Profile.jsx';
import Dum1 from '../Dum1/Dum1.jsx';
import Dum2 from '../Dum2/Dum2.jsx';
import Dum3 from '../Dum3/Dum3.jsx';
import Home from '../Home/Home.jsx';
import Login from '../Login/Login.jsx';
import Admin from '../Admin/Admin.jsx';
import Scroller from '../Scroller/Scroller.jsx';
import AddUser from '../AddUser/AddUser.jsx';

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
          <li><Link to="/admin">Admin</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>

      </div>

      <Route exact path="/" component={Home} />
      <Route path="/dum1" component={Dum1} />
      <Route path="/dum2" component={Dum2} />
      <Route path="/dum3" component={Dum3} />
      <Route path="/admin" component={Admin} />
      <Route path="/profile" component={Profile} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={AddUser} />
      <Scroller/>
    </div>)
  }
}


export default TopNav;
