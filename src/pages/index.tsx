import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import TitleBar from '../components/title-bar';
import MenuBar from '../components/menu-bar';
import User from './user';

const RootPage = () => (
  <>
    <TitleBar />
    <MenuBar />
    <BrowserRouter>
      <User />
    </BrowserRouter>
  </>
);

export default RootPage;
