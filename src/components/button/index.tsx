import React from 'react';
import classNames from 'classnames';
import './index.scss';

interface ButtonProps {
  selected?: boolean
}

export type Props = ButtonProps & React.HTMLAttributes<HTMLDivElement>;

const Button: React.FC<Props> = (props) => {
  const { selected, ...otherProps } = props;

  return (
    <div
      className={classNames(
        'Button',
        { 'Button__Selected': selected },
      )}
      {...otherProps}
    >
      {props.children}
    </div>
  );
};

export default Button;
