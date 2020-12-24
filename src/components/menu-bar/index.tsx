/** @jsx jsx */
import Menu, { disabledMenuOf, menuOf } from '@components/menu';
import { css, jsx } from '@emotion/react';
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
    <div
      className='Menu-bar'
      onMouseLeave={handleMouseLeave}
      css={css`
        display: flex;
        height: 18px;
        margin-top: 1px;
        margin-bottom: 1px;
      `}
    >
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
