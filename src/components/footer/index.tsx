import './index.scss';

import Button from '@components/button';
import {
  ROUTE_HOME_FEED,
  ROUTE_NEWS,
  ROUTE_USER,
} from '@pages/routes/constants';
import cameraIcon from '@static/camera-icon.png';
import exploreIcon from '@static/explore-icon.png';
import homeFeedIcon from '@static/home-feed-icon.png';
import newsIcon from '@static/news-icon.png';
import userIcon from '@static/user-icon.png';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

interface FooterProps {}

export type Props = FooterProps & React.HTMLAttributes<HTMLDivElement>;

const Footer: React.FC<Props> = () => {
  const history = useHistory();
  const [currentPage, setCurrentPage] = useState('home-feed');

  const onClickHomeFeed = () => {
    setCurrentPage('home-feed');
    history.push(ROUTE_HOME_FEED);
  };

  const onClickExplore = () => {
    // setCurrentPage('explore');
    // history.push(ROUTE_EXPLORE);
  };

  const onClickCamera = () => {
    // setCurrentPage('camera');
    // history.push(ROUTE_CAMERA);
  };

  const onClickNews = () => {
    setCurrentPage('news');
    history.push(ROUTE_NEWS);
  };

  const onClickUser = () => {
    setCurrentPage('user');
    history.push(ROUTE_USER);
  };

  return (
    <div className='Footer'>
      <div className='Footer__Pages'>
        <Button
          location='Footer Home-feed'
          icon={homeFeedIcon}
          selected={currentPage === 'home-feed'}
          onClick={onClickHomeFeed}
        />
        <Button
          location='Footer Explore'
          icon={exploreIcon}
          disabled
          selected={currentPage === 'explore'}
          onClick={onClickExplore}
        />
        <Button
          location='Footer Camera'
          icon={cameraIcon}
          disabled
          selected={currentPage === 'camera'}
          onClick={onClickCamera}
        />
        <Button
          location='Footer News'
          icon={newsIcon}
          selected={currentPage === 'news'}
          onClick={onClickNews}
        />
        <Button
          location='Footer User'
          icon={userIcon}
          selected={currentPage === 'user'}
          onClick={onClickUser}
        />
      </div>
    </div>
  );
};

export default Footer;
