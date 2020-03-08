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
            icon={minIcon}
          />
          <Button
            location={'Title-bar'}
            icon={maxIcon}
          />
          <Button
            location={'Title-bar'}
            icon={closeIcon}
          />
        </div>
      </div>
    </div>
  );
};

export default TitleBar;
