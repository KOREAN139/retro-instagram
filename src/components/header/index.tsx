import React, { useCallback } from 'react';
import Button from '@components/button';
import './index.scss';
import { useHistory } from 'react-router-dom';

interface HeaderProps {
  title: string
  backButton?: boolean
  reloadButton?: boolean
}

export type Props = HeaderProps & React.HTMLAttributes<HTMLDivElement>;

const Header: React.FC<Props> = (props) => {
  const { title, backButton, reloadButton } = props;
  const history = useHistory();

  const onClickBackButton = useCallback(() => {
    history.goBack();
  }, []);

  return (
    <div className={'Header'}>
      <div className={'Header__Button-holder'}>
        {backButton &&
          <Button
            text={'Back'}
            onClick={onClickBackButton}
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
