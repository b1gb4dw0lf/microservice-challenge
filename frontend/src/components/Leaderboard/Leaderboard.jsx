import React from 'react';
import axios from 'axios';

import UserPoint from '../UserPoint/UserPoint.jsx';

import './Leaderboard.less';

class Leaderboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      leaderboard: [],
      received401: false
    }
  }

  componentWillMount() {
    axios.get('/api/user/leaderboard')
      .then((res) => {
        this.setState({leaderboard: res.data})
      })
      .catch((err) => {
        console.log(err);
        this.setState({received401: true})
      });
  }

  render() {
    if (this.state.received401)
      return (<Redirect to="/login" />);

    let leaderboard = [];
    if (this.state.leaderboard) {
      this.state.leaderboard.forEach((item) => {
        leaderboard.push(<UserPoint firstName={item.firstName} lastName={item.lastName} points={item.points}/>);
      });
    }

    return (<div className="leaderboard">
      <h2>Leaderboard</h2>
      <ul>
        {leaderboard || ""}
      </ul>
    </div>)
  }
}


export default Leaderboard;
