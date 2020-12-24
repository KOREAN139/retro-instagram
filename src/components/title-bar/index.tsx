/** @jsx jsx */
import Button from '@components/button';
import Icon from '@components/icon';
import { css, jsx } from '@emotion/react';
import closeIcon from '@static/close-button.png';
import cursor from '@static/cursor.png';
import instagramIconWithShadow from '@static/instagram-icon-with-shadow.png';
import maxIcon from '@static/maximize-button.png';
import minIcon from '@static/minimize-button.png';
import React from 'react';

interface TitleBarProps {
  location: string;
  displayIcon: boolean;
  title?: string;
  onClickClose?: () => void;
}

export type Props = TitleBarProps & React.HTMLAttributes<HTMLDivElement>;

const { ipcRenderer } = window;

const disabledButtonIconStyle = css`
  width: 100%;
  height: 100%;
  background-position: 40% 40%;
  background-size: 11px 11px;
  opacity: 0.3;
`;

const buttonIconStyle = css`
  ${disabledButtonIconStyle}
  opacity: 1;

  &:active {
    background-position: 50% 50%;
  }
`;

const TitleBar: React.FC<Props> = (props: Props) => {
  const { onClickClose, location, title, displayIcon } = props;
  const onRootPage = location === 'Root';

  const handleMinimize = () => {
    ipcRenderer.callMain('minimize-app');
  };

  const handleClose = () => {
    ipcRenderer.callMain('close-app');
  };

  return (
    <div
      className='Title-bar'
      css={css`
        display: flex;
        height: 22px;
        background: rgb(2, 0, 125);
        background: linear-gradient(
          90deg,
          rgba(2, 0, 125, 1) 0%,
          rgba(0, 0, 127, 1) 58%,
          rgba(0, 0, 131, 1) 100%
        );
        -webkit-app-region: drag;
        -webkit-user-select: none;
      `}
    >
      {displayIcon && (
        <Icon
          icon={instagramIconWithShadow}
          customStyle={css`
            width: 18px;
            height: 22px;
            margin-left: 4px;
          `}
        />
      )}
      <div
        className='Title-bar__Title'
        css={css`
          display: flex;
          width: 100%;
          justify-content: space-between;
          margin-left: 3px;
        `}
      >
        <div
          className='Title-bar__Title__Text'
          css={css`
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 13px;
            font-weight: bolder;
          `}
        >
          {onRootPage ? 'Instagram.exe' : title}
        </div>
        <div
          className='Title-bar__Title__Buttons'
          css={css`
            display: flex;
            padding: 3px 2px 1px 2px;

            .Button {
              width: 18px;
              height: 18px;
              cursor: url(${cursor}), auto;
            }

            > .Button:last-child {
              margin-left: 2px;
            }
          `}
        >
          {onRootPage && (
            <Button id='Minimize' onClick={handleMinimize}>
              <Icon icon={minIcon} customStyle={buttonIconStyle} />
            </Button>
          )}
          {onRootPage && (
            <Button id='Maximize' disabled>
              <Icon icon={maxIcon} customStyle={disabledButtonIconStyle} />
            </Button>
          )}
          <Button id='Close' onClick={onRootPage ? handleClose : onClickClose}>
            <Icon icon={closeIcon} customStyle={buttonIconStyle} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TitleBar;
