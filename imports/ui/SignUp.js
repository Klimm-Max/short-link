import React from 'react';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';

export default class SignUp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: ''
    };
  }

  onSubmit(e) {
    e.preventDefault();

    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();

    Accounts.createUser({email, password}, (err) => {
      console.log('Sign up callback', err)
    })
  }

  render() {
    return(
      <div>
        <h1>Join Short-Lnk</h1>

        {this.state.error ? <p>{this.state.error}</p> : undefined}

        <form onSubmit={this.onSubmit.bind(this)}>
          <input name="email" ref="email" type="email" placeholder="E-Mail"/>
          <input name="password" ref="password" type="password" placeholder="Password"/>
          <button>Create Account</button>
        </form>
        
        <Link to="/">Allready have an Account?</Link>
      </div>
    );
  }

}