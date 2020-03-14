import React, { useState } from 'react';
import './index.scss';
import { useHistory } from 'react-router-dom';
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
  const history = useHistory();
  const [currentPage, setCurrentPage] = useState('home-feed');

  const onClickHomeFeed = () => {
    setCurrentPage('home-feed');
    history.push('/');
  }

  const onClickExplore = () => {
    setCurrentPage('explore');
  }

  const onClickCamera = () => {
    setCurrentPage('camera');
  }

  const onClickLikes = () => {
    setCurrentPage('likes');
  }

  const onClickUser = () => {
    setCurrentPage('user');
    history.push('/user');
  }

  return (
    <div className={'Footer'}>
      <div className={'Footer__Pages'}>
        <Button
          location={'Footer Home-feed'}
          icon={homeFeedIcon}
          selected={currentPage === 'home-feed'}
          onClick={onClickHomeFeed}
        />
        <Button
          location={'Footer Explore'}
          icon={exploreIcon}
          selected={currentPage === 'explore'}
          onClick={onClickExplore}
        />
        <Button
          location={'Footer Camera'}
          icon={cameraIcon}
          selected={currentPage === 'camera'}
          onClick={onClickCamera}
        />
        <Button
          location={'Footer Likes'}
          icon={likesIcon}
          selected={currentPage === 'likes'}
          onClick={onClickLikes}
        />
        <Button
          location={'Footer User'}
          icon={userIcon}
          selected={currentPage === 'user'}
          onClick={onClickUser}
        />
      </div>
    </div>
  );
};

export default Footer;

