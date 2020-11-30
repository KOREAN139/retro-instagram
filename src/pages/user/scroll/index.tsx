import React from 'react';
import { useSelector } from 'react-redux';
import { UserPostInfo } from 'retro-instagram';
import Page from '@components/page';
import Post from '@components/post';
import { RootState } from '@store';
import './index.scss';
import PixelImage from '@components/pixel-image';
import Button from '@components/button';
import optionIcon from '@static/option-icon.png';

interface UserScrollProps {
  title: string
  loaded: boolean
  username: string
  userPostInfo: UserPostInfo
}

export type Props = UserScrollProps & React.HTMLAttributes<HTMLDivElement>;

const UserScroll: React.FC<Props> = (props) => {
  let infoExists = false;
  let pixelizedProfile = false;

  const userInfo: any = useSelector(
    (state: RootState) => state.instagram.userInfo
  );

  const userPostInfo = useSelector(
    (state: RootState) => state.instagram.userPostInfo
  );

//   const { username } = userInfo;
  const { posts } = userPostInfo;

  if (userInfo) {
    const exist = userInfo.fullName
                  || userInfo.biography
                  || userInfo.externalUrl
                  || false;
    infoExists = !!exist;
    pixelizedProfile = !!userInfo.profilePicture.pixelizedMediaUrl;
  }

  return (
    <Page
      title={'Posts'}
      loaded={true}
    >
      <div className={'Userpage-scroll-container'}>
        <div className={'Userpage-scroll-container__Userinfo'}>
            <div className={'Userpage-scroll-container__Userinfo__Profile-picture'}>
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
            <div className={'Userpage-scroll-container__Userinfo__Username'}>
                {userInfo ? userInfo.username : 'username'}
            </div>
            <div className={'Userpage-scroll-container__Userinfo__Option-button'}>
              <Button
                location={'User-contents-category'}
                icon={optionIcon}
              />
            </div>
        </div>
        <div className={'Userpage-scroll-container__Contents'}>
          <div className={'Userpage-scroll-container__Contents__Scrollable'}>
            {posts && posts.map((post, i) => {
              return (
                <Post
                  postInfo={post}
                  index={i}
                  key={i}
                />
              );
            })}
          </div>
        </div>
      </div>
    </Page>
  );
};

export default UserScroll;

