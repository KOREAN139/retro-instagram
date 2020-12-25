/** @jsx jsx */
import { css, jsx, SerializedStyles } from '@emotion/react';
import React from 'react';

interface IconProps {
  id?: string;
  icon: string;
  customStyle?: SerializedStyles;
}

export type Props = IconProps & React.HTMLAttributes<HTMLDivElement>;

const Icon: React.FC<Props> = (props: Props) => {
  const { icon, customStyle } = props;
  return (
    <div
      className='Icon'
      css={[
        css`
          background-size: contain;
          background-repeat: no-repeat;
          background-image: url(${icon});
          background-position: 50% 50%;
        `,
        customStyle,
      ]}
    />
  );
};

export default Icon;
