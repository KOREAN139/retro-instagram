/** @jsx jsx */
import { css, jsx, SerializedStyles } from '@emotion/react';
import { scrollableBoxShadow } from '@styles/mixins';
import {
  scrollableBoxContainer,
  scrollableBoxVertical,
} from '@styles/placeholders';
import React, { useEffect, useRef } from 'react';

interface ScrollableBoxProps {
  customStyle?: SerializedStyles;
  onBottom?: () => void;
}

export type Props = ScrollableBoxProps & React.HTMLAttributes<HTMLDivElement>;

const ScrollableBox: React.FC<Props> = (props: Props) => {
  const { customStyle, onBottom, children } = props;
  const containerRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    const onIntersect = ([{ isIntersecting }]: IntersectionObserverEntry[]) => {
      if (isIntersecting && onBottom) {
        onBottom();
      }
    };

    const observer = new IntersectionObserver(onIntersect, {
      root: containerRef.current,
      threshold: 1.0,
    });

    observer.observe(bottomRef.current!);

    return () => {
      observer.disconnect();
    };
  }, [containerRef, bottomRef, onBottom]);

  return (
    <div
      className='Scrollable-box__Container'
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
        className='Scrollable-box'
        ref={containerRef}
        css={[scrollableBoxVertical, customStyle]}
      >
        {children}
        <div
          className='Scrollable-box__Bottom'
          ref={bottomRef}
          css={css`
            width: 0;
            height: 0;
          `}
        />
      </div>
    </div>
  );
};

export default ScrollableBox;
