import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomeFeed from '../home-feed';
import Explore from '../explore';
import Camera from '../camera';
import Likes from '../likes';
import User from '../user';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path={'/'} component={HomeFeed} />
      <Route exact path={'/explore'} component={Explore} />
      <Route exact path={'/camera'} component={Camera} />
      <Route exact path={'/likes'} component={Likes} />
      <Route exact path={'/user'} component={User} />
    </Switch>
  );
};

export default Routes;
