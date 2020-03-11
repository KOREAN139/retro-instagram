import React from 'react';
import classNames from 'classnames';
import './index.scss';

interface ButtonProps {
  icon?: string
  location?: string
  selected?: boolean
  text?: string
}

export type Props = ButtonProps & React.HTMLAttributes<HTMLDivElement>;

const Button: React.FC<Props> = (props) => {
  const { selected, icon, text, ...otherProps } = props;

  return (
    <div
      className={classNames(
        'Button',
        { 'Selected': selected },
        props.location,
      )}
      {...otherProps}
    >
      {icon &&
        <div
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
