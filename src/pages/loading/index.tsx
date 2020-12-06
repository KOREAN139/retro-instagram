import './index.scss';

import { RootState } from '@store';
import classNames from 'classnames';
import React from 'react';
import { useSelector } from 'react-redux';

const Loading = () => {
  const loading = useSelector((state: RootState) => state.loading.loading);

  return (
    <div
      className={classNames('Loading', { On: loading }, { Off: !loading })}
    />
  );
};

export default Loading;
