import React from 'react';
import { Link } from 'react-router-dom';

export default class SignUp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: ''
    };
  }

  onSubmit(e) {
    e.preventDefault();

    this.setState({
      error: 'Something went wrong.'
    });
  }

  render() {
    return(
      <div>
        <h1>Join Short-Lnk</h1>

        {this.state.error ? <p>{this.state.error}</p> : undefined}

        <form onSubmit={this.onSubmit.bind(this)}>
          <input name="email" type="email" placeholder="E-Mail"/>
          <input name="password" type="password" placeholder="Password"/>
          <button>Create Account</button>
        </form>
        
        <Link to="/">Allready have an Account?</Link>
      </div>
    );
  }

}