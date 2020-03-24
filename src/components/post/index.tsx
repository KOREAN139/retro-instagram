import React from 'react';
import './index.scss';
import Button from '../../components/button';
import PixelImage from '../../components/pixel-image';

interface PostProps {
  source: string
  pixelized: boolean
  index: number
}

export type Props = PostProps & React.HTMLAttributes<HTMLDivElement>;

const Post: React.FC<Props> = (props) => {
  const { source, pixelized, index, ...otherProps } = props;

  return (
    <div
      className={'Post-container'}
      {...otherProps}
    >
      <div className={'Post-container__Header'}>
        <div className={'Post-container__Header__Profile-picture'}>
          <PixelImage
            type={'feed-profile'}
            source={source}
            pixelized={pixelized}
            index={index}
          />
        </div>
        <div className={'Post-container__Header__Username'}>
          {`username`}
        </div>
      </div>
      <div className={'Post-container__Media'}>
        <PixelImage
          type={'feed-post'}
          source={source}
          pixelized={pixelized}
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
      <div className={'Post-container__Likes'}>
        <div className={'Post-container__Likes__Icon'} />
        <div className={'Post-container__Likes__Number'}>
          {`139 likes`}
        </div>
      </div>
      <div className={'Post-container__Info'}>
        <span className={'Post-container__Info__Username'}>
          {`username`}
        </span>
        {`sample comment`}
      </div>
      <div className={'Post-container__Comments'}>
        <div className={'Post-container__Comments__More'}>
          View all {'139'} Comments
        </div>
        <div className={'Post-container__Comments__Preview'}>
          <span className={'Post-container__Comments__Preview__Username'}>
            {`username`}
          </span>
          {`sample comment`}
        </div>
        <div className={'Post-container__Comments__Preview'}>
          <span className={'Post-container__Comments__Preview__Username'}>
            {`username`}
          </span>
          {`sample comment`}
        </div>
      </div>
      <div className={'Post-container__Additional'}>
        <span className={'Post-container__Additional__Date'}>
          {`19 SEPTEMBER 2019 . `}
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
