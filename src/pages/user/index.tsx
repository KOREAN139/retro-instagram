import React, { useState, useCallback, useEffect } from 'react';
import './index.scss';
import Button from '../../components/button';
import Page from '../../components/page';
import moreIcon from '../../static/more-button.png';
import gridIcon from '../../static/grid-icon.png';
import scrollIcon from '../../static/scroll-icon.png';
import locationIcon from '../../static/location-icon.png';
import tagIcon from '../../static/tag-icon.png';
import { RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { getSignedInUserInfo } from '../../ducks/instagram';
import { useHistory } from 'react-router-dom';

const User = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [currentCategory, setCurrentCategory] = useState('grid');

  const userPk: number = useSelector(
    (state: RootState) => state.instagram.userPk
  );

  const userInfo: any = useSelector(
    (state: RootState) => state.instagram.userInfo
  );

  const loadUserInfo = useCallback(async () => {
    await dispatch(getSignedInUserInfo(userPk));
  }, [dispatch, userPk]);

  useEffect(() => {
    loadUserInfo();
  }, [loadUserInfo, history]);

  const onClickGrid = () => {
    setCurrentCategory('grid');
  }

  const onClickScroll = () => {
    setCurrentCategory('scroll');
  }

  const onClickLocation = () => {
    setCurrentCategory('location');
  }

  const onClickTagged = () => {
    setCurrentCategory('tagged');
  }

  return (
    <Page title={userInfo ? userInfo['username'] : 'Username'}>
      <div className={'Userpage-container'}>
        <div className={'Userpage-container__Userinfo'}>
          <div className={'Userpage-container__Userinfo__Profile'}>
            <div
              className={'Userpage-container__Userinfo__Profile__Picture'}
            >
              {userInfo &&
                <img
                  alt={''}
                  src={userInfo['profile_pic_url']}
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
          <div className={'Userpage-container__Userinfo__Description'}>
            <div className={'Userpage-container__Userinfo__Description__Name'}>
              {userInfo ? userInfo['full_name'] : 'name'}
            </div>
            <div className={'Userpage-container__Userinfo__Description__Bio'}>
              {userInfo ? userInfo['biography'] : 'bio in here'}
            </div>
            <div className={'Userpage-container__Userinfo__Description__Website'}>
              {userInfo ? userInfo['external_url'] : 'https://www.website-will-be-here.io'}
            </div>
          </div>
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
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default User;
