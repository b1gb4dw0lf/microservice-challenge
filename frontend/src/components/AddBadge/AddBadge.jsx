import React from 'react';
import axios from 'axios';


class AddUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      slug: '',
      type: '',
      amount: '',
      error: '',
      success: ''
    }

    this.handleNameChangeEvent = this.handleNameChangeEvent.bind(this);
    this.handleSlugChangeEvent = this.handleSlugChangeEvent.bind(this);
    this.handleTypeChangeEvent = this.handleTypeChangeEvent.bind(this);
    this.handleAmountChangeEvent = this.handleAmountChangeEvent.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChangeEvent(event) {
    this.setState({name: event.target.value});
  }

  handleSlugChangeEvent(event) {
    this.setState({slug: event.target.value});
  }

  handleTypeChangeEvent(event) {
    this.setState({type: event.target.value});
  }

  handleAmountChangeEvent(event) {
    this.setState({amount: event.target.value});
  }

  handleSubmit(event) {
    axios.post('/api/user', {
      name: this.state.email,
      slug: this.state.firstName,
      type: this.state.lastName,
      amount: this.state.password
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
      <h3>Add Badge</h3>
      <div className="input-container">
        <label>Name</label>
        <input type="text" name="name" onChange={this.handleNameChangeEvent} value={this.state.name}/>
      </div>
      <div className="input-container">
        <label>Slug</label>
        <input type="text" name="slug" onChange={this.handleSlugChangeEvent} value={this.state.slug}/>
      </div>
      <div className="input-container">
        <label>Type</label>
        <select onChange={this.handleTypeChangeEvent} value={this.state.type}>
          <option value="scrollable">Scrollable</option>
          <option value="clickable">Clickable</option>
        </select>
      </div>
      <div className="input-container">
        <label>Amount</label>
        <input type="number" name="amount" onChange={this.handleAmountChangeEvent} value={this.state.amount}/>
      </div>
      <input type="submit" onClick={this.handleSubmit} value="Add User"/>
    </div>);
  }
}


export default AddUser;
