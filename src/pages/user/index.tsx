import React, { useState, useEffect, useRef } from 'react';
import './index.scss';
import Button from '@components/button';
import Page from '@components/page';
import PixelImage from '@components/pixel-image';
import moreIcon from '@static/more-button.png';
import gridIcon from '@static/grid-icon.png';
import scrollIcon from '@static/scroll-icon.png';
import locationIcon from '@static/location-icon.png';
import tagIcon from '@static/tag-icon.png';
import { RootState } from '@store';
import { useDispatch, useSelector } from 'react-redux';
import { getSignedInUserInfo, getUserPosts } from '@ducks/instagram';

const User = () => {
  const dispatch = useDispatch();
  const [currentCategory, setCurrentCategory] = useState('grid');
  let infoExists = false;
  let pixelizedProfile = false;

  const userPk: number = useSelector(
    (state: RootState) => state.instagram.userPk
  );

  const userInfo: any = useSelector(
    (state: RootState) => state.instagram.userInfo
  );
  let infoLoaded = true;
  if (userInfo) {
    infoLoaded = !!userInfo.profilePicture.pixelizedMediaUrl;
  }

  const userPostInfo = useSelector(
    (state: RootState) => state.instagram.userPostInfo
  );
  const { moreAvailable, posts } = userPostInfo;
  const postLoaded = posts.every(post => {
    return !!post.pixelizedMediaUrl;
  });

  const containerRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    dispatch(getSignedInUserInfo(userPk));
  }, [dispatch, userPk]);

  useEffect(() => {
    const onIntersect = ([{ isIntersecting }]: IntersectionObserverEntry[]) => {
      if (isIntersecting && moreAvailable) {
        dispatch(getUserPosts(userPk));
      }
    };

    const observer = new IntersectionObserver(onIntersect, {
      root: containerRef.current,
      threshold: 1.0,
    });

    observer.observe(bottomRef.current!);

    return () => {
      observer.disconnect();
    };
  }, [dispatch, containerRef, bottomRef, userPk, moreAvailable]);

  if (userInfo) {
    const exist = userInfo.fullName
                  || userInfo.biography
                  || userInfo.externalUrl
                  || false;
    infoExists = !!exist;
    pixelizedProfile = !!userInfo.profilePicture.pixelizedMediaUrl;
  }

  const onClickProfileLink = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const { shell } = window.require('electron');
    let link = userInfo.externalUrl;
    shell.openExternal(link);
  };

  const onClickGrid = () => {
    setCurrentCategory('grid');
  };

  const onClickScroll = () => {
    setCurrentCategory('scroll');
  };

  const onClickLocation = () => {
    setCurrentCategory('location');
  };

  const onClickTagged = () => {
    setCurrentCategory('tagged');
  };

  return (
    <Page
      title={userInfo ? userInfo.username : 'Username'}
      loaded={infoLoaded && postLoaded}
    >
      <div className={'Userpage-container'}>
        <div className={'Userpage-container__Userinfo'}>
          <div className={'Userpage-container__Userinfo__Profile'}>
            <div
              className={'Userpage-container__Userinfo__Profile__Picture'}
            >
              {userInfo &&
                <PixelImage
                  type={'user-profile'}
                  source={pixelizedProfile ?
                    userInfo.profilePicture.pixelizedMediaUrl :
                    userInfo.profilePicture.mediaUrl}
                  centered={true}
                  pixelized={pixelizedProfile}
                />}
            </div>
              <div className={'Userpage-container__Userinfo__Profile__Follow'}>
                <div className={'Userpage-container__Userinfo__Profile__Follow__Numbers'}>
                  <div className={'Userpage-container__Userinfo__Profile__Follow__Numbers Number'}>
                    <div>
                      <b>{userInfo ? userInfo.mediaCount : 1}</b>
                    </div>
                    <div>
                      posts
                    </div>
                  </div>
                  <div className={'Userpage-container__Userinfo__Profile__Follow__Numbers Number'}>
                    <div>
                      <b>{userInfo ? userInfo.followerCount : 3}</b>
                    </div>
                    <div>
                      followers
                    </div>
                  </div>
                  <div className={'Userpage-container__Userinfo__Profile__Follow__Numbers Number'}>
                    <div>
                      <b>{userInfo ? userInfo.followingCount : 9}</b>
                    </div>
                    <div>
                      following
                    </div>
                  </div>
              </div>
              <div className={'Userpage-container__Userinfo__Profile__Follow__Buttons'}>
                <Button
                  location={'Follow'}
                  text={'+ Follow'}
                />
                <Button
                  location={'Follow More'}
                  icon={moreIcon}
                />
              </div>
            </div>
          </div>
          {infoExists &&
            <div className={'Userpage-container__Userinfo__Description'}>
              {userInfo.fullName &&
                <div className={'Userpage-container__Userinfo__Description__Name'}>
                  {userInfo.fullName}
                </div>}
              {userInfo.biography &&
                <div className={'Userpage-container__Userinfo__Description__Bio'}>
                  {userInfo.biography}
                </div>}
              {userInfo.externalUrl &&
                <div className={'Userpage-container__Userinfo__Description__Website'}>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={userInfo.externalUrl}
                    onClick={onClickProfileLink}
                  >
                    {userInfo.externalUrl}
                  </a>
                </div>}
            </div>}
        </div>
        <div className={'Userpage-container__Contents'}>
          <div className={'Userpage-container__Contents__Categories'}>
            <Button
              location={'User-contents-category'}
              icon={gridIcon}
              selected={currentCategory === 'grid'}
              onClick={onClickGrid}
            />
            <Button
              location={'User-contents-category'}
              icon={scrollIcon}
              selected={currentCategory === 'scroll'}
              onClick={onClickScroll}
            />
            <Button
              location={'User-contents-category'}
              icon={locationIcon}
              selected={currentCategory === 'location'}
              onClick={onClickLocation}
            />
            <Button
              location={'User-contents-category'}
              icon={tagIcon}
              selected={currentCategory === 'tagged'}
              onClick={onClickTagged}
            />
          </div>
          <div className={'Userpage-container__Contents__Box'}>
            <div
              className={'Userpage-container__Contents__Box__Scrollable'}
              ref={containerRef}
            >
              {posts.length > 0 && posts.map((post, i) => {
                const { mediaUrl, pixelizedMediaUrl } = post;
                const source = pixelizedMediaUrl ? pixelizedMediaUrl : mediaUrl;
                return (
                  <PixelImage
                    type={'user-thumbnail'}
                    source={source}
                    centered={true}
                    pixelized={!!pixelizedMediaUrl}
                    index={i}
                    key={i}
                  />
                );
              })}
              <div
                className={'Userpage-container__Contents__Box__Scrollable__Bottom'}
                ref={bottomRef}
              />
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default User;
