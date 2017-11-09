import React from 'react';

export default class Login extends React.Component {

  render() {
    return(
      <form>
        <input placeholder="E-Mail" />
        <input placeholder="Password" />
        <button> Login</button> 
      </form>
    );
  }

}