import React from 'react';
import './index.scss';

const User = () => {
  return (
    <div className={'Userpage-container'}>
      <div className={'Userpage-container__Username'}>
        Username
      </div>
      <div className={'Userpage-container__Userinfo'}>
        Info comes here
      </div>
      <div className={'Userpage-container__Contents'}>
        Contents comes here
      </div>
    </div>
  );
};

export default User;
