import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import PropTypes from 'prop-types';

export default class Header extends React.Component {

  onLogout() {
    Accounts.logout();
  }

  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <button onClick={this.onLogout.bind(this)} >Logout</button>
      </div>
    );
  }

}

Header.propTypes = {
  title: PropTypes.string.isRequired,
}