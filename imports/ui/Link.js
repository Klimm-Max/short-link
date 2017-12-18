import React from 'react';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from '../../client/main';

import Header from './components/Header';
import LinksListFilter from './LinksListFilter';
import LinksList from './LinksList';
import AddLinkForm from './AddLinkForm';

class Link extends React.Component {
  
  componentDidMount() {
    // if there is no logged-in user -> redirect to the root application
    if (!Meteor.userId()) {
      browserHistory.replace('/');
    }
  }

  render() {
    return(
      <div>
        <Header title="Your Links"/>
        <LinksListFilter />
        <AddLinkForm />
        <LinksList />
      </div>
    );
  }

}

export default Link;