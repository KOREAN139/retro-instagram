import React, { useState } from 'react';
import classNames from 'classnames';
import './index.scss';

interface MenuBarProps {
}

export type Props = MenuBarProps & React.HTMLAttributes<HTMLDivElement>;

const MenuBar: React.FC<Props> = (props) => {
  const [activated, setActivated] = useState(false);

  const handleOnClick = () => {
    setActivated(true);
  };

  const handleMouseLeave = () => {
    setActivated(false);
  }

  return (
    <div
      className={'Menu-bar'}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={classNames(
          'Menu-bar__Menu',
          { 'Activated': activated },
        )}
        onClick={handleOnClick}
      >
        <u>F</u>ile
      </div>
      <div
        className={classNames(
          'Menu-bar__Menu',
          { 'Activated': activated },
        )}
        onClick={handleOnClick}
      >
        <u>E</u>dit
      </div>
      <div
        className={classNames(
          'Menu-bar__Menu',
          { 'Activated': activated },
        )}
        onClick={handleOnClick}
      >
        <u>V</u>iew
      </div>
      <div
        className={classNames(
          'Menu-bar__Menu',
          { 'Activated': activated },
        )}
        onClick={handleOnClick}
      >
        <u>O</u>ptions
      </div>
      <div
        className={classNames(
          'Menu-bar__Menu',
          { 'Activated': activated },
        )}
        onClick={handleOnClick}
      >
        <u>H</u>elp
      </div>
    </div>
  );
}

export default MenuBar;
