import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import TitleBar from '../components/title-bar';
import MenuBar from '../components/menu-bar';
import PageContainer from '../components/page-container';
import User from './user';
import Footer from '../components/footer';

const RootPage = () => (
  <>
    <TitleBar />
    <MenuBar />
    <BrowserRouter>
      <PageContainer>
        <User />
      </PageContainer>
      <Footer />
    </BrowserRouter>
  </>
);

export default RootPage;
