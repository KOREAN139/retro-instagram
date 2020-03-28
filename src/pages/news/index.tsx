import React, { useEffect } from 'react';
import './index.scss';
import Page from '../../components/page';
import NewsStory from '../../components/news-story';
import { RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { getNews } from '../../ducks/instagram';
import { useHistory } from 'react-router-dom';

const News = () => {
  const dispatch = useDispatch();
  const history = useHistory();

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

  useEffect(() => {
    const loadNewsInfo = async () => {
      if (news.length === 0) {
        await dispatch(getNews());
      }
    };

    loadNewsInfo();
  }, [dispatch, news, history]);

  return (
    <Page
      title={'News'}
      loaded={loaded}
    >
      <div className={'News-page-container'}>
        <div className={'News-page-container__Contents'}>
          <div className={'News-page-container__Contents__Scrollable'}>
            {news && news.map((newsInfo, i) => {
              return (
                <NewsStory
                  newsInfo={newsInfo}
                  index={i}
                  key={i}
                />
              );
            })}
          </div>
        </div>
      </div>
    </Page>
  );
};

export default News;
