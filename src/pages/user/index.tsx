/** @jsx jsx */
import Button from '@components/button';
import Page from '@components/page';
import PixelImage from '@components/pixel-image';
import { getSignedInUserInfo, getUserPosts } from '@ducks/instagram';
import { css, jsx } from '@emotion/react';
import { ROUTE_USER_SCROLL } from '@pages/routes/constants';
import PostInfoModal from '@pages/user/post-info-modal';
import pointerCursor from '@static/cursor-pointer.png';
import gridIcon from '@static/grid-icon.png';
import locationIcon from '@static/location-icon.png';
import moreIcon from '@static/more-button.png';
import scrollIcon from '@static/scroll-icon.png';
import tagIcon from '@static/tag-icon.png';
import { RootState } from '@store';
import { dividerTopBottomShadow } from '@styles/mixins';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { PostItem } from 'retro-instagram'; /* eslint-disable-line import/no-unresolved */

import ScrollableBox from '~/components/scrollable-box';

const User = () => {
  const dispatch = useDispatch();
  const [currentCategory, setCurrentCategory] = useState('grid');
  const [displayModal, setDisplayModal] = useState(false);
  const [selectedPostItem, setSelectedPostItem] = useState<PostItem>();
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
  const postLoaded = posts.every((post) => {
    return !!post.pixelizedMediaUrl;
  });

  useEffect(() => {
    dispatch(getSignedInUserInfo(userPk));
  }, [dispatch, userPk]);

  const fetchUserPosts = useCallback(() => {
    if (moreAvailable) {
      dispatch(getUserPosts(userPk));
    }
  }, [moreAvailable, userPk, dispatch]);

  if (userInfo) {
    const exist =
      userInfo.fullName || userInfo.biography || userInfo.externalUrl || false;
    infoExists = !!exist;
    pixelizedProfile = !!userInfo.profilePicture.pixelizedMediaUrl;
  }

  const onClickProfileLink = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const { shell } = window.require('electron');
    const link = userInfo.externalUrl;
    shell.openExternal(link);
  };

  const onClickPost = (index: number) => {
    setDisplayModal(true);
    setSelectedPostItem(posts[index]);
  };

  const onClickModelClose = () => {
    setDisplayModal(false);
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
      <div
        className='Userpage-container'
        css={css`
          display: flex;
          flex: 1;
          flex-direction: column;
          background-image: inherit;
        `}
      >
        <div
          className='Userpage-container__Userinfo'
          css={[
            dividerTopBottomShadow(),
            css`
              padding-top: 5px;
              padding-bottom: 5px;
              margin-bottom: 2px;
            `,
          ]}
        >
          <div
            className='Userpage-container__Userinfo__Profile'
            css={css`
              display: flex;
              flex-direction: row;
              padding: 6px;
            `}
          >
            <div
              className='Userpage-container__Userinfo__Profile__Picture'
              css={css`
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background-color: black;
                display: flex;
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
                  customStyle={css`
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                  `}
                />
              )}
            </div>
            <div
              className='Userpage-container__Userinfo__Profile__Follow'
              css={css`
                display: flex;
                flex-direction: column;
                flex-grow: 1;
                margin-left: 14px;

                font-size: 13px;
              `}
            >
              <div
                className='Userpage-container__Userinfo__Profile__Follow__Numbers'
                css={css`
                  display: flex;
                  flex-basis: 100%;
                  padding-right: 27px;
                `}
              >
                <div
                  className='Userpage-container__Userinfo__Profile__Follow__Numbers Number'
                  css={css`
                    display: flex;
                    flex-basis: 100%;
                    flex-direction: column;
                    justify-items: center;
                    align-items: center;
                    padding: 0;

                    * + * {
                      margin-top: 2px;
                    }
                  `}
                >
                  <div>
                    <b>{userInfo ? userInfo.mediaCount : 1}</b>
                  </div>
                  <div>posts</div>
                </div>
                <div
                  className='Userpage-container__Userinfo__Profile__Follow__Numbers Number'
                  css={css`
                    display: flex;
                    flex-basis: 100%;
                    flex-direction: column;
                    justify-items: center;
                    align-items: center;
                    padding: 0;

                    * + * {
                      margin-top: 2px;
                    }
                  `}
                >
                  <div>
                    <b>{userInfo ? userInfo.followerCount : 3}</b>
                  </div>
                  <div>followers</div>
                </div>
                <div
                  className='Userpage-container__Userinfo__Profile__Follow__Numbers Number'
                  css={css`
                    display: flex;
                    flex-basis: 100%;
                    flex-direction: column;
                    justify-items: center;
                    align-items: center;
                    padding: 0;

                    * + * {
                      margin-top: 2px;
                    }
                  `}
                >
                  <div>
                    <b>{userInfo ? userInfo.followingCount : 9}</b>
                  </div>
                  <div>following</div>
                </div>
              </div>
              <div
                className='Userpage-container__Userinfo__Profile__Follow__Buttons'
                css={css`
                  display: flex;
                  padding-top: 4px;
                  padding-bottom: 2px;
                  flex-basis: 100%;
                  flex-direction: row;

                  .Button {
                    width: 100%;
                    height: 24px;
                    font-size: 13px;

                    &__Icon {
                      width: 24px;
                      height: 24px;
                      background-position: 48% 50%;
                      background-size: 7px 7px;

                      &.Able:active {
                        background-position: 55% 60%;
                      }
                    }

                    &#More {
                      width: 24px;
                      height: 24px;
                      float: right;
                    }
                  }

                  .Button + .Button {
                    margin-left: 3px;
                  }
                `}
              >
                <Button id='Follow' text='+ Follow' />
                <Button id='More' icon={moreIcon} />
              </div>
            </div>
          </div>
          {infoExists && (
            <div
              className='Userpage-container__Userinfo__Description'
              css={css`
                display: flex;
                flex-direction: column;
                padding: 6px;
                margin-top: 1px;
                margin-bottom: 1px;

                overflow-wrap: break-word;
                word-wrap: break-word;
                word-break: break-all;
                font-size: 13px;
                white-space: pre-wrap;
                line-height: 15px;

                * + * {
                  margin-top: 4px;
                }
              `}
            >
              {userInfo.fullName && (
                <div
                  className='Userpage-container__Userinfo__Description__Name'
                  css={css`
                    font-size: 14px;
                    font-weight: bolder;
                  `}
                >
                  {userInfo.fullName}
                </div>
              )}
              {userInfo.biography && (
                <div className='Userpage-container__Userinfo__Description__Bio'>
                  {userInfo.biography}
                </div>
              )}
              {userInfo.externalUrl && (
                <div className='Userpage-container__Userinfo__Description__Website'>
                  <a
                    target='_blank'
                    rel='noopener noreferrer'
                    href={userInfo.externalUrl}
                    onClick={onClickProfileLink}
                  >
                    {userInfo.externalUrl}
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
        <div
          className='Userpage-container__Contents'
          css={css`
            display: flex;
            flex-direction: column;
            flex-basis: 100%;
          `}
        >
          <div
            className='Userpage-container__Contents__Categories'
            css={css`
              display: flex;
              flex-direction: row;
              margin: 2px;

              .Button {
                flex-basis: 100%;
                height: 24px;

                &__Icon {
                  width: 18px;
                  height: 18px;
                  background-position: center;
                  background-size: 12px 12px;
                }
              }

              .Button + .Button {
                margin-left: 1px;
              }
            `}
          >
            <Button
              id='Grid'
              icon={gridIcon}
              selected={currentCategory === 'grid'}
              onClick={onClickGrid}
            />
            <NavLink className='Button' to={ROUTE_USER_SCROLL}>
              <Button
                id='Scroll'
                icon={scrollIcon}
                selected={currentCategory === 'scroll'}
                onClick={onClickScroll}
              />
            </NavLink>
            <Button
              id='Location'
              icon={locationIcon}
              selected={currentCategory === 'location'}
              onClick={onClickLocation}
            />
            <Button
              id='Tagged'
              icon={tagIcon}
              selected={currentCategory === 'tagged'}
              onClick={onClickTagged}
            />
          </div>
          <ScrollableBox
            customStyle={css`
              align-content: flex-start;

              .Pixel-image + .Pixel-image {
                margin-left: 1px;
                margin-top: 1px;
              }
            `}
            onBottom={fetchUserPosts}
          >
            {posts.length > 0 &&
              posts.map((post, i) => {
                const { mediaUrl, pixelizedMediaUrl } = post;
                const source = pixelizedMediaUrl || mediaUrl;
                return (
                  <PixelImage
                    type='user-thumbnail'
                    source={source}
                    centered
                    pixelized={!!pixelizedMediaUrl}
                    index={i}
                    key={post.id}
                    onClick={() => onClickPost(i)}
                    customStyle={css`
                      width: 94.5px;
                      height: 94.5px;
                      object-fit: cover;
                      cursor: url(${pointerCursor}), pointer;

                      @for $i from 1 through 3 {
                        &:nth-of-type(#{$i}) {
                          margin-top: 0px;
                        }
                      }

                      &:nth-of-type(3n + 1) {
                        margin-left: 0px;
                      }
                    `}
                  />
                );
              })}
          </ScrollableBox>
        </div>
      </div>
      {displayModal && !!selectedPostItem && (
        <PostInfoModal
          likeCount={selectedPostItem.likeCount}
          commentCount={selectedPostItem.commentCount}
          onClickClose={onClickModelClose}
        />
      )}
    </Page>
  );
};

export default User;
