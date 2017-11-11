import React from 'react';
import { withRouter } from 'react-router-dom';

export default class Button extends React.Component {
  
  render() {
    const Button = withRouter(({ history }) => (
      <button
        type='button'
        onClick={() => { history.push(this.props.location) }}
      >
        {this.props.buttonText}
      </button>
    ))

    return <Button/>
  }

}