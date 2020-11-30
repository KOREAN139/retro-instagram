import React from 'react';
import Button from '@components/button';
import './index.scss';

interface HeaderProps {
  title: string
  backButton?: boolean
  reloadButton?: boolean
}

export type Props = HeaderProps & React.HTMLAttributes<HTMLDivElement>;

const Header: React.FC<Props> = (props) => {
  const { title, backButton, reloadButton } = props;
  return (
    <div className={'Header'}>
      <div className={'Header__Button-holder'}>
        {backButton &&
          <Button
            text={'Back'}
          />}
      </div>
      <div className={'Header__Title-holder'}>
        {title}
      </div>
      <div className={'Header__Button-holder'}>
        {reloadButton &&
          <Button
            text={'Reload'}
          />}
      </div>
    </div>
  );
};

export default Header;
