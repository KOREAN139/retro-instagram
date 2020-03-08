import React from 'react';
import './index.scss';

interface MenuBarProps {
}

export type Props = MenuBarProps & React.HTMLAttributes<HTMLDivElement>;

const MenuBar: React.FC<Props> = (props) => {
  return (
    <div className={'Menu-bar'}>
      <div className={'Menu-bar__Menu'}>
        <u>F</u>ile
      </div>
      <div className={'Menu-bar__Menu'}>
        <u>E</u>dit
      </div>
      <div className={'Menu-bar__Menu'}>
        <u>V</u>iew
      </div>
      <div className={'Menu-bar__Menu'}>
        <u>O</u>ptions
      </div>
      <div className={'Menu-bar__Menu'}>
        <u>H</u>elp
      </div>
    </div>
  );
}

export default MenuBar;
