/** @jsx jsx */
import Button from '@components/button';
import { css, jsx } from '@emotion/react';
import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

interface HeaderProps {
  title: string;
  backButton?: boolean;
  reloadButton?: boolean;
}

export type Props = HeaderProps & React.HTMLAttributes<HTMLDivElement>;

const Header: React.FC<Props> = (props: Props) => {
  const { title, backButton, reloadButton } = props;
  const history = useHistory();

  const onClickBackButton = useCallback(() => {
    history.goBack();
  }, [history]);

  return (
    <div
      className='Header'
      css={css`
        width: 100%;
        height: 43px;
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: space-between;
      `}
    >
      <div
        className='Header__Button-holder'
        css={css`
          padding: 0 4px;
        `}
      >
        {backButton && (
          <Button
            id='Back'
            text='Back'
            onClick={onClickBackButton}
            customStyle={css`
              height: 26px;
              padding: 0 10px;

              font-size: 15px;
            `}
          />
        )}
      </div>
      <div
        className='Header__Title-holder'
        css={css`
          font-size: 14px;
          font-weight: bolder;
        `}
      >
        {title}
      </div>
      <div
        className='Header__Button-holder'
        css={css`
          padding: 0 4px;
        `}
      >
        {reloadButton && (
          <Button
            id='Reload'
            text='Reload'
            customStyle={css`
              height: 26px;
              padding: 0 10px;

              font-size: 15px;
            `}
          />
        )}
      </div>
    </div>
  );
};

export default Header;
