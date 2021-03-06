/** @jsx jsx */
import Button from '@components/button';
import Icon from '@components/icon';
import PixelImage from '@components/pixel-image';
import ProfileImage from '@components/profile-image';
import { css, jsx } from '@emotion/react';
import { formatDate } from '@helpers/date-utils';
import pointerCursor from '@static/cursor-pointer.png';
import likeIcon from '@static/like-icon.png';
import { mediaBoxShadow } from '@styles/mixins';
import React, { useCallback, useRef } from 'react';
import {
  PostWithCaptionItem,
  UserInfo,
} from 'retro-instagram'; /* eslint-disable-line import/no-unresolved */

interface PostProps {
  postInfo: PostWithCaptionItem;
  userInfo?: UserInfo;
  index: number;

  // eslint-disable-next-line no-unused-vars
  likePost: (mediaId: string) => void;
  // eslint-disable-next-line no-unused-vars
  unlikePost: (mediaId: string) => void;
}

export type Props = PostProps & React.HTMLAttributes<HTMLDivElement>;

const formatCaption = (username: string, caption: string): string => {
  const splited = caption.split('\n');
  const firstTwoLines = splited.slice(0, 2);
  const [firstLine, secondLine] = firstTwoLines;
  if (firstLine.length > 20) {
    return `${firstLine.substring(0, 20)}...`;
  }

  if (secondLine !== undefined) {
    const remainingLength = 20 - (username.length + 1 + firstLine.length);
    if (secondLine.length > remainingLength) {
      return `${firstLine}\n${secondLine.substring(0, remainingLength)}...`;
    }

    if (splited.length > 2) {
      const skipAll = firstTwoLines.every((line) => line.trim().length < 2);
      if (skipAll) {
        return '...';
      }
      return `${firstTwoLines.join('\n')}...\n`;
    }
  }

  return caption;
};

const postButtonStyle = css`
  padding: 7px 12px 7px 12px;
  font-size: 13px;
`;

const profilePictureStyle = css`
  width: 25px;
  height: 25px;
`;

const Post: React.FC<Props> = (props: Props) => {
  const { postInfo, userInfo, index, children, likePost, unlikePost } = props;

  const captionRef = useRef<HTMLDivElement>(null);

  let profilePictureUrl = '';
  let pixelizedProfilePicture = false;
  if (userInfo) {
    const { mediaUrl, pixelizedMediaUrl } = userInfo.profilePicture;

    pixelizedProfilePicture = !!pixelizedMediaUrl;
    profilePictureUrl = pixelizedMediaUrl || mediaUrl;
  }

  const { mediaUrl, pixelizedMediaUrl } = postInfo;

  const pixelizedPostMedia = !!pixelizedMediaUrl;
  const postMediaUrl = pixelizedMediaUrl || mediaUrl;

  const {
    hasLiked,
    likeCount,
    commentCount,
    previewComments,
    createdAt,
    caption,
  } = postInfo;

  let formattedCaption = '';
  if (caption.text) {
    formattedCaption = formatCaption(caption.username, caption.text);
  }

  const handleClickMore = () => {
    const textDiv = captionRef.current!;
    textDiv.innerText = caption.text;
  };

  const handleClickLike = useCallback(() => {
    if (postInfo.hasLiked) {
      unlikePost(postInfo.id);
      return;
    }
    likePost(postInfo.id);
  }, [likePost, unlikePost, postInfo]);

  return (
    <div
      className='Post-container'
      css={css`
        display: flex;
        flex-direction: column;
        font-size: 0;
      `}
    >
      {userInfo && (
        <div
          className='Post-container__Header'
          css={css`
            display: flex;
            flex-direction: row;
            margin: 8px 6px 8px 6px;
          `}
        >
          <ProfileImage
            customStyle={css`
              ${profilePictureStyle}
              margin-right: 8px;
            `}
          >
            <PixelImage
              type='feed-profile'
              source={profilePictureUrl}
              centered
              pixelized={pixelizedProfilePicture}
              index={index}
              pixelPerLine={30}
              customStyle={profilePictureStyle}
            />
          </ProfileImage>
          <div
            className='Post-container__Header__Username'
            css={css`
              align-self: center;
              font-size: 13px;
              font-weight: bolder;
            `}
          >
            {userInfo.username}
          </div>
        </div>
      )}
      <div
        className='Post-container__Media'
        css={[
          mediaBoxShadow(),
          css`
            padding-top: 2px;
            padding-bottom: 2px;
            background-color: black;
          `,
        ]}
      >
        <PixelImage
          type='feed-post'
          source={postMediaUrl}
          pixelized={pixelizedPostMedia}
          index={index}
          pixelPerLine={200}
          customStyle={css`
            width: 286px;
            height: 290px;
          `}
        />
      </div>
      <div
        className='Post-container__Buttons'
        css={css`
          display: flex;
          flex-direction: row;
          margin: 6px 8px 8px 8px;

          .Button + .Button {
            margin-left: 1px;
          }
        `}
      >
        <Button
          id='Like'
          text='Like'
          selected={hasLiked}
          customStyle={postButtonStyle}
          onClick={handleClickLike}
        />
        <Button id='Comment' text='Comment' customStyle={postButtonStyle} />
        <Button id='Share' text='Share' customStyle={postButtonStyle} />
      </div>
      {likeCount > 0 && (
        <div
          className='Post-container__Likes'
          css={css`
            display: flex;
            flex-direction: row;
            margin: 6px 8px 8px 8px;
          `}
        >
          <Icon
            icon={likeIcon}
            customStyle={css`
              width: 11px;
              height: 11px;
            `}
          />
          <div
            className='Post-container__Likes__Number'
            css={css`
              margin-left: 3px;
              text-align: center;
              font-size: 13px;
              font-weight: bolder;
            `}
          >
            {`${likeCount} likes`}
          </div>
        </div>
      )}
      {caption.text && (
        <div
          className='Post-container__Info'
          css={css`
            margin: 0 6px 1px 8px;

            font-size: 13px;
            line-height: 1.3;
            overflow-wrap: break-word;
            word-wrap: break-word;
            word-break: break-all;
          `}
        >
          <span
            className='Post-container__Info__Username'
            css={css`
              font-weight: bolder;
              margin-right: 4px;
            `}
          >
            {caption.username}
          </span>
          <span className='Post-container__Info__Caption' ref={captionRef}>
            {formattedCaption}
            {formattedCaption !== caption.text && (
              <span
                className='Post-container__Info__Caption__More'
                onClick={handleClickMore}
                role='button'
                tabIndex={0}
                onKeyUp={() => {}}
                css={css`
                  cursor: url(${pointerCursor}), pointer;
                  margin-left: 2px;
                  word-wrap: normal;
                  word-break: keep-all;
                  color: #606060;

                  &:focus {
                    outline: 1px dotted black;
                  }
                `}
              >
                more
              </span>
            )}
          </span>
        </div>
      )}
      {!!commentCount && (
        <div
          className='Post-container__Comments'
          css={css`
            display: flex;
            flex-direction: column;
            margin: 0 6px 2px 8px;

            font-size: 13px;
            line-height: 1.3;
            overflow-wrap: break-word;
            word-wrap: break-word;
            word-break: break-all;
          `}
        >
          {commentCount > previewComments.length && (
            <div
              className='Post-container__Comments__More'
              css={css`
                color: #606060;
              `}
            >
              {`View all ${commentCount} Comments`}
            </div>
          )}
          {previewComments.length > 0 &&
            previewComments.map((comment) => (
              <div
                className='Post-container__Comments__Preview'
                key={comment.pk}
              >
                <span
                  className='Post-container__Comments__Preview__Username'
                  css={css`
                    font-weight: bolder;
                    margin-right: 4px;
                  `}
                >
                  {comment.username}
                </span>
                <span className='Post-container__Comments__Preview__Comment'>
                  {comment.text.length > 50
                    ? comment.text.substr(0, 50)
                    : comment.text}
                  {comment.text.length > 50 && (
                    <span
                      className='Post-container__Comments__Preview__Comment__More'
                      css={css`
                        margin-left: 2px;
                        word-wrap: normal;
                        word-break: keep-all;
                        color: #606060;
                      `}
                    >
                      [...]
                    </span>
                  )}
                </span>
              </div>
            ))}
        </div>
      )}
      <div
        className='Post-container__Additional'
        css={css`
          margin: 0 6px 2px 8px;

          font-size: 10px;
          line-height: 1.3;
        `}
      >
        <span
          className='Post-container__Additional__Date'
          css={css`
            color: #606060;
          `}
        >
          {formatDate(createdAt)}
        </span>
        {caption.text && (
          <span className='Post-container__Additional__Translate'>
            SEE TRANSLATION
          </span>
        )}
      </div>
      {children}
    </div>
  );
};

export default Post;
