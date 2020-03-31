import React from 'react';
import './index.scss';
import PixelImage from '@components/pixel-image';
import {
  NewsItem
} from 'retro-instagram';

interface NewsStoryProps {
  newsInfo: NewsItem
  index: number
}

export type Props = NewsStoryProps & React.HTMLAttributes<HTMLDivElement>;

const formatElapsedTime = (utc: number): string => {
  const now = Date.now() / 1000;

  let diff = now - utc;
  if (diff < 60) {
    return `${diff}s`;
  }

  diff = ~~(diff / 60);
  if (diff < 60) {
    return `${diff}m`;
  }

  diff = ~~(diff / 60);
  if (diff < 24) {
    return `${diff}h`;
  }

  diff = ~~(diff / 24);
  if (diff < 7) {
    return `${diff}d`;
  }

  diff = ~~(diff / 7);
  return `${diff}w`;
};

const NewsStory: React.FC<Props> = (props) => {
  const { newsInfo, index } = props;
  const { text, links, profilePicture, thumbnail, createdAt } = newsInfo;

  let thumbnailPictureUrl = '';
  let pixelizedThumbnail = false;
  if (thumbnail) {
    const { mediaUrl, pixelizedMediaUrl } = thumbnail;

    pixelizedThumbnail = !!pixelizedMediaUrl;
    thumbnailPictureUrl = pixelizedMediaUrl ? pixelizedMediaUrl : mediaUrl;
  }

  const { mediaUrl, pixelizedMediaUrl } = profilePicture;

  const pixelizedProfilePicture = !!pixelizedMediaUrl;
  const profilePictureUrl = pixelizedMediaUrl ? pixelizedMediaUrl : mediaUrl;

  return (
    <div className={'News-story'}>
      <div className={'News-story__Wrapper'}>
        <div className={'News-story__Wrapper__Profile-picture'}>
          <PixelImage
            type={'news-profile'}
            source={profilePictureUrl}
            pixelized={pixelizedProfilePicture}
            index={index}
            pixelPerLine={30}
          />
        </div>
        <div className={'News-story__Wrapper__Text'}>
          <span>
            {links ? links.map((link, i) => {
              const { start, end } = link;
              let trailText = text!.slice(end);
              if (links[i + 1]) {
                trailText = text!.slice(end, links[i + 1].start);
              }
              return (
                <>
                  <b>
                    {text!.slice(start, end)}
                  </b>
                  {trailText}
                </>
              );
            }) : text}
          </span>
          <span className={'News-story__Wrapper__Text__Elapsed'}>
            {formatElapsedTime(createdAt)}
          </span>
        </div>
        {thumbnail &&
          <div className={'News-story__Wrapper__Thumbnail'}>
            <PixelImage
              type={'news-thumbnail'}
              source={thumbnailPictureUrl}
              pixelized={pixelizedThumbnail}
              index={index}
              pixelPerLine={50}
            />
          </div>}
      </div>
      {props.children}
    </div>
  );
};

export default NewsStory;
