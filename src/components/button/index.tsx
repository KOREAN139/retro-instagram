import React from 'react';
import classNames from 'classnames';
import './index.scss';

interface ButtonProps {
  icon?: string
  location?: string
  selected?: boolean
  disabled?: boolean
  text?: string
}

export type Props = ButtonProps & React.HTMLAttributes<HTMLDivElement>;

const Button: React.FC<Props> = (props) => {
  const { selected, icon, text, disabled, ...otherProps } = props;

  return (
    <div
      className={classNames(
        'Button',
        { 'Able': !disabled },
        { 'Disabled': disabled },
        { 'Selected': !disabled && selected },
        props.location,
      )}
      {...otherProps}
    >
      {icon &&
        <div
          className={classNames(
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
