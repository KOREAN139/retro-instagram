import React, { useState, useCallback, useEffect } from 'react';
import './index.scss';
import Button from '../../components/button';
import Page from '../../components/page';
import PixelImage from '../../components/pixel-image';
import moreIcon from '../../static/more-button.png';
import gridIcon from '../../static/grid-icon.png';
import scrollIcon from '../../static/scroll-icon.png';
import locationIcon from '../../static/location-icon.png';
import tagIcon from '../../static/tag-icon.png';
import { RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { getSignedInUserInfo, getUserPosts } from '../../ducks/instagram';
import { useHistory } from 'react-router-dom';

const User = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [currentCategory, setCurrentCategory] = useState('grid');
  let infoExists = false;

  const userPk: number = useSelector(
    (state: RootState) => state.instagram.userPk
  );

  const userInfo: any = useSelector(
    (state: RootState) => state.instagram.userInfo
  );

  const userPosts = useSelector(
    (state: RootState) => state.instagram.userPosts
  );

  const loadUserInfo = useCallback(async () => {
    await dispatch(getSignedInUserInfo(userPk));
    await dispatch(getUserPosts(userPk));
  }, [dispatch, userPk]);

  useEffect(() => {
    loadUserInfo();
  }, [loadUserInfo, history]);

  if (userInfo) {
    const exist = userInfo['full_name']
      || userInfo['biography']
      || userInfo['external_url']
      || false;
    infoExists = !!exist;
  }

  const onClickProfileLink = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const { shell } = window.require('electron');
    let link = userInfo['external_url'];
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
    <Page title={userInfo ? userInfo['username'] : 'Username'}>
      <div className={'Userpage-container'}>
        <div className={'Userpage-container__Userinfo'}>
          <div className={'Userpage-container__Userinfo__Profile'}>
            <div
              className={'Userpage-container__Userinfo__Profile__Picture'}
            >
              {userInfo &&
                <PixelImage
                  type={'profile'}
                  source={userInfo['profile_pic_url']}
                  pixelized={false}
                />}
            </div>
              <div className={'Userpage-container__Userinfo__Profile__Follow'}>
                <div className={'Userpage-container__Userinfo__Profile__Follow__Numbers'}>
                  <div className={'Userpage-container__Userinfo__Profile__Follow__Numbers Number'}>
                    <div>
                      <b>{userInfo ? userInfo['media_count'] : 1}</b>
                    </div>
                    <div>
                      posts
                    </div>
                  </div>
                  <div className={'Userpage-container__Userinfo__Profile__Follow__Numbers Number'}>
                    <div>
                      <b>{userInfo ? userInfo['follower_count'] : 3}</b>
                    </div>
                    <div>
                      followers
                    </div>
                  </div>
                  <div className={'Userpage-container__Userinfo__Profile__Follow__Numbers Number'}>
                    <div>
                      <b>{userInfo ? userInfo['following_count'] : 9}</b>
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
              {userInfo['full_name'] &&
                <div className={'Userpage-container__Userinfo__Description__Name'}>
                  {userInfo['full_name']}
                </div>}
              {userInfo['biography'] &&
                <div className={'Userpage-container__Userinfo__Description__Bio'}>
                  {userInfo['biography']}
                </div>}
              {userInfo['external_url'] &&
                <div className={'Userpage-container__Userinfo__Description__Website'}>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={userInfo['external_url']}
                    onClick={onClickProfileLink}
                  >
                    {userInfo['external_url']}
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
            <div className={'Userpage-container__Contents__Box__Scrollable'}>
              {userPosts && userPosts.map((post, i) => {
                const { mediaUrl, pixelizedMediaUrl } = post;
                const source = pixelizedMediaUrl ? pixelizedMediaUrl : mediaUrl;
                return (
                  <PixelImage
                    type={'post'}
                    source={source}
                    pixelized={!!pixelizedMediaUrl}
                    index={i}
                    key={i}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default User;
