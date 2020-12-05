import './index.scss';

import classNames from 'classnames';
import React, { useRef } from 'react';

interface ButtonProps {
  icon?: string;
  location?: string;
  selected?: boolean;
  disabled?: boolean;
  text?: string;
  onClick?: () => void;
}

export type Props = ButtonProps & React.HTMLAttributes<HTMLDivElement>;

const Button: React.FC<Props> = (props: Props) => {
  const { selected, icon, location, text, disabled, onClick } = props;
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    buttonRef.current!.focus();
    if (onClick) {
      onClick();
    }
  };

  return (
    <div
      className={classNames(
        'Button',
        { Able: !disabled },
        { Disabled: disabled },
        { Selected: !disabled && selected },
        location
      )}
      role='button'
      tabIndex={0}
      ref={buttonRef}
      onClick={handleClick}
      onKeyUp={() => {}}
    >
      {icon && (
        <div
          className={classNames(
            'Button__Icon',
            { Able: !disabled },
            { Disabled: disabled }
          )}
          style={{
            backgroundRepeat: 'no-repeat',
            backgroundImage: `url('${icon}')`,
          }}
        />
      )}
      {text}
    </div>
  );
};

export default Button;
