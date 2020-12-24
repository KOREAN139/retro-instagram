/** @jsx jsx */
import { css, jsx, SerializedStyles } from '@emotion/react';
import classNames from 'classnames';
import React from 'react';

interface IconProps {
  id?: string;
  icon?: string;
  selected?: boolean;
  disabled?: boolean;
  customStyle?: SerializedStyles;
}

export type Props = IconProps & React.HTMLAttributes<HTMLDivElement>;

const Icon: React.FC<Props> = (props: Props) => {
  const { icon, disabled, customStyle } = props;
  return (
    <div
      className={classNames(
        'Icon',
        { Able: !disabled },
        { Disabled: disabled }
      )}
      css={[
        css`
          background-size: contain;
          background-repeat: no-repeat;
          background-image: url(${icon});
          background-position: 50% 50%;
          ${disabled && `opacity: 0.3;`}
        `,
        customStyle,
      ]}
    />
  );
};

export default Icon;
