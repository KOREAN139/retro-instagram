/** @jsx jsx */
import Page from '@components/page';
import { css, jsx } from '@emotion/react';
import { scrollableBoxShadow } from '@styles/mixins';
import {
  scrollableBoxContainer,
  scrollableBoxVertical,
} from '@styles/placeholders';

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
        <div
          className='Explore-page-container__Contents'
          css={[
            scrollableBoxContainer,
            scrollableBoxShadow(),
            css`
              width: inherit;
              flex: 1;
              margin-top: 2px;
              padding: 2px;
            `,
          ]}
        >
          <div
            className='Explore-page-container__Contents__Scrollable'
            css={scrollableBoxVertical}
          />
        </div>
      </div>
    </Page>
  );
};

export default Explore;
