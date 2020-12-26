/** @jsx jsx */
import Button from '@components/button';
import Icon from '@components/icon';
import Page from '@components/page';
import PixelImage from '@components/pixel-image';
import Post from '@components/post';
import ProfileImage from '@components/profile-image';
import ScrollableBox from '@components/scrollable-box';
import { getUserPosts, likeMedia, unlikeMedia } from '@ducks/instagram';
import { css, jsx } from '@emotion/react';
import optionIcon from '@static/option-icon.png';
import { RootState } from '@store';
import { dividerTopShadow } from '@styles/mixins';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserPostInfo } from 'retro-instagram'; /* eslint-disable-line import/no-unresolved */

interface UserScrollProps {
  title: string;
  loaded: boolean;
  username: string;
  userPostInfo: UserPostInfo;
}

export type Props = UserScrollProps & React.HTMLAttributes<HTMLDivElement>;

const profilePictureStyle = css`
  width: 24px;
  height: 24px;
`;

const UserScroll: React.FC<Props> = () => {
  const dispatch = useDispatch();
  let pixelizedProfile = false;

  const userPk: number = useSelector(
    (state: RootState) => state.instagram.userPk
  );

  const username: string = useSelector(
    (state: RootState) => state.instagram.username
  );

  const userInfo: any = useSelector(
    (state: RootState) => state.instagram.userInfo
  );

  const userPostInfo = useSelector(
    (state: RootState) => state.instagram.userPostInfo
  );
  const { moreAvailable, posts } = userPostInfo;

  const fetchUserPosts = useCallback(() => {
    if (moreAvailable) {
      dispatch(getUserPosts(userPk));
    }
  }, [moreAvailable, userPk, dispatch]);

  if (userInfo) {
    pixelizedProfile = !!userInfo.profilePicture.pixelizedMediaUrl;
  }

  const likePost = useCallback(
    (mediaId: string) => {
      dispatch(likeMedia(userPk, username, mediaId));
    },
    [userPk, username, dispatch]
  );

  const unlikePost = useCallback(
    (mediaId: string) => {
      dispatch(unlikeMedia(userPk, username, mediaId));
    },
    [userPk, username, dispatch]
  );

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
          <ProfileImage
            customStyle={css`
              ${profilePictureStyle}
              margin-right: 8px;
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
                customStyle={profilePictureStyle}
              />
            )}
          </ProfileImage>
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
            `}
          >
            <Button
              id='Option'
              customStyle={css`
                width: 24px;
                height: 24px;
              `}
            >
              <Icon
                icon={optionIcon}
                customStyle={css`
                  width: 18px;
                  height: 18px;
                  background-size: 12px 12px;
                `}
              />
            </Button>
          </div>
        </div>
        <ScrollableBox
          customStyle={css`
            .Post-container + .Post-container {
              margin-top: 16px;
            }
          `}
          onBottom={fetchUserPosts}
        >
          {posts &&
            posts.map((post, i) => {
              return (
                <Post
                  postInfo={post}
                  index={i}
                  key={post.id}
                  likePost={likePost}
                  unlikePost={unlikePost}
                />
              );
            })}
        </ScrollableBox>
      </div>
    </Page>
  );
};

export default UserScroll;
