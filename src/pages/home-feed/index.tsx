/** @jsx jsx */
import Page from '@components/page';
import Post from '@components/post';
import { getTimeline } from '@ducks/instagram';
import { css, jsx } from '@emotion/react';
import { RootState } from '@store';
import { scrollableBoxShadow } from '@styles/mixins';
import {
  scrollableBoxContainer,
  scrollableBoxVertical,
} from '@styles/placeholders';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const HomeFeed = () => {
  const dispatch = useDispatch();

  const userPk: number = useSelector(
    (state: RootState) => state.instagram.userPk
  );

  const timelineInfo = useSelector(
    (state: RootState) => state.instagram.timelineInfo
  );
  const { moreAvailable, posts } = timelineInfo;
  const loaded = posts.every((item) => {
    const { user, post } = item;
    return !!user.profilePicture.pixelizedMediaUrl && !!post.pixelizedMediaUrl;
  });

  const containerRef = useRef(null);
  const bottomRef = useRef(null);
  useEffect(() => {
    const onIntersect = ([{ isIntersecting }]: IntersectionObserverEntry[]) => {
      if (isIntersecting && moreAvailable) {
        dispatch(getTimeline());
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
    <Page title='Feed' loaded={loaded}>
      <div
        className='Home-feed-container'
        css={css`
          flex: 1;
          display: flex;
          flex-direction: column;
        `}
      >
        <div
          className='Home-feed-container__Contents'
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
            className='Home-feed-container__Contents__Scrollable'
            ref={containerRef}
            css={scrollableBoxVertical}
          >
            {posts &&
              posts.map((post, i) => {
                return (
                  <Post
                    postInfo={post.post}
                    userInfo={post.user}
                    index={i}
                    key={post.post.id}
                  />
                );
              })}
            <div
              className='Home-feed-container__Contents__Scrollable__Bottom'
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

export default HomeFeed;
