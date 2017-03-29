import React from 'react';
import axios from 'axios';


class AddUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      error: '',
      success: ''
    }

    this.handleEmailChangeEvent = this.handleEmailChangeEvent.bind(this);
    this.handleFirstNameChangeEvent = this.handleFirstNameChangeEvent.bind(this);
    this.handleLastNameChangeEvent = this.handleLastNameChangeEvent.bind(this);
    this.handlePasswordChangeEvent = this.handlePasswordChangeEvent.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChangeEvent(event) {
    this.setState({email: event.target.value});
  }

  handleFirstNameChangeEvent(event) {
    this.setState({firstName: event.target.value});
  }

  handleLastNameChangeEvent(event) {
    console.log(this.state);
    this.setState({lastName: event.target.value});
  }

  handlePasswordChangeEvent(event) {
    this.setState({password: event.target.value});
  }

  handleSubmit(event) {
    axios.post('/api/user', {
      email: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      password: this.state.password
    })
      .then(() => {
        this.setState({
          error: '',
          success: 'Successfully added user.'
        });

      })
      .catch((error) => {
        console.log(error);
        this.setState({error: error.message});
      });
  }

  render() {
    return (<div className="form">
      <div className="error">{this.state.error || this.state.success}</div>
      <h3>Add User</h3>
      <div className="input-container">
        <label>Email</label>
        <input type="email" name="email" onChange={this.handleEmailChangeEvent} value={this.state.email}/>
      </div>
      <div className="input-container">
        <label>First Name</label>
        <input type="text" name="firstName" onChange={this.handleFirstNameChangeEvent} value={this.state.firstName}/>
      </div>
      <div className="input-container">
        <label>Last Name</label>
        <input type="text" name="lastName" onChange={this.handleLastNameChangeEvent} value={this.state.lastName}/>
      </div>
      <div className="input-container">
        <label>Password</label>
        <input type="password" name="password" onChange={this.handlePasswordChangeEvent} value={this.state.password}/>
      </div>
      <input type="submit" onClick={this.handleSubmit} value="Add User"/>
    </div>);
  }
}


export default AddUser;
