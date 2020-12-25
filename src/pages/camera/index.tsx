/** @jsx jsx */
import Page from '@components/page';
import { css, jsx } from '@emotion/react';

const Camera = () => {
  return (
    <Page title='Camera' loaded>
      <div
        className='Camera-page-container'
        css={css`
          flex: 1;
          display: flex;
        `}
      />
    </Page>
  );
};

export default Camera;
