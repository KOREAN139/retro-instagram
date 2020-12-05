import './index.scss';

import classNames from 'classnames';
import React from 'react';

interface MutableMenuProps {
  name: string;
  disabled: boolean;
}

interface MenuProps {
  activated: boolean;
  name: string;
  disabled?: boolean;
  onClick: () => void;
}

export const menuOf = (name: string): MutableMenuProps => {
  return {
    name,
    disabled: false,
  };
};

export const disabledMenuOf = (name: string): MutableMenuProps => {
  return {
    name,
    disabled: true,
  };
};

export type Props = MenuProps & React.HTMLAttributes<HTMLDivElement>;

const Menu: React.FC<Props> = (props: Props) => {
  const { name, activated, disabled, onClick } = props;
  const firstChar = name.charAt(0);
  const nameWithoutFirstChar = name.substring(1);
  return (
    <div
      className={classNames(
        'Menu',
        { Activated: !disabled && activated },
        { Disabled: disabled }
      )}
      role='button'
      tabIndex={0}
      onClick={onClick}
      onKeyUp={() => {}}
    >
      <u>{firstChar.toUpperCase()}</u>
      {nameWithoutFirstChar}
    </div>
  );
};

export default Menu;
