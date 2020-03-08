import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import TitleBar from '../components/title-bar';
import User from './user';

const RootPage = () => (
  <>
    <TitleBar />
    <BrowserRouter>
      <User />
    </BrowserRouter>
  </>
);

export default RootPage;
