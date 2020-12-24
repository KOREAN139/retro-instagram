/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React from 'react';

interface PageContainerProps {}

export type Props = PageContainerProps & React.HTMLAttributes<HTMLDivElement>;

const PageContainer: React.FC<Props> = (props: Props) => {
  const { children } = props;
  return (
    <div
      className='Page-container'
      css={css`
        width: 308px;
        height: 487px;
        display: flex;
      `}
    >
      {children}
    </div>
  );
};
export default PageContainer;
