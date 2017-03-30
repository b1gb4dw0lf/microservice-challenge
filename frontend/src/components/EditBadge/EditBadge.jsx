import React from 'react';
import axios from 'axios';


class EditBadge extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      badges: [],
      name: '',
      slug: '',
      type: 'scrollable',
      amount: '',
      percent: '',
      error: '',
      success: ''
    }

    this.handleNameChangeEvent = this.handleNameChangeEvent.bind(this);
    this.handleSlugChangeEvent = this.handleSlugChangeEvent.bind(this);
    this.handleTypeChangeEvent = this.handleTypeChangeEvent.bind(this);
    this.handleAmountChangeEvent = this.handleAmountChangeEvent.bind(this);
    this.handlePercentChangeEvent = this.handlePercentChangeEvent.bind(this);
    this.handleBadgeSelectEvent = this.handleBadgeSelectEvent.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    axios.get('/api/badge')
      .then((res) => {

        let badge = res.data[0];
        this.setState({
          badges: res.data,
          name: badge.name,
          slug: badge.slug,
          type: badge.type,
          amount: badge.amount,
          percent: badge.percent || null
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleBadgeSelectEvent(event) {
    this.state.badges.forEach((badge) => {
      console.log(event.target.value);
      if (badge.slug == event.target.value) {

        this.setState({
          name: badge.name,
          slug: badge.slug,
          type: badge.type,
          amount: badge.amount,
          percent: badge.percent || ''
        })
      }
    })
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

  handlePercentChangeEvent(event) {
    this.setState({percent: event.target.value});
  }

  handleSubmit(event) {
    axios.patch('/api/badge/' + this.state.slug, {
      name: this.state.name,
      slug: this.state.slug,
      type: this.state.type,
      amount: this.state.amount,
      percent: this.state.percent || null
    })
      .then(() => {
        this.setState({
          error: '',
          success: 'Successfully updated badge.'
        });

      })
      .catch((error) => {
        console.log(error);
        this.setState({error: error.message});
      });
  }

  render() {
    let badgeLinks = [];
    if (this.state.badges) {
      this.state.badges.forEach((item, index) => {
        badgeLinks.push(<option key={index} value={item.slug}>{item.name}</option>);
      });
    }

    return (<div className="form">
      <div className="error">{this.state.error || this.state.success}</div>
      <h3>Edit Badge</h3>
      <select onChange={this.handleBadgeSelectEvent}>
        {badgeLinks}
      </select>
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
      <div className="input-container">
        <label>Percent</label>
        <input type="number" name="amount" onChange={this.handlePercentChangeEvent} value={this.state.percent}/>
      </div>
      <input type="submit" onClick={this.handleSubmit} value="Update Badge"/>
    </div>);
  }
}


export default EditBadge;
