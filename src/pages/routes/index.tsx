import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import PageContainer from '@components/page-container';
import HomeFeed from '@pages/home-feed';
import Explore from '@pages/explore';
import Camera from '@pages/camera';
import News from '@pages/news';
import User from '@pages/user';
import UserScroll from '@pages/user/scroll';
import SignIn from '@pages/sign-in';
import Loading from '@pages/loading';
import {
  ROUTE_HOME_FEED,
  ROUTE_EXPLORE,
  ROUTE_CAMERA,
  ROUTE_NEWS,
  ROUTE_USER,
  ROUTE_USER_SCROLL
} from './constants';

const Routes: React.FC = () => {
  const [signedIn, setSignedIn] = useState(false);

  const handleClose = () => {
    setSignedIn(true);
  }

  return (
    <>
      {!signedIn &&
        <SignIn
          onClickClose={handleClose}
        />}
      <Loading />
      <PageContainer>
        <Switch>
          <Route exact path={ROUTE_HOME_FEED} component={HomeFeed} />
          <Route exact path={ROUTE_EXPLORE} component={Explore} />
          <Route exact path={ROUTE_CAMERA} component={Camera} />
          <Route exact path={ROUTE_NEWS} component={News} />
          <Route exact path={ROUTE_USER} component={User} />
          <Route exact path={ROUTE_USER_SCROLL} component={UserScroll} />
        </Switch>
      </PageContainer>
    </>
  );
};

export default Routes;
