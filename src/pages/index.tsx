import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { configureStore, history } from '../store';
import TitleBar from '../components/title-bar';
import MenuBar from '../components/menu-bar';
import PageContainer from '../components/page-container';
import Routes from './routes';
import Footer from '../components/footer';

const store = configureStore();

const RootPage = () => (
  <>
    <Provider store={store}>
      <TitleBar />
      <MenuBar />
      <ConnectedRouter history={history}>
        <PageContainer>
          <Routes />
        </PageContainer>
        <Footer />
      </ConnectedRouter>
    </Provider>
  </>
);

export default RootPage;
