import React from 'react';
import { Link } from 'react-router-dom';

export default class Login extends React.Component {

  render() {
    return(
      <form>
        <input placeholder="E-Mail" />
        <input placeholder="Password" />
        <Link to="/signup">Need an Account?</Link>
      </form>
    );
  }

}