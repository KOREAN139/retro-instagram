import React, { useRef } from 'react';
import classNames from 'classnames';
import './index.scss';

interface ButtonProps {
  icon?: string
  location?: string
  selected?: boolean
  disabled?: boolean
  text?: string
  onClick?: () => void
}

export type Props = ButtonProps & React.HTMLAttributes<HTMLDivElement>;

const Button: React.FC<Props> = (props) => {
  const { selected, icon, text, disabled, onClick, ...otherProps } = props;
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
        { 'Able': !disabled },
        { 'Disabled': disabled },
        { 'Selected': !disabled && selected },
        props.location,
      )}
      tabIndex={0}
      ref={buttonRef}
      onClick={handleClick}
      {...otherProps}
    >
      {icon &&
        <div
          className={classNames(
            'Button__Icon',
            { 'Able': !disabled },
            { 'Disabled': disabled },
          )}
          style={{
            backgroundRepeat: 'no-repeat',
            backgroundImage: `url('${icon}')`
          }}
        />}
      {props.children}
      {text}
    </div>
  );
};

export default Button;
