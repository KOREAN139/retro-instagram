import React from 'react';
import classNames from 'classnames';
import './index.scss';

interface MutableMenuProps {
  name: string
  disabled: boolean
}

interface MenuProps {
  activated: boolean
  name: string
  disabled?: boolean
  onClick: () => void
}

export const menuOf = (name: string): MutableMenuProps => {
  return {
    name,
    'disabled': false,
  };
}

export const disabledMenuOf = (name: string): MutableMenuProps => {
  return {
    name,
    'disabled': true,
  };
}


export type Props = MenuProps & React.HTMLAttributes<HTMLDivElement>;

const Menu: React.FC<Props> = (props) => {
  const { name, activated, disabled, onClick } = props;
  const firstChar = name.charAt(0);
  const nameWithoutFirstChar = name.substring(1);
  return (
    <div
      className={classNames(
        'Menu',
        { 'Activated': !disabled && activated },
        { 'Disabled': disabled },
      )}
      onClick={onClick}
    >
      <u>{firstChar.toUpperCase()}</u>{nameWithoutFirstChar}
    </div>
  );
}

export default Menu;
