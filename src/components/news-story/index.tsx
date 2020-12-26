/** @jsx jsx */
import PixelImage from '@components/pixel-image';
import ProfileImage from '@components/profile-image';
import { css, jsx } from '@emotion/react';
import { formatElapsedTime } from '@helpers/date-utils';
import { dividerBottomShadow } from '@styles/mixins';
import React from 'react';
import { NewsItem } from 'retro-instagram'; /* eslint-disable-line import/no-unresolved */

interface NewsStoryProps {
  newsInfo: NewsItem;
  index: number;
}

export type Props = NewsStoryProps & React.HTMLAttributes<HTMLDivElement>;

const profileImageStyle = css`
  width: 35px;
  height: 35px;
`;

const NewsStory: React.FC<Props> = (props: Props) => {
  const { newsInfo, index, children } = props;
  const { text, links, profilePicture, thumbnail, createdAt } = newsInfo;

  let thumbnailPictureUrl = '';
  let pixelizedThumbnail = false;
  if (thumbnail) {
    const { mediaUrl, pixelizedMediaUrl } = thumbnail;

    pixelizedThumbnail = !!pixelizedMediaUrl;
    thumbnailPictureUrl = pixelizedMediaUrl || mediaUrl;
  }

  const { mediaUrl, pixelizedMediaUrl } = profilePicture;

  const pixelizedProfilePicture = !!pixelizedMediaUrl;
  const profilePictureUrl = pixelizedMediaUrl || mediaUrl;

  return (
    <div
      className='News-story'
      css={css`
        display: flex;
        padding: 4px 6px 0px 6px;
      `}
    >
      <div
        className='News-story__Wrapper'
        css={[
          dividerBottomShadow(),
          css`
            flex: 1;
            display: flex;
            flex-direction: row;
            padding-bottom: 4px;
            justify-content: space-between;
          `,
        ]}
      >
        <ProfileImage customStyle={profileImageStyle}>
          <PixelImage
            type='news-profile'
            source={profilePictureUrl}
            pixelized={pixelizedProfilePicture}
            index={index}
            pixelPerLine={30}
            customStyle={profileImageStyle}
          />
        </ProfileImage>
        <div
          className='News-story__Wrapper__Text'
          css={css`
            flex: 1;
            font-size: 12px;
            line-height: 1.3;
            padding: 0 4px;
          `}
        >
          <span>
            {links
              ? links.map((link, i) => {
                  const { start, end } = link;
                  let trailText = text!.slice(end);
                  if (links[i + 1]) {
                    trailText = text!.slice(end, links[i + 1].start);
                  }
                  return (
                    <React.Fragment key={link.id}>
                      <b>{text!.slice(start, end)}</b>
                      {trailText}
                    </React.Fragment>
                  );
                })
              : text}
          </span>
          <span
            className='News-story__Wrapper__Text__Elapsed'
            css={css`
              margin-left: 3px;
              font-size: 11px;
              color: #606060;
            `}
          >
            {formatElapsedTime(createdAt)}
          </span>
        </div>
        {thumbnail && (
          <div className='News-story__Wrapper__Thumbnail'>
            <PixelImage
              type='news-thumbnail'
              source={thumbnailPictureUrl}
              pixelized={pixelizedThumbnail}
              index={index}
              pixelPerLine={50}
              customStyle={css`
                width: 35px;
                height: 35px;
              `}
            />
          </div>
        )}
      </div>
      {children}
    </div>
  );
};

export default NewsStory;
