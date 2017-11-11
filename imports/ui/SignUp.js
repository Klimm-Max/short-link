import React from 'react';
import { Link } from 'react-router-dom';

export default class SignUp extends React.Component {

  render() {
    return(
      <div>
        <p>Sing up Stuff</p>
        <Link to="/">Allready have an Account?</Link>
      </div>
    );
  }

}