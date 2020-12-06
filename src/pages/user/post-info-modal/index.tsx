import './index.scss';

import Button from '@components/button';
import TitleBar from '@components/title-bar';
import React from 'react';

interface Props {
  likeCount: number;
  commentCount: number;
  onClickClose: () => void;
}

const formatText = (likeCount: number, commentCount: number) => {
  let likePhrase = '';
  let commentPhrase = '';

  if (likeCount) {
    likePhrase = `${likeCount} like`;
    if (likeCount > 1) {
      likePhrase += 's';
    }
  }

  if (commentCount) {
    commentPhrase = `${commentCount} comment`;
    if (commentCount > 1) {
      commentPhrase += 's';
    }
  }

  if (likePhrase || commentPhrase) {
    if (likePhrase && commentPhrase) {
      return `You earn ${likePhrase}\n and ${commentPhrase}`;
    }
    return `You earn ${likePhrase}${commentPhrase}`;
  }

  return `You earned no reaction yet :(`;
};

const PostInfoModal: React.FC<Props> = (props: Props) => {
  const { onClickClose, likeCount, commentCount } = props;

  return (
    <>
      <div className='Post-info-modal-overlay' />
      <div className='Post-info-modal-animation' />
      <div className='Post-info-modal-container'>
        <TitleBar
          displayIcon={false}
          location='Post-info-modal'
          title='Congratulation!'
          onClickClose={onClickClose}
        />
        <div className='Post-info-modal-container__Text'>
          {formatText(likeCount, commentCount)}
        </div>
        <div className='Post-info-modal-container__Buttons'>
          <Button location='Post-info-modal' text='OK' onClick={onClickClose} />
          <Button
            location='Post-info-modal'
            text='Cancel'
            onClick={onClickClose}
          />
        </div>
      </div>
    </>
  );
};

export default PostInfoModal;
