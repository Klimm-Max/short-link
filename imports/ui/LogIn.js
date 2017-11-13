import React from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from '../../client/main';

export default class Login extends React.Component {

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

    Meteor.loginWithPassword({email}, password, (err) => { 
      if (err) {
        this.setState({ error: 'Unable to Login. Check email and password.' });
      } else {
        this.setState({ error: '' });
      }
    });
  }

  render() {
    return(
      <div>
        <h1>Login to Short-Lnk</h1>
        
        {this.state.error ? <p>{this.state.error}</p> : undefined}
        
        <form onSubmit={this.onSubmit.bind(this)}>
          <input name="email" ref="email" type="email" placeholder="E-Mail"/>
          <input name="password" ref="password" type="password" placeholder="Password"/>
          <button>Login</button>
        </form>

        <Link to="/signup">Need an Account?</Link>
      </div>
    );
  }

}