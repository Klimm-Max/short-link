import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router';
import createHistory from 'history/createBrowserHistory';

import LogIn from '../imports/ui/LogIn';
import SignUp from '../imports/ui/SignUp';
import Link from '../imports/ui/Link';
import NotFound from '../imports/ui/NotFound';

export const browserHistory = createHistory();
const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/links'];

const routes = (
  <Router history={browserHistory}>
    <Switch>
      <Route exact path="/" component={LogIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/links" component={Link} />
      <Route path="*" component={NotFound} /> 
    </Switch>
  </Router>
);

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  const pathName = browserHistory.location.pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathName);
  const isAuthenticatedPage = authenticatedPages.includes(pathName);

  if (isAuthenticated && isUnauthenticatedPage) {
    browserHistory.push('/links');
  } else if (!isAuthenticated && isAuthenticatedPage) {
    browserHistory.push('/');
  }
});

Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById('app'));
});