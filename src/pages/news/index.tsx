/** @jsx jsx */
import NewsStory from '@components/news-story';
import Page from '@components/page';
import { getNews } from '@ducks/instagram';
import { css, jsx } from '@emotion/react';
import { RootState } from '@store';
import { scrollableBoxShadow } from '@styles/mixins';
import {
  scrollableBoxContainer,
  scrollableBoxVertical,
} from '@styles/placeholders';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const News = () => {
  const dispatch = useDispatch();

  const newsInfo = useSelector((state: RootState) => state.instagram.newsInfo);
  const { news } = newsInfo;
  const loaded = news.every((newsItem) => {
    const { profilePicture, thumbnail } = newsItem;
    if (!thumbnail) {
      return !!profilePicture.pixelizedMediaUrl;
    }

    return !!profilePicture.pixelizedMediaUrl && !!thumbnail.pixelizedMediaUrl;
  });

  const containerRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    const onIntersect = ([{ isIntersecting }]: IntersectionObserverEntry[]) => {
      if (isIntersecting && !news.length) {
        dispatch(getNews());
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
  }, [news, containerRef, bottomRef, dispatch]);

  return (
    <Page title='News' loaded={loaded}>
      <div
        className='News-page-container'
        css={css`
          flex: 1;
          display: flex;
          flex-direction: column;
        `}
      >
        <div
          className='News-page-container__Contents'
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
            className='News-page-container__Contents__Scrollable'
            ref={containerRef}
            css={scrollableBoxVertical}
          >
            {news &&
              news.map((newsItem, i) => {
                const { profilePicture, createdAt } = newsItem;
                return (
                  <NewsStory
                    newsInfo={newsItem}
                    index={i}
                    key={`${profilePicture}_${createdAt}`}
                  />
                );
              })}
            <div
              className='News-page-container__Contents__Scrollable__Bottom'
              ref={bottomRef}
              css={css`
                width: 0;
                height: 0;
              `}
            />
          </div>
        </div>
      </div>
    </Page>
  );
};

export default News;
