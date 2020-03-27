import React from 'react';
import './index.scss';
import Page from '../../components/page';

const News = () => {
  return (
    <Page title={'News'}>
      <div className={'News-page-container'}>
        <div className={'News-page-container__Contents'}>
          <div className={'News-page-container__Contents__Scrollable'}>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default News;
