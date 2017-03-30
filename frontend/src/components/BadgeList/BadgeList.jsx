import React from 'react';
import axios from 'axios';
import Badge from '../Badge/Badge.jsx';

import './BadgeList.less';

class BadgeList extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      badges: [],
      userBadges: []
    }
  }

  componentWillMount() {
    let badgeRequest = axios.get('/api/badge');
    let userRequest = axios.get('/api/user');

    axios.all([badgeRequest, userRequest])
      .then(axios.spread((badgeRes, userRes) => {
        //Hack around mongoose populate problem.
        let userBadges = [];
        badgeRes.data.forEach((item) => {
          userRes.data.badges.forEach((innerItem) => {
            if (item._id == innerItem)
              userBadges.push({name: item.name, _id: innerItem});
          });
        });
        /////////////////////////////////////

        this.setState({
          badges: badgeRes.data,
          userBadges: userBadges
        });
        console.log(userRes.data.badges);
      }))
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    let counter = 0;
    let badgeList = [];

    if (this.state.badges) {
      if (this.state.userBadges) {
        this.state.userBadges.forEach((item) => {
          badgeList.push(<Badge key={counter} name={item.name} url="../../assests/crown.png"/>)
          counter++;
        });
      }

      this.state.badges.forEach((item) => {
        if (this.state.userBadges) {
          let isExist = false;
          this.state.userBadges.forEach((innerItem) => {
            if (item._id == innerItem._id)
              isExist = true;
          });

          if (!isExist)
            badgeList.push(<Badge key={counter} name={item.name} url="../../assests/lock-badge.png"/>)

          counter++;
        }
      });
    } else {
      return (<div className="badge-list-container">
        <h3>No badges available.</h3>
      </div>)
    }

    return (<div className="badge-list-container">
      <h2>Badge List</h2>
      <div className="badge-list">
        {badgeList}
      </div>
    </div>)
  }
}


export default BadgeList;
