import './index.scss';

import Menu, { disabledMenuOf, menuOf } from '@components/menu';
import React, { useState } from 'react';

interface MenuBarProps {}

export type Props = MenuBarProps & React.HTMLAttributes<HTMLDivElement>;

const MenuBar: React.FC<Props> = () => {
  const [activated, setActivated] = useState(false);

  const handleOnClick = () => {
    setActivated(true);
  };

  const handleMouseLeave = () => {
    setActivated(false);
  };

  const menus = [
    menuOf('file'),
    menuOf('edit'),
    menuOf('view'),
    disabledMenuOf('option'),
    menuOf('help'),
  ];

  return (
    <div className='Menu-bar' onMouseLeave={handleMouseLeave}>
      {menus.map((mutableMenuProps) => {
        const { name, disabled } = mutableMenuProps;
        return (
          <Menu
            name={name}
            disabled={disabled}
            key={name}
            activated={activated}
            onClick={handleOnClick}
          />
        );
      })}
    </div>
  );
};

export default MenuBar;
