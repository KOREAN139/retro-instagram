import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import User from './user';

const RootPage = () => (
  <BrowserRouter>
    <User />
  </BrowserRouter>
);

export default RootPage;
