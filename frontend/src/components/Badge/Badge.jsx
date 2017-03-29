import React from 'react';

import './Badge.less';

class Badge extends React.Component {
  render() {
    return <div className="badge">
      <img src={this.props.url}/>
      <span>{this.props.name || "Locked"}</span>
    </div>
  }
}


export default Badge;
