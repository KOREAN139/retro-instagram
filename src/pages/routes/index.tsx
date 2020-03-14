import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomeFeed from '../home-feed';
import User from '../user';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path={'/'} component={HomeFeed} />
      <Route exact path={'/user'} component={User} />
    </Switch>
  );
};

export default Routes;
