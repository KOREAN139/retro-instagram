import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import PageContainer from '../../components/page-container';
import HomeFeed from '../home-feed';
import Explore from '../explore';
import Camera from '../camera';
import Likes from '../likes';
import User from '../user';
import SignIn from '../sign-in';
import {
  ROUTE_HOME_FEED,
  ROUTE_EXPLORE,
  ROUTE_CAMERA,
  ROUTE_LIKES,
  ROUTE_USER
} from './constants';

const Routes: React.FC = () => {
  const [signedIn, setSignedIn] = useState(false);

  const onClickSubmit = () => {
    setSignedIn(true);
  }

  return (
    <>
      {!signedIn &&
        <SignIn
          onSubmit={onClickSubmit}
        />}
      <PageContainer>
        <Switch>
          <Route exact path={ROUTE_HOME_FEED} component={HomeFeed} />
          <Route exact path={ROUTE_EXPLORE} component={Explore} />
          <Route exact path={ROUTE_CAMERA} component={Camera} />
          <Route exact path={ROUTE_LIKES} component={Likes} />
          <Route exact path={ROUTE_USER} component={User} />
        </Switch>
      </PageContainer>
    </>
  );
};

export default Routes;
