import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router';
import createHistory from 'history/createBrowserHistory';

import LogIn from '../imports/ui/LogIn';
import SignUp from '../imports/ui/SignUp';
import Link from '../imports/ui/Link';
import NotFound from '../imports/ui/NotFound';

const browserHistory = createHistory();

const routes = (
  <Router history={browserHistory}>
    <Switch>
      <Route exact path="/" component={LogIn}/>
      <Route path="/signup" component={SignUp}/>
      <Route path="/links" component={Link} />
      <Route path="*" component={NotFound} /> 
    </Switch>
  </Router>
);

Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById('app'));
});