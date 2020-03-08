import React from 'react';
import classNames from 'classnames';
import './index.scss';

interface ButtonProps {
  icon?: string
  location?: string
  selected?: boolean
}

export type Props = ButtonProps & React.HTMLAttributes<HTMLDivElement>;

const Button: React.FC<Props> = (props) => {
  const { selected } = props;

  return (
    <div
      className={classNames(
        'Button',
        { 'Button__Selected': selected },
        props.location,
      )}
    >
      {props.icon &&
        <img
          alt=""
          src={props.icon}
        />}
      {props.children}
    </div>
  );
};

export default Button;
