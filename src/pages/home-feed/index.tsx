import React, { useEffect } from 'react';
import './index.scss';
import Page from '../../components/page';
import Post from '../../components/post';
import { RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { getTimeline } from '../../ducks/instagram';
import { useHistory } from 'react-router-dom';

const HomeFeed = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const userPk: number = useSelector(
    (state: RootState) => state.instagram.userPk
  );

  const timelineInfo = useSelector(
    (state: RootState) => state.instagram.timelineInfo
  );
  const { moreAvailable, posts } = timelineInfo;

  useEffect(() => {
    const loadTimelineInfo = async () => {
      if (moreAvailable) {
        await dispatch(getTimeline(userPk));
      }
    };

    loadTimelineInfo();
  }, [dispatch, userPk, moreAvailable, history]);

  return (
    <Page title={'Feed'}>
      <div className={'Home-feed-container'}>
        <div className={'Home-feed-container__Contents'}>
          <div className={'Home-feed-container__Contents__Scrollable'}>
            {posts && posts.map((post, i) => {
              return (
                <Post
                  postInfo={post.post}
                  userInfo={post.user}
                  pixelized={false}
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

export default HomeFeed;
