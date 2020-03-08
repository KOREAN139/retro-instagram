import React from 'react';
import './index.scss';
import Button from '../button';
import minIcon from '../../static/minimize-button.png';
import maxIcon from '../../static/maximize-button.png';
import closeIcon from '../../static/close-button.png';

interface TitleBarProps {
}

export type Props = TitleBarProps & React.HTMLAttributes<HTMLDivElement>;

const TitleBar: React.FC<Props> = (props) => {
  const handleMinimize = () => {
    const electron = window.require('electron');
    const ipcRenderer  = electron.ipcRenderer;
    ipcRenderer.send('minimize-app');
  }

  const handleMaximize = () => {
    // do not support maximize
    // TODO: unable maximize-button
  }

  const handleClose = () => {
    const electron = window.require('electron');
    const ipcRenderer  = electron.ipcRenderer;
    ipcRenderer.send('close-app');
  }

  return (
    <div className={'Title-bar'}>
      <div className={'Title-bar__Icon'}/>
      <div className={'Title-bar__Title'}>
        <div className={'Title-bar__Title__Text'}>
          Instagram.exe
        </div>
        <div className={'Title-bar__Title__Buttons'}>
          <Button
            location={'Title-bar'}
            id={'Title-bar__minimize-button'}
            icon={minIcon}
            onClick={handleMinimize}
          />
          <Button
            location={'Title-bar'}
            id={'Title-bar__maximize-button'}
            icon={maxIcon}
            onClick={handleMaximize}
          />
          <Button
            location={'Title-bar'}
            id={'Title-bar__close-button'}
            icon={closeIcon}
            onClick={handleClose}
          />
        </div>
      </div>
    </div>
  );
};

export default TitleBar;
