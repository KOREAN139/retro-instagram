/** @jsx jsx */
import Page from '@components/page';
import ScrollableBox from '@components/scrollable-box';
import { css, jsx } from '@emotion/react';

const Explore = () => {
  return (
    <Page title='Explore' loaded>
      <div
        className='Explore-page-container'
        css={css`
          flex: 1;
          display: flex;
          flex-direction: column;
        `}
      >
        <ScrollableBox />
      </div>
    </Page>
  );
};

export default Explore;
