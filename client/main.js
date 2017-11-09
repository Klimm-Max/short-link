import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import createHistory from 'history/createBrowserHistory';

import SignUp from '../imports/ui/SignUp';
import Link from '../imports/ui/Link';
import NotFound from '../imports/ui/NotFound';

const browserHistory = createHistory();

const routes = (
  <Router history={browserHistory}>
    <Route path="/signup" component={SignUp}/>
    <Route path="/links" component={Link}/>
    <Route path="*" component={NotFound} />
  </Router>
);

Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById('app'));
});