import React from 'react';
import './index.scss';
import Button from '../../components/button';
import PixelImage from '../../components/pixel-image';
import {
  PostWithCaptionItem,
  UserInfo
} from 'retro-instagram';

interface PostProps {
  postInfo: PostWithCaptionItem
  userInfo?: UserInfo
  pixelized: boolean
  index: number
}

export type Props = PostProps & React.HTMLAttributes<HTMLDivElement>;

const formatDate = (utc: number): string => {
  const monthString = [
    'JANUARY',
    'FEBRUARY',
    'MARCH',
    'APRIL',
    'MAY',
    'JUNE',
    'JULY',
    'AUGUST',
    'SEPTEMBER',
    'OCTOBER',
    'NOVEMBER',
    'DECEMBER',
  ];
  const date = new Date(utc);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  return `${day} ${monthString[month]} ${year} . `;
}

const Post: React.FC<Props> = (props) => {
  const {
    postInfo,
    userInfo,
    pixelized,
    index,
    ...otherProps
  } = props;

  let profilePictureUrl = '';
  let pixelizedProfilePicture = false;
  if (userInfo) {
    const { mediaUrl, pixelizedMediaUrl } = userInfo.profilePicture;

    pixelizedProfilePicture = !!pixelizedMediaUrl;
    profilePictureUrl = pixelizedMediaUrl ? pixelizedMediaUrl : mediaUrl;
  }

  const { mediaUrl, pixelizedMediaUrl } = postInfo;

  const pixelizedPostMedia = !!pixelizedMediaUrl;
  const postMediaUrl = pixelizedMediaUrl ? pixelizedMediaUrl : mediaUrl;

  const {
    likeCount,
    commentCount,
    previewComments,
    createdAt,
    caption,
  } = postInfo;

  return (
    <div
      className={'Post-container'}
      {...otherProps}
    >
      {userInfo &&
        <div className={'Post-container__Header'}>
          <div className={'Post-container__Header__Profile-picture'}>
            <PixelImage
              type={'feed-profile'}
              source={profilePictureUrl}
              centered={true}
              pixelized={pixelizedProfilePicture}
              index={index}
              pixelPerLine={30}
            />
          </div>
          <div className={'Post-container__Header__Username'}>
            {userInfo.username}
          </div>
        </div>}
      <div className={'Post-container__Media'}>
        <PixelImage
          type={'feed-post'}
          source={postMediaUrl}
          pixelized={pixelizedPostMedia}
          index={index}
          pixelPerLine={200}
        />
      </div>
      <div className={'Post-container__Buttons'}>
        <Button
          location={'Post'}
          text={'Like'}
        />
        <Button
          location={'Post'}
          text={'Comment'}
        />
        <Button
          location={'Post'}
          text={'Share'}
        />
      </div>
      {likeCount > 0 &&
        <div className={'Post-container__Likes'}>
          <div className={'Post-container__Likes__Icon'} />
          <div className={'Post-container__Likes__Number'}>
          {`${likeCount} likes`}
          </div>
        </div>}
      {caption.text &&
        <div className={'Post-container__Info'}>
          <span className={'Post-container__Info__Username'}>
            {caption.username}
          </span>
          {caption.text}
        </div>}
      {!!commentCount &&
        <div className={'Post-container__Comments'}>
          {commentCount > previewComments.length &&
            <div className={'Post-container__Comments__More'}>
              {`View all ${commentCount} Comments`}
            </div>}
          {previewComments.length > 0 && previewComments.map((comment, i) => (
            <div
              className={'Post-container__Comments__Preview'}
              key={i}
            >
              <span className={'Post-container__Comments__Preview__Username'}>
                {comment.username}
              </span>
              {comment.text}
            </div>))}
        </div>}
      <div className={'Post-container__Additional'}>
        <span className={'Post-container__Additional__Date'}>
          {formatDate(createdAt)}
        </span >
        <span className={'Post-container__Additional__Translate'}>
          SEE TRANSLATION
        </span >
      </div>
      {props.children}
    </div>
  );
};

export default Post;
