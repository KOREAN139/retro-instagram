import React, { useState } from 'react';
import './index.scss';
import Button from '../../components/button';

const User = () => {
  const [selected, setSelected] = useState(false);
  const handleOnClick = () => {
    setSelected(!selected);
  }

  return (
    <div className={'Userpage-container'}>
      <div className={'Userpage-container__Contents'}>
        User Page
        <Button
          selected={selected}
          onClick={handleOnClick}
        />
      </div>
    </div>
  );
};

export default User;
