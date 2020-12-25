/** @jsx jsx */
import Header from '@components/header';
import { css, jsx } from '@emotion/react';
import progressCursor from '@static/cursor-progress.png';
import classnames from 'classnames';
import React from 'react';

interface PageProps {
  title: string;
  loaded: boolean;
  backButton?: boolean;
  reloadButton?: boolean;
}

export type Props = PageProps & React.HTMLAttributes<HTMLDivElement>;

const Page: React.FC<Props> = (props: Props) => {
  const { title, loaded, backButton, reloadButton, children } = props;

  return (
    <div
      className={classnames('Page', { 'On-loading': !loaded })}
      css={css`
        display: flex;
        flex-direction: column;
        flex: 1;
        width: 308px;

        ${!loaded && `cursor: url(${progressCursor}), progress;`}
      `}
    >
      <Header
        title={title}
        backButton={backButton}
        reloadButton={reloadButton}
      />
      {children}
    </div>
  );
};

export default Page;
