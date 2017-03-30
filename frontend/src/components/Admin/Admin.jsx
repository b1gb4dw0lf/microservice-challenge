import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import AddBadge from '../AddBadge/AddBadge.jsx';
import EditBadge from '../EditBadge/EditBadge.jsx';

import './Admin.less';

class Admin extends React.Component{
  render() {
    return (<Router>
        <div className="main-container">
          <div className="admin-nav">
            <ul>
              <li><Link to="/admin/">Create Badge</Link></li>
              <li><Link to="/admin/edit">Edit Badge</Link></li>
            </ul>
          </div>

          <Route exact path="/admin" component={AddBadge} />
          <Route path="/admin/edit" component={EditBadge} />
        </div>
      </Router>);
  }
}


export default Admin;
