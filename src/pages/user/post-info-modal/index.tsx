/** @jsx jsx */
import Button from '@components/button';
import TitleBar from '@components/title-bar';
import { css, jsx, keyframes } from '@emotion/react';
import backgroundPattern from '@static/background-pattern.png';
import { defaultBoxShadow } from '@styles/mixins';
import { modalContainer, overlay } from '@styles/placeholders';
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

const retroZoomIn = keyframes`
from {
  width: 0;
  height: 0;
}
`;

const showAfterSeconds = keyframes`
to {
  visibility: visible;
}
`;

const buttonStyle = css`
  font-size: 12px;
  width: 60px;
  height: 20px;
`;

const PostInfoModal: React.FC<Props> = (props: Props) => {
  const { onClickClose, likeCount, commentCount } = props;

  return (
    <React.Fragment>
      <div className='Post-info-modal-overlay' css={overlay} />
      <div
        className='Post-info-modal-animation'
        css={[
          modalContainer,
          css`
            border: solid 2px white;
            padding: 0;

            width: 60%;
            height: 96px;

            animation: ${retroZoomIn} 0.3s steps(7);
          `,
        ]}
      />
      <div
        className='Post-info-modal-container'
        css={[
          defaultBoxShadow(1.6),
          modalContainer,
          css`
            display: flex;
            flex-direction: column;
            width: 60%;

            background-image: url(${backgroundPattern});

            visibility: hidden;
            animation: ${showAfterSeconds} 0s 0.3s forwards;

            .Title-bar {
              &__Title {
                margin-left: 6px;
              }
            }
          `,
        ]}
      >
        <TitleBar
          displayIcon={false}
          location='Post-info-modal'
          title='Congratulation!'
          onClickClose={onClickClose}
        />
        <div
          className='Post-info-modal-container__Text'
          css={css`
            margin-top: 15px;
            margin-bottom: 10px;
            padding: 0 15px;
            font-size: 13px;
            text-align: center;
            overflow-wrap: break-word;
            word-wrap: break-word;
            word-break: break-all;
            white-space: pre-line;
          `}
        >
          {formatText(likeCount, commentCount)}
        </div>
        <div
          className='Post-info-modal-container__Buttons'
          css={css`
            width: 95%;
            display: flex;
            align-self: center;
            margin-top: 5px;
            margin-bottom: 4px;
            justify-content: center;

            .Button + .Button {
              margin-left: 6px;
            }
          `}
        >
          <Button
            id='Ok'
            text='OK'
            onClick={onClickClose}
            customStyle={buttonStyle}
          />
          <Button
            id='Cancel'
            text='Cancel'
            onClick={onClickClose}
            customStyle={buttonStyle}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default PostInfoModal;
