/** @jsx jsx */
import Button from '@components/button';
import Page from '@components/page';
import PixelImage from '@components/pixel-image';
import Post from '@components/post';
import { getUserPosts } from '@ducks/instagram';
import { css, jsx } from '@emotion/react';
import optionIcon from '@static/option-icon.png';
import { RootState } from '@store';
import { dividerTopShadow, scrollableBoxShadow } from '@styles/mixins';
import {
  scrollableBoxContainer,
  scrollableBoxVertical,
} from '@styles/placeholders';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserPostInfo } from 'retro-instagram'; /* eslint-disable-line import/no-unresolved */

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
      <div
        className='Userpage-scroll-container'
        css={css`
          display: flex;
          flex: 1;
          flex-direction: column;
          background-image: inherit;
        `}
      >
        <div
          className='Userpage-scroll-container__Userinfo'
          css={[
            dividerTopShadow(),
            css`
              padding: 8px 6px 6px 6px;

              display: flex;
              flex-direction: row;
              font-size: 0;
            `,
          ]}
        >
          <div
            className='Userpage-scroll-container__Userinfo__Profile-picture'
            css={css`
              margin-right: 8px;

              width: 24px;
              height: 24px;
              border-radius: 50%;
              background-color: black;

              .Pixel-image {
                width: 24px;
                height: 24px;
                border-radius: 50%;
              }
            `}
          >
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
          <div
            className='Userpage-scroll-container__Userinfo__Username'
            css={css`
              align-self: center;

              font-size: 13px;
              font-weight: bolder;
            `}
          >
            {userInfo ? userInfo.username : 'username'}
          </div>
          <div
            className='Userpage-scroll-container__Userinfo__Option-button'
            css={css`
              margin-left: auto;

              .Button {
                width: 24px;
                height: 24px;

                &__Icon {
                  width: 18px;
                  height: 18px;
                  background-position: center;
                  background-size: 12px 12px;
                }
              }
            `}
          >
            <Button id='Option' icon={optionIcon} />
          </div>
        </div>
        <div
          className='Userpage-scroll-container__Contents'
          css={[
            scrollableBoxContainer,
            scrollableBoxShadow(),
            css`
              width: inherit;
              flex: 1;
              margin-top: 2px;
              padding: 2px;
            `,
          ]}
        >
          <div
            className='Userpage-scroll-container__Contents__Scrollable'
            ref={containerRef}
            css={[
              scrollableBoxVertical,
              css`
                .Post-container + .Post-container {
                  margin-top: 16px;
                }
              `,
            ]}
          >
            {posts &&
              posts.map((post, i) => {
                return <Post postInfo={post} index={i} key={post.id} />;
              })}
            <div
              className='Userpage-container__Contents__Box__Scrollable__Bottom'
              ref={bottomRef}
              css={css`
                width: 0;
                height: 0;
              `}
            />
          </div>
        </div>
      </div>
    </Page>
  );
};

export default UserScroll;
