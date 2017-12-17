import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import Clipboard from 'clipboard';
import moment from 'moment';

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
      alert('Copy was not successfull');
    });
  }

  componentWillUnmount() {
    this.clipboard.destroy();
  }

  renderStats() {
    const { visitedCount, lastVisitedAt } = this.props;
    const visitMessage = visitedCount === 1 ? 'visit' : 'visits';
    let visitedMessage = null;
    
    if (typeof lastVisitedAt === 'number') {
      visitedMessage = `- (visited ${ moment(lastVisitedAt).fromNow() })`;
    }

    return <p>{visitedCount} {visitMessage} {visitedMessage}</p>
  }
  
  render() {
    const { shortUrl, url, _id, visible } = this.props;
    return(
      <div>
        <p>{url}</p>
        <p>{shortUrl}</p>
        {this.renderStats()}

        <button ref="copy" data-clipboard-text={shortUrl}>
          { this.state.justCopied ? 'Copied' : 'Copy' }
        </button>
        <button onClick={() => Meteor.call('links.setVisibility', _id, !visible)}>
          { this.props.visible ? 'Hide' : 'Unhide' }
        </button>
      </div>
    );
  }

}

LinksListItem.PropTypes = {
  _id: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  shortUrl: PropTypes.string.isRequired,
  visitedCounter: PropTypes.number.isRequired,
  lastVisitedAt: PropTypes.number
}