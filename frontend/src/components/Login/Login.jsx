import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import './Login.less'

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLoggedIn: false
    }

    this.handleEmailChangeEvent = this.handleEmailChangeEvent.bind(this);
    this.handlePasswordChangeEvent = this.handlePasswordChangeEvent.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChangeEvent(event) {
    this.setState({email: event.target.value});
    console.log(this.state);
  }

  handlePasswordChangeEvent(event) {
    this.setState({password: event.target.value});
    console.log(this.state);
  }

  handleSubmit(event) {
    axios.post('api/sign/in', {
      email: this.state.email,
      password: this.state.password
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  render() {
    if (this.state.isLoggedIn)
      return <Redirect to={this.props.from || "/profile"}/>

    return <div className="main-container">
      <div className="form">
        <div className="input-container">
          <label>Email</label>
          <input name="email" type="email" value={this.state.email} onChange={this.handleEmailChangeEvent}/>
        </div>
        <div className="input-container">
          <label>Password</label>
          <input name="password" type="password" value={this.state.password} onChange={this.handlePasswordChangeEvent}/>
        </div>
        <input type="submit" value="Login" onClick={this.handleSubmit}/>
      </div>
    </div>
  }
}

export default Login;
