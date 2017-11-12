import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import { browserHistory } from '../../client/main';

class Link extends React.Component {
  
  onLogout() {
    Accounts.logout();
  }

  componentDidMount() {
    if (!Meteor.userId()) {
      browserHistory.replace('/');
    }
  }

  render() {
    return(
      <div>
        <h1>Link</h1>
        <button onClick={this.onLogout.bind(this)} >Logout</button>
      </div>
    );
  }

}

export default Link;