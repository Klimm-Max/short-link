import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import createHistory from 'history/createBrowserHistory';

import SignUp from '../imports/ui/SignUp';
import Link from '../imports/ui/Link';

const browserHistory = createHistory();

const routes = (
  <Router history={browserHistory}>
    <Route path="/signup" component={SignUp}/>
  </Router>
);

Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById('app'));
});