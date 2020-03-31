import React, { useEffect, useRef } from 'react';
import './index.scss';
import Page from '@components/page';
import NewsStory from '@components/news-story';
import { RootState } from '@store';
import { useDispatch, useSelector } from 'react-redux';
import { getNews } from '@ducks/instagram';

const News = () => {
  const dispatch = useDispatch();

  const newsInfo = useSelector(
    (state: RootState) => state.instagram.newsInfo
  );
  const { news } = newsInfo;
  const loaded = news.every(news => {
    const { profilePicture, thumbnail } = news;
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
    <Page
      title={'News'}
      loaded={loaded}
    >
      <div className={'News-page-container'}>
        <div className={'News-page-container__Contents'}>
          <div
            className={'News-page-container__Contents__Scrollable'}
            ref={containerRef}
          >
            {news && news.map((newsInfo, i) => {
              return (
                <NewsStory
                  newsInfo={newsInfo}
                  index={i}
                  key={i}
                />
              );
            })}
            <div
              className={'News-page-container__Contents__Scrollable__Bottom'}
              ref={bottomRef}
            />
          </div>
        </div>
      </div>
    </Page>
  );
};

export default News;
