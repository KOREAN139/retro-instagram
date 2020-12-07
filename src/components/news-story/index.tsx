import PixelImage from '@components/pixel-image';
import React from 'react';
import { NewsItem } from 'retro-instagram'; /* eslint-disable-line import/no-unresolved */

import './index.scss';

interface NewsStoryProps {
  newsInfo: NewsItem;
  index: number;
}

export type Props = NewsStoryProps & React.HTMLAttributes<HTMLDivElement>;

const formatElapsedTime = (utc: number): string => {
  const now = Date.now() / 1000;

  let diff = now - utc;
  if (diff < 60) {
    return `${diff}s`;
  }

  diff = Math.trunc(diff / 60);
  if (diff < 60) {
    return `${diff}m`;
  }

  diff = Math.trunc(diff / 60);
  if (diff < 24) {
    return `${diff}h`;
  }

  diff = Math.trunc(diff / 24);
  if (diff < 7) {
    return `${diff}d`;
  }

  diff = Math.trunc(diff / 7);
  return `${diff}w`;
};

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
    <div className='News-story'>
      <div className='News-story__Wrapper'>
        <div className='News-story__Wrapper__Profile-picture'>
          <PixelImage
            type='news-profile'
            source={profilePictureUrl}
            pixelized={pixelizedProfilePicture}
            index={index}
            pixelPerLine={30}
          />
        </div>
        <div className='News-story__Wrapper__Text'>
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
          <span className='News-story__Wrapper__Text__Elapsed'>
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
            />
          </div>
        )}
      </div>
      {children}
    </div>
  );
};

export default NewsStory;
