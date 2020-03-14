import React from 'react';
import './index.scss';
import Page from '../../components/page';

const HomeFeed = () => {
  return (
    <Page title={'Feed'}>
      <div className={'Home-feed-container'}>
        <div className={'Home-feed-container__Contents'}>
          <div className={'Home-feed-container__Contents__Scrollable'}>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default HomeFeed;
