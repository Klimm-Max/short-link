import React from 'react';
import Button from './components/Button';

class Link extends React.Component {
  
  render() {

    return(
      <div>
        <h1>Link</h1>
        <Button location="/" buttonText="Logout"/>
      </div>
    );
  }

}

export default Link;