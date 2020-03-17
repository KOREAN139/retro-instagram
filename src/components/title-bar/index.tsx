import React from 'react';
import './index.scss';
import Button from '../button';
import minIcon from '../../static/minimize-button.png';
import maxIcon from '../../static/maximize-button.png';
import closeIcon from '../../static/close-button.png';

interface TitleBarProps {
  location: string
  title?: string
  onClickClose?: () => void
}

export type Props = TitleBarProps & React.HTMLAttributes<HTMLDivElement>;

const { ipcRenderer } = window;

const TitleBar: React.FC<Props> = (props) => {
  const { onClickClose, location, title } = props;
  const onRootPage = location === 'Root';

  const handleMinimize = () => {
    ipcRenderer.callMain('minimize-app');
  }

  const handleClose = () => {
    ipcRenderer.callMain('close-app');
  }

  return (
    <div className={'Title-bar'}>
      <div className={'Title-bar__Icon'}/>
      <div className={'Title-bar__Title'}>
        <div className={'Title-bar__Title__Text'}>
          {onRootPage ? 'Instagram.exe' : title}
        </div>
        <div className={'Title-bar__Title__Buttons'}>
          {onRootPage &&
            <Button
              location={'Title-bar'}
              id={'Title-bar__minimize-button'}
              icon={minIcon}
              onClick={handleMinimize}
            />}
          {onRootPage &&
            <Button
              location={'Title-bar'}
              id={'Title-bar__maximize-button'}
              icon={maxIcon}
              disabled
            />}
          <Button
            location={'Title-bar'}
            id={'Title-bar__close-button'}
            icon={closeIcon}
            onClick={onRootPage ? handleClose : onClickClose}
          />
        </div>
      </div>
    </div>
  );
};

export default TitleBar;
