import React from 'react';
import './index.scss';

interface HeaderProps {
  title: string
}

export type Props = HeaderProps & React.HTMLAttributes<HTMLDivElement>;

const Header: React.FC<Props> = (props) => {
  return (
    <div className={'Header'}>
      {props.title}
    </div>
  );
};

export default Header;
