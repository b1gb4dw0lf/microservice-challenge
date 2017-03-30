import React from 'react';
import axios from 'axios';

import './Clicker.less';


class Clicker extends React.Component {

  click() {
    axios.post('/api/logger', {path: window.location.pathname, type: 'click'})
      .then((res) => {
        return;
      })
      .catch((error) => console.log(error));
  }

  render() {
    return (<div className="clicker">
      <button onClick={this.click}>Click</button>
    </div>)
  }
}


export default Clicker;
