import React, { useEffect, useRef } from 'react';
import './index.scss';
import Page from '../../components/page';
import Post from '../../components/post';
import { RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { getTimeline } from '../../ducks/instagram';

const HomeFeed = () => {
  const dispatch = useDispatch();

  const userPk: number = useSelector(
    (state: RootState) => state.instagram.userPk
  );

  const timelineInfo = useSelector(
    (state: RootState) => state.instagram.timelineInfo
  );
  const { moreAvailable, posts } = timelineInfo;
  const loaded = posts.every(item => {
    const { user, post } = item;
    return !!user.profilePicture.pixelizedMediaUrl && !!post.pixelizedMediaUrl;
  });

  const containerRef = useRef(null);
  const bottomRef = useRef(null);
  useEffect(() => {
    const onIntersect = ([{ isIntersecting }]: IntersectionObserverEntry[]) => {
      if (isIntersecting && moreAvailable) {
        dispatch(getTimeline(userPk));
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
  }, [userPk, moreAvailable, containerRef, bottomRef, dispatch]);

  return (
    <Page
      title={'Feed'}
      loaded={loaded}
    >
      <div className={'Home-feed-container'}>
        <div className={'Home-feed-container__Contents'}>
          <div
            className={'Home-feed-container__Contents__Scrollable'}
            ref={containerRef}
          >
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
            <div
              className={'Home-feed-container__Contents__Scrollable__Bottom'}
              ref={bottomRef}
            />
          </div>
        </div>
      </div>
    </Page>
  );
};

export default HomeFeed;
