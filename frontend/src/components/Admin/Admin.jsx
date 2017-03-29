import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import AddUser from '../AddUser/AddUser.jsx';
import AddBadge from '../AddBadge/AddBadge.jsx';

import './Admin.less';

class Admin extends React.Component{
  render() {
    return (<Router>
        <div className="main-container">
          <div className="admin-nav">
            <ul>
              <li><Link to="/admin">User</Link></li>
              <li><Link to="/admin/badge">Badge</Link></li>
            </ul>
          </div>

          <Route exact path="/admin" component={AddUser} />
          <Route path="/admin/badge" component={AddBadge} />
        </div>
      </Router>);
  }
}


export default Admin;
