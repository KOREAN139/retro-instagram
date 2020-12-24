/** @jsx jsx */
import Page from '@components/page';
import Post from '@components/post';
import ScrollableBox from '@components/scrollable-box';
import { getTimeline } from '@ducks/instagram';
import { css, jsx } from '@emotion/react';
import { RootState } from '@store';
import { useCallback, useEffect } from 'react';
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

  const fetchPosts = useCallback(() => {
    if (moreAvailable) {
      dispatch(getTimeline());
    }
  }, [moreAvailable, dispatch]);

  useEffect(() => {
    fetchPosts();
  }, [userPk, fetchPosts]);

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
        <ScrollableBox onBottom={fetchPosts}>
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
        </ScrollableBox>
      </div>
    </Page>
  );
};

export default HomeFeed;
