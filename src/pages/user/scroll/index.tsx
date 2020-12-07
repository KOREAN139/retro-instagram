import Button from '@components/button';
import Page from '@components/page';
import PixelImage from '@components/pixel-image';
import Post from '@components/post';
import { getUserPosts } from '@ducks/instagram';
import optionIcon from '@static/option-icon.png';
import { RootState } from '@store';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserPostInfo } from 'retro-instagram'; /* eslint-disable-line import/no-unresolved */

import './index.scss';

interface UserScrollProps {
  title: string;
  loaded: boolean;
  username: string;
  userPostInfo: UserPostInfo;
}

export type Props = UserScrollProps & React.HTMLAttributes<HTMLDivElement>;

const UserScroll: React.FC<Props> = () => {
  const dispatch = useDispatch();
  let pixelizedProfile = false;

  const userPk: number = useSelector(
    (state: RootState) => state.instagram.userPk
  );

  const userInfo: any = useSelector(
    (state: RootState) => state.instagram.userInfo
  );

  const userPostInfo = useSelector(
    (state: RootState) => state.instagram.userPostInfo
  );
  const { moreAvailable, posts } = userPostInfo;

  const containerRef = useRef(null);
  const bottomRef = useRef(null);

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
    pixelizedProfile = !!userInfo.profilePicture.pixelizedMediaUrl;
  }

  return (
    <Page title='Posts' loaded backButton reloadButton>
      <div className='Userpage-scroll-container'>
        <div className='Userpage-scroll-container__Userinfo'>
          <div className='Userpage-scroll-container__Userinfo__Profile-picture'>
            {userInfo && (
              <PixelImage
                type='user-profile'
                source={
                  pixelizedProfile
                    ? userInfo.profilePicture.pixelizedMediaUrl
                    : userInfo.profilePicture.mediaUrl
                }
                centered
                pixelized={pixelizedProfile}
              />
            )}
          </div>
          <div className='Userpage-scroll-container__Userinfo__Username'>
            {userInfo ? userInfo.username : 'username'}
          </div>
          <div className='Userpage-scroll-container__Userinfo__Option-button'>
            <Button id='Option' icon={optionIcon} />
          </div>
        </div>
        <div className='Userpage-scroll-container__Contents'>
          <div
            className='Userpage-scroll-container__Contents__Scrollable'
            ref={containerRef}
          >
            {posts &&
              posts.map((post, i) => {
                return <Post postInfo={post} index={i} key={post.id} />;
              })}
            <div
              className='Userpage-container__Contents__Box__Scrollable__Bottom'
              ref={bottomRef}
            />
          </div>
        </div>
      </div>
    </Page>
  );
};

export default UserScroll;
