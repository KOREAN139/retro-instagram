import React, { useState } from 'react';
import './index.scss';
import Menu, { menuOf, disabledMenuOf } from '@components/menu';

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

  const menus = [
    menuOf('file'),
    menuOf('edit'),
    menuOf('view'),
    disabledMenuOf('option'),
    menuOf('help'),
  ];

  return (
    <div
      className={'Menu-bar'}
      onMouseLeave={handleMouseLeave}
    >
      {menus.map((mutableMenuProps, i) => {
        return (
          <Menu
            { ...mutableMenuProps }
            key={i}
            activated={activated}
            onClick={handleOnClick}
          />
        );
      })}
    </div>
  );
}

export default MenuBar;
