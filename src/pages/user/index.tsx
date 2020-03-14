import React, { useState } from 'react';
import './index.scss';
import Button from '../../components/button';
import Page from '../../components/page';
import moreIcon from '../../static/more-button.png';
import gridIcon from '../../static/grid-icon.png';
import scrollIcon from '../../static/scroll-icon.png';
import locationIcon from '../../static/location-icon.png';
import tagIcon from '../../static/tag-icon.png';

const User = () => {
  const [currentCategory, setCurrentCategory] = useState('grid');

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
    <Page title={'Username'}>
      <div className={'Userpage-container'}>
        <div className={'Userpage-container__Userinfo'}>
          <div className={'Userpage-container__Userinfo__Profile'}>
            <div className={'Userpage-container__Userinfo__Profile__Picture'} />
              <div className={'Userpage-container__Userinfo__Profile__Follow'}>
                <div className={'Userpage-container__Userinfo__Profile__Follow__Numbers'}>
                  <div className={'Userpage-container__Userinfo__Profile__Follow__Numbers Number'}>
                    <div>
                      <b>1</b>
                    </div>
                    <div>
                      posts
                    </div>
                  </div>
                  <div className={'Userpage-container__Userinfo__Profile__Follow__Numbers Number'}>
                    <div>
                      <b>3</b>
                    </div>
                    <div>
                      followers
                    </div>
                  </div>
                  <div className={'Userpage-container__Userinfo__Profile__Follow__Numbers Number'}>
                    <div>
                      <b>9</b>
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
              name
            </div>
            <div className={'Userpage-container__Userinfo__Description__Bio'}>
              bio in here
            </div>
            <div className={'Userpage-container__Userinfo__Description__Website'}>
              https://www.website-will-be-here.io
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
