import React from 'react';
import './index.scss';

interface TitleBarProps {
}

export type Props = TitleBarProps & React.HTMLAttributes<HTMLDivElement>;

const TitleBar: React.FC<Props> = (props) => {
  return (
    <div className={'Title-bar'}>
      <div className={'Title-bar__icon'}/>
      <div className={'Title-bar__title'}>
        Instagram.exe
      </div>
      <div className={'Title-bar__buttons'}/>
    </div>
  );
};

export default TitleBar;
