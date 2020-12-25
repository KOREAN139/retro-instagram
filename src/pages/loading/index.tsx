/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import waitCursor from '@static/cursor-wait.png';
import { RootState } from '@store';
import { overlay } from '@styles/placeholders';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

const Loading = () => {
  const loading = useSelector((state: RootState) => state.loading.loading);

  return (
    <div
      className={classNames('Loading', { On: loading }, { Off: !loading })}
      css={[
        overlay,
        css`
          z-index: 139139;
          cursor: url(${waitCursor}), wait;

          ${loading && `display: block;`}
          ${!loading && `display: none;`}
        `,
      ]}
    />
  );
};

export default Loading;
