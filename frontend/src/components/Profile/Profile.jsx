import React from 'react';
import axios from 'axios';

import { Redirect } from 'react-router-dom';

import PersonalInfo from '../PersonalInfo/PersonalInfo.jsx';
import BadgeList from '../BadgeList/BadgeList.jsx';

class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {user: {}, received401: false, lele:true};
  }

  componentWillMount() {
    axios.get('/api/user')
      .then((res) => {
        this.setState({user: res.data})
      })
      .catch((err) => {
        console.log(err);
        this.setState({received401: true})
      });
  }

  render() {
    if (this.state.received401) {
      return <Redirect to="/login" />
    }
    return <div className="main-container">
      <PersonalInfo name={this.state.user.firstName}/>
      <BadgeList />
    </div>
  }
}

export default Profile;
