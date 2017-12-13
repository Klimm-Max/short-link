import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import { browserHistory } from '../../client/main';

import { Links } from '../api/links';

class Link extends React.Component {
  
  onLogout() {
    Accounts.logout();
  }

  componentDidMount() {
    if (!Meteor.userId()) {
      browserHistory.replace('/');
    }
  }

  onSubmit(e) {
    const url = this.refs.url.value.trim();

    e.preventDefault();

    if (url) {
      Links.insert({ url });
      this.refs.url.value = '';
    }
  }

  render() {
    return(
      <div>
        <h1>Links:</h1>
        <button onClick={this.onLogout.bind(this)} >Logout</button>
        <p>Add Link</p>
        <form onSubmit={this.onSubmit.bind(this)}>
          <input type="text" ref="url" placeholder="URL"></input>
          <button>Add Link</button>
        </form>
      </div>
    );
  }

}

export default Link;