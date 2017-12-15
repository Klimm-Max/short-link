import React from 'react';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';

import { Links } from '../api/links';

class LinksList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      links: []
    }
  }

  componentDidMount() {
    this.linksTracker = Tracker.autorun(() => {
      Meteor.subscribe('links');
      const links = Links.find().fetch();
      this.setState({ links });
    });
  }

  componentWillUnmount() {
    this.linksTracker.stop();
  }

  renderLinksListItems() {
    return this.state.links.map((link) => {
      return <p key={link._id}>{link.url}</p>
    });
  }

  render() {
    return(
      <div>
        <p>LinksList</p>
        <div>
          {this.renderLinksListItems()}
        </div>
      </div>
    );
  }

}

export default LinksList;