import React from 'react';
import './index.scss';
import Page from '../../components/page';

const Likes = () => {
  return (
    <Page title={'Likes'}>
      <div className={'Likes-page-container'}>
        <div className={'Likes-page-container__Contents'}>
          <div className={'Likes-page-container__Contents__Scrollable'}>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default Likes;
