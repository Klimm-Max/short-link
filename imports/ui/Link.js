import React from 'react';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from '../../client/main';

import LinksList from './LinksList';
import Header from './components/Header';
import AddLinkForm from './AddLinkForm';

class Link extends React.Component {
  
  componentDidMount() {
    if (!Meteor.userId()) {
      browserHistory.replace('/');
    }
  }

  render() {
    return(
      <div>
        <Header title="Your Links"/>
        <LinksList />
        <AddLinkForm />
      </div>
    );
  }

}

export default Link;