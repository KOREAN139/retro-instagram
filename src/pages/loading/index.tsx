/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import waitCursor from '@static/cursor-wait.png';
import { RootState } from '@store';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

const Loading = () => {
  const loading = useSelector((state: RootState) => state.loading.loading);

  return (
    <div
      className={classNames('Loading', { On: loading }, { Off: !loading })}
      css={css`
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 139139;
        cursor: url(${waitCursor}), wait;

        ${loading && `display: block;`}
        ${!loading && `display: none;`}
      `}
    />
  );
};

export default Loading;
