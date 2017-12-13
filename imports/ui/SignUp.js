import React from 'react';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { browserHistory } from '../../client/main';

export default class SignUp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: ''
    };
  }

  componentDidMount() {
    if (Meteor.userId()) {
      browserHistory.replace('/links')
    }
  }

  onSubmit(e) {
    e.preventDefault();

    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();

    if (password.length < 6) {
      return this.setState({error: 'Password must be more than 6 characters long'});
    }

    Accounts.createUser({email, password}, (err) => {
      if (err) {
        this.setState({error: err.reason});
      } else {
        this.setState({error: ''});
      }
    });
  }

  render() {
    return(
      <div>
        <h1>Join Short-Lnk</h1>

        {this.state.error ? <p>{this.state.error}</p> : undefined}

        <form onSubmit={this.onSubmit.bind(this)} noValidate >
          <input name="email" ref="email" type="email" placeholder="E-Mail"/>
          <input name="password" ref="password" type="password" placeholder="Password"/>
          <button>Create Account</button>
        </form>
        
        <Link to="/">Allready have an Account?</Link>
      </div>
    );
  }

}