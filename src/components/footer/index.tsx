import React from 'react';
import './index.scss';
import Button from '../../components/button';
import homeFeedIcon from '../../static/home-feed-icon.png';
import exploreIcon from '../../static/explore-icon.png';
import cameraIcon from '../../static/camera-icon.png';
import likesIcon from '../../static/likes-icon.png';
import userIcon from '../../static/user-icon.png';

interface FooterProps {
}

export type Props = FooterProps & React.HTMLAttributes<HTMLDivElement>;

const Footer: React.FC<Props> = (props) => {
  return (
    <div className={'Footer'}>
      <div className={'Footer__Pages'}>
        <Button
          location={'Footer Home-feed'}
          icon={homeFeedIcon}
        />
        <Button
          location={'Footer Explore'}
          icon={exploreIcon}
        />
        <Button
          location={'Footer Camera'}
          icon={cameraIcon}
        />
        <Button
          location={'Footer Likes'}
          icon={likesIcon}
        />
        <Button
          location={'Footer User'}
          icon={userIcon}
        />
      </div>
    </div>
  );
};

export default Footer;

