import Button from '@components/button';
import closeIcon from '@static/close-button.png';
import maxIcon from '@static/maximize-button.png';
import minIcon from '@static/minimize-button.png';
import React from 'react';

import './index.scss';

interface TitleBarProps {
  location: string;
  displayIcon: boolean;
  title?: string;
  onClickClose?: () => void;
}

export type Props = TitleBarProps & React.HTMLAttributes<HTMLDivElement>;

const { ipcRenderer } = window;

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
    <div className='Title-bar'>
      {displayIcon && <div className='Title-bar__Icon' />}
      <div className='Title-bar__Title'>
        <div className='Title-bar__Title__Text'>
          {onRootPage ? 'Instagram.exe' : title}
        </div>
        <div className='Title-bar__Title__Buttons'>
          {onRootPage && (
            <Button id='Minimize' icon={minIcon} onClick={handleMinimize} />
          )}
          {onRootPage && <Button id='Maximize' icon={maxIcon} disabled />}
          <Button
            id='Close'
            icon={closeIcon}
            onClick={onRootPage ? handleClose : onClickClose}
          />
        </div>
      </div>
    </div>
  );
};

export default TitleBar;
