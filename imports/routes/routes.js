import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Switch, Route } from 'react-router';
import createHistory from 'history/createBrowserHistory';

import LogIn from '../ui/LogIn';
import SignUp from '../ui/SignUp';
import Link from '../ui/Link';
import NotFound from '../ui/NotFound';

export const browserHistory = createHistory();
const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/links'];

export const routes = (
  <Router history={browserHistory}>
    <Switch>
      <Route exact path="/" component={LogIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/links" component={Link} />
      <Route path="*" component={NotFound} /> 
    </Switch>
  </Router>
);

export const onAuthChange = (isAuthenticated) => {
  const pathName = browserHistory.location.pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathName);
  const isAuthenticatedPage = authenticatedPages.includes(pathName);

  if (isAuthenticated && isUnauthenticatedPage) {
    browserHistory.replace('/links');
  } else if (!isAuthenticated && isAuthenticatedPage) {
    browserHistory.replace('/');
  }
}
