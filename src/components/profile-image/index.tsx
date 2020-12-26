/** @jsx jsx */
import { css, jsx, SerializedStyles } from '@emotion/react';
import profileHolder from '@static/profile-holder.png';
import React from 'react';

interface ProfileImageProps {
  customStyle?: SerializedStyles;
}

export type Props = ProfileImageProps & React.HTMLAttributes<HTMLDivElement>;

const ProfileImage: React.FC<Props> = (props: Props) => {
  const { customStyle, children } = props;

  return (
    <div
      className='Profile-image'
      css={[
        customStyle,
        css`
          background-color: black;
          display: flex;
          position: relative;
        `,
      ]}
    >
      {children}
      <div
        className='Profile-image__Holder'
        css={[
          customStyle,
          css`
            position: absolute;
            background-image: url(${profileHolder});
            background-size: cover;
          `,
        ]}
      />
    </div>
  );
};

export default ProfileImage;
