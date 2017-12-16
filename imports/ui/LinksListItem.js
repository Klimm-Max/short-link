import React from 'react';
import PropTypes from 'prop-types';
import Clipboard from 'clipboard';

export default class LinksListItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      justCopied: false
    }
  }

  componentDidMount() {
    this.clipboard = new Clipboard(this.refs.copy);

    this.clipboard.on('success', () => {
      this.setState({ justCopied: true });
      setTimeout(() => this.setState({ justCopied: false}), 1500);
    });
    
    this.clipboard.on('error', () => {
      alert('Copy was not successful');
    });
  }

  componentWillUnmount() {
    this.clipboard.destroy();
  }
  
  render() {
    return(
      <div>
        <p>{this.props.url}</p>
        <a href={this.props.shortUrl}>Visit</a>
        <button ref="copy" data-clipboard-text={this.props.shortUrl}>
          { this.state.justCopied ? 'Copied' : 'Copy' }
        </button>
      </div>
    );
  }

}

LinksListItem.PropTypes = {
  _id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  shortUrl: PropTypes.string.isRequired
}