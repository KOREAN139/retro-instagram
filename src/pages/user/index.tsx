import React from 'react';
import './index.scss';
import Button from '../../components/button';
import moreIcon from '../../static/more-button.png';

const User = () => {
  return (
    <div className={'Userpage-container'}>
      <div className={'Userpage-container__Username'}>
        Username
      </div>
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
        Contents comes here
      </div>
    </div>
  );
};

export default User;
