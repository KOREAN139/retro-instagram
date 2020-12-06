import './index.scss';

import NewsStory from '@components/news-story';
import Page from '@components/page';
import { getNews } from '@ducks/instagram';
import { RootState } from '@store';
import React, { useEffect, useRef } from 'react';
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
      <div className='News-page-container'>
        <div className='News-page-container__Contents'>
          <div
            className='News-page-container__Contents__Scrollable'
            ref={containerRef}
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
            />
          </div>
        </div>
      </div>
    </Page>
  );
};

export default News;
