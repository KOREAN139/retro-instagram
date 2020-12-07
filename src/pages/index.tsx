import Footer from '@components/footer';
import MenuBar from '@components/menu-bar';
import TitleBar from '@components/title-bar';
import Routes from '@pages/routes';
import { configureStore, history } from '@store';
import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import { Provider } from 'react-redux';

const store = configureStore();

const RootPage = () => (
  <>
    <Provider store={store}>
      <TitleBar displayIcon location='Root' />
      <MenuBar />
      <ConnectedRouter history={history}>
        <Routes />
        <Footer />
      </ConnectedRouter>
    </Provider>
  </>
);

export default RootPage;
