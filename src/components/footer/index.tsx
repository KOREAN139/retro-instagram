/** @jsx jsx */
import Button from '@components/button';
import Icon from '@components/icon';
import { css, jsx } from '@emotion/react';
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
    <div
      className='Footer'
      css={css`
        display: flex;
        flex-direction: row;
        flex-basis: 100%;
        margin-top: 1px;
      `}
    >
      <div
        className='Footer__Pages'
        css={css`
          display: flex;
          flex-direction: row;
          flex-basis: 100%;
          .Button {
            flex-basis: 100%;
            height: 26px;
          }

          .Button + .Button {
            margin-left: 1px;
          }
        `}
      >
        <Button
          id='Home-feed'
          selected={currentPage === 'home-feed'}
          onClick={onClickHomeFeed}
        >
          <Icon
            icon={homeFeedIcon}
            selected={currentPage === 'home-feed'}
            customStyle={css`
              flex-basis: 100%;
              height: 26px;
              background-size: 14px 14px;
            `}
          />
        </Button>
        <Button
          id='Explore'
          disabled
          selected={currentPage === 'explore'}
          onClick={onClickExplore}
        >
          <Icon
            icon={exploreIcon}
            disabled
            selected={currentPage === 'explore'}
            customStyle={css`
              flex-basis: 100%;
              height: 26px;
              background-size: 14px 14px;
            `}
          />
        </Button>
        <Button
          id='Camera'
          disabled
          selected={currentPage === 'camera'}
          onClick={onClickCamera}
        >
          <Icon
            icon={cameraIcon}
            disabled
            selected={currentPage === 'camera'}
            customStyle={css`
              flex-basis: 100%;
              height: 26px;
              background-size: 18px 18px;
            `}
          />
        </Button>
        <Button
          id='News'
          selected={currentPage === 'news'}
          onClick={onClickNews}
        >
          <Icon
            icon={newsIcon}
            selected={currentPage === 'news'}
            customStyle={css`
              flex-basis: 100%;
              height: 26px;
              background-size: 14px 14px;
            `}
          />
        </Button>
        <Button
          id='User'
          selected={currentPage === 'user'}
          onClick={onClickUser}
        >
          <Icon
            icon={userIcon}
            selected={currentPage === 'user'}
            customStyle={css`
              flex-basis: 100%;
              height: 26px;
              background-size: 14px 14px;
            `}
          />
        </Button>
      </div>
    </div>
  );
};

export default Footer;
