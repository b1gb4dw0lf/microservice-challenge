import React from 'react';
import axios from 'axios';

import './Scroller.less';


class Scroller extends React.Component {

  constructor(props) {
    super(props);
    this.state = {rules: []};
  }

  componentWillMount() {
    axios.get('/api/badge')
      .then((res) => {
        console.log(res);
        let allBadges = res.data;
        let rules = [];

        allBadges.forEach((item) => {
          if (item.type == 'scrollable') {
            rules.push(item.percent);
            this.setState({rules: rules});
          }
        });

        window.addEventListener("scroll", () => {
            let amountScrolled = this.amountScrolled();
            if(this.state.rules.indexOf(amountScrolled) != -1) {
              console.log('hey');
              axios.post('/api/logger', {path: window.location.pathname, type: 'scroll', amount: amountScrolled})
                .then((res) => console.log(res))
                .catch((error) => console.log(error));
            }

        }, false)
      })
      .catch((error) => console.log(error));
  }


  amountScrolled() {
    let winheight= window.innerHeight;
    let docheight = Math.max(document.body.scrollHeight, document.body.offsetHeight);
    let trackLength = docheight - winheight;
    return Math.floor(window.pageYOffset/trackLength * 100);
  }

  render() {
    return null;
  }
}


export default Scroller;
