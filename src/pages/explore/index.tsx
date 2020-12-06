import './index.scss';

import Page from '@components/page';
import React from 'react';

const Explore = () => {
  return (
    <Page title='Explore' loaded>
      <div className='Explore-page-container'>
        <div className='Explore-page-container__Contents'>
          <div className='Explore-page-container__Contents__Scrollable' />
        </div>
      </div>
    </Page>
  );
};

export default Explore;
