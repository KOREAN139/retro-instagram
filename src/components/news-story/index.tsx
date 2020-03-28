import React from 'react';
import './index.scss';
import PixelImage from '../pixel-image';
import {
  NewsItem
} from 'retro-instagram';

interface NewsStoryProps {
  newsInfo: NewsItem
  index: number
}

export type Props = NewsStoryProps & React.HTMLAttributes<HTMLDivElement>;

const NewsStory: React.FC<Props> = (props) => {
  const { newsInfo, index } = props;
  const { text, profilePicture, thumbnail } = newsInfo;

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
          {text}
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
