import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';

import './global.less'

import TopNav from './components/TopNav/TopNav.jsx';

ReactDOM.render(
  <Router>
    <TopNav/>
  </Router>,
  document.getElementById('root'));
