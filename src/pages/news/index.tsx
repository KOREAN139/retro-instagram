/** @jsx jsx */
import NewsStory from '@components/news-story';
import Page from '@components/page';
import ScrollableBox from '@components/scrollable-box';
import { getNews } from '@ducks/instagram';
import { css, jsx } from '@emotion/react';
import { RootState } from '@store';
import { useCallback } from 'react';
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

  const fetchNews = useCallback(() => {
    if (!news.length) {
      dispatch(getNews());
    }
  }, [news, dispatch]);

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
        <ScrollableBox onBottom={fetchNews}>
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
        </ScrollableBox>
      </div>
    </Page>
  );
};

export default News;
