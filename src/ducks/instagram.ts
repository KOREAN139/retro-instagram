import * as InstagramAPI from '@api/instagram';
import { showLoadingPage } from '@ducks/loading';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  GetNewsResponse,
  GetTimelineResponse,
  GetUserFeedResponse,
  GetUserInfoResponse,
} from 'instagram-private-api';
import { Dispatch } from 'redux';
import {
  CommentItem,
  DetailUserInfo,
  NewsInfo,
  TimelineInfo,
  UserPostInfo,
} from 'retro-instagram'; /* eslint-disable-line import/no-unresolved */

interface InstagramState {
  signedIn: boolean;
  userPk: number;
  userInfo: DetailUserInfo | null;
  userPostInfo: UserPostInfo;
  timelineInfo: TimelineInfo;
  newsInfo: NewsInfo;
}

interface SetPixelizedUrlPayload {
  index: number;
  pixelizedMediaUrl: string;
}

const initialState: InstagramState = {
  signedIn: false,
  userPk: 0,
  userInfo: null,
  userPostInfo: {
    moreAvailable: true,
    posts: [],
  },
  timelineInfo: {
    moreAvailable: true,
    posts: [],
  },
  newsInfo: {
    news: [],
    timePartition: {
      headers: [],
      indices: [],
    },
  },
};

const instagramDetails = createSlice({
  name: 'instagram',
  initialState,
  reducers: {
    signInInstagramSuccess(state, action: PayloadAction<number>) {
      return {
        ...state,
        signedIn: true,
        userPk: action.payload,
      };
    },
    /* eslint-disable-next-line no-unused-vars */
    signInInstagramFailed(state, action: PayloadAction<string>) {},
    getSignedInUserInfoSuccess(
      state,
      action: PayloadAction<GetUserInfoResponse>
    ) {
      const {
        username,
        full_name: fullName,
        profile_pic_url: mediaUrl,
        media_count: mediaCount,
        follower_count: followerCount,
        following_count: followingCount,
        biography,
        external_url: externalUrl,
      } = action.payload;

      const userInfo = {
        username,
        fullName,
        profilePicture: { mediaUrl },
        mediaCount,
        followerCount,
        followingCount,
        biography,
        externalUrl,
      };

      return {
        ...state,
        userInfo,
      };
    },
    /* eslint-disable-next-line no-unused-vars */
    getSignedInUserInfoFailed(state, action: PayloadAction<string>) {},
    getUserPostsSuccess(state, action: PayloadAction<GetUserFeedResponse>) {
      const { moreAvailable, posts: olderPosts } = action.payload;
      const { userPostInfo } = state;
      const { posts } = userPostInfo;
      const olderPostsWithCaption = olderPosts.map((post) => {
        let mediaType = 'Carousel';
        if (!post.carousel_media) {
          mediaType = post.video_versions ? 'Video' : 'Photo';
        }

        const mediaUrl = post.carousel_media
          ? post.carousel_media[0].image_versions2.candidates[0].url
          : post.image_versions2.candidates[0].url;

        const {
          id,
          caption: captionInfo,
          taken_at: takenAt,
          has_liked: hasLiked,
          like_count: likeCount,
          comment_count: commentCount,
          preview_comments: previewCommentInfo,
        } = post;

        const previewComments: CommentItem[] = [];
        if (previewCommentInfo && previewCommentInfo.length) {
          previewCommentInfo.forEach((comment) => {
            const { pk, user, text } = comment;
            const { username } = user;
            return previewComments.push({ pk, username, text });
          });
        }

        const caption = {
          username: captionInfo ? captionInfo.user.username : '',
          text: captionInfo ? captionInfo.text : '',
        };

        const postWithCaption = {
          id,
          mediaType,
          mediaUrl,
          commentCount,
          previewComments,
          hasLiked,
          likeCount,
          caption,
          createdAt: takenAt * 1000,
        };

        return postWithCaption;
      });

      return {
        ...state,
        userPostInfo: {
          ...userPostInfo,
          moreAvailable,
          posts: posts.concat(olderPostsWithCaption),
        },
      };
    },
    /* eslint-disable-next-line no-unused-vars */
    getUserPostsFailed(state, action: PayloadAction<string>) {},
    getTimelineSuccesss(state, action: PayloadAction<GetTimelineResponse>) {
      const { moreAvailable, posts: olderPosts } = action.payload;
      const postsWithoutAd = olderPosts.filter((p) => !p.injected);

      const { timelineInfo } = state;
      if (!postsWithoutAd.length) {
        return {
          ...state,
          timelineInfo: {
            ...timelineInfo,
            moreAvailable,
          },
        };
      }

      const olderPostsWithCaption = postsWithoutAd.map((post) => {
        let mediaType = 'Carousel';
        if (!post.carousel_media) {
          mediaType = post.video_versions ? 'Video' : 'Photo';
        }

        const mediaUrl = post.carousel_media
          ? post.carousel_media[0].image_versions2.candidates[0].url
          : post.image_versions2!.candidates[0].url;

        const {
          id,
          user,
          caption: captionInfo,
          taken_at: takenAt,
          has_liked: hasLiked,
          like_count: likeCount,
          comment_count: commentCount,
          preview_comments: previewCommentInfo,
        } = post;

        const userInfo = {
          username: user.username,
          profilePicture: {
            mediaUrl: user.profile_pic_url,
          },
        };

        const previewComments: CommentItem[] = [];
        if (previewCommentInfo && previewCommentInfo.length) {
          previewCommentInfo.forEach((comment) => {
            const { pk, user: commenter, text } = comment;
            const { username } = commenter;
            return previewComments.push({ pk, username, text });
          });
        }

        const caption = {
          username: captionInfo ? captionInfo.user.username : '',
          text: captionInfo ? captionInfo.text : '',
        };

        const postWithCaption = {
          id,
          mediaType,
          mediaUrl,
          commentCount,
          previewComments,
          hasLiked,
          likeCount,
          caption,
          createdAt: takenAt * 1000,
        };

        return {
          user: userInfo,
          post: postWithCaption,
        };
      });

      const { posts } = timelineInfo;
      return {
        ...state,
        timelineInfo: {
          ...timelineInfo,
          moreAvailable,
          posts: posts.concat(olderPostsWithCaption),
        },
      };
    },
    /* eslint-disable-next-line no-unused-vars */
    getTimelineFailed(state, action: PayloadAction<string>) {},
    getNewsSuccess(state, action: PayloadAction<GetNewsResponse>) {
      const {
        partition,
        new_stories: newStories,
        old_stories: oldStories,
      } = action.payload;

      const { time_bucket: timePartition } = partition;

      const stories = [...newStories, ...oldStories];
      const storiesWithProfile = stories.filter((s) => s.args.profile_image);
      const olderNews = storiesWithProfile.map((story) => {
        const { args } = story;
        const {
          text,
          links,
          media,
          timestamp,
          profile_image: profilePictureUrl,
        } = args;

        let thumbnail;
        if (media && media.length) {
          thumbnail = { mediaUrl: media[0].image };
        }

        const createdAt = parseInt(timestamp, 10);

        return {
          text,
          links,
          thumbnail,
          createdAt,
          profilePicture: { mediaUrl: profilePictureUrl! },
        };
      });

      const { newsInfo } = state;
      const { news } = newsInfo;
      return {
        ...state,
        newsInfo: {
          ...newsInfo,
          timePartition,
          news: news.concat(olderNews),
        },
      };
    },
    /* eslint-disable-next-line no-unused-vars */
    getNewsFailed(state, action: PayloadAction<string>) {},
    setPixelizedUserProfile(state, action: PayloadAction<string>) {
      const { userInfo } = state;
      if (!userInfo) {
        return state;
      }

      const { profilePicture } = userInfo;
      return {
        ...state,
        userInfo: {
          ...userInfo,
          profilePicture: {
            ...profilePicture,
            pixelizedMediaUrl: action.payload,
          },
        },
      };
    },
    setPixelizedUserPost(state, action: PayloadAction<SetPixelizedUrlPayload>) {
      const { index, pixelizedMediaUrl } = action.payload;
      const { userPostInfo } = state;
      const { posts } = userPostInfo;
      posts[index].pixelizedMediaUrl = pixelizedMediaUrl;

      return {
        ...state,
        userPostInfo: {
          ...userPostInfo,
          posts,
        },
      };
    },
    setPixelizedNewsProfile(
      state,
      action: PayloadAction<SetPixelizedUrlPayload>
    ) {
      const { index, pixelizedMediaUrl } = action.payload;
      const { newsInfo } = state;
      const { news } = newsInfo;
      news[index].profilePicture.pixelizedMediaUrl = pixelizedMediaUrl;

      return {
        ...state,
        newsInfo: {
          ...newsInfo,
          news,
        },
      };
    },
    setPixelizedNewsThumbnail(
      state,
      action: PayloadAction<SetPixelizedUrlPayload>
    ) {
      const { index, pixelizedMediaUrl } = action.payload;
      const { newsInfo } = state;
      const { news } = newsInfo;
      news[index].thumbnail!.pixelizedMediaUrl = pixelizedMediaUrl;

      return {
        ...state,
        newsInfo: {
          ...newsInfo,
          news,
        },
      };
    },
    setPixelizedTimelineProfile(
      state,
      action: PayloadAction<SetPixelizedUrlPayload>
    ) {
      const { index, pixelizedMediaUrl } = action.payload;
      const { timelineInfo } = state;
      const { posts } = timelineInfo;
      posts[index].user.profilePicture.pixelizedMediaUrl = pixelizedMediaUrl;

      return {
        ...state,
        timelineInfo: {
          ...timelineInfo,
          posts,
        },
      };
    },
    setPixelizedTimelinePost(
      state,
      action: PayloadAction<SetPixelizedUrlPayload>
    ) {
      const { index, pixelizedMediaUrl } = action.payload;
      const { timelineInfo } = state;
      const { posts } = timelineInfo;
      posts[index].post.pixelizedMediaUrl = pixelizedMediaUrl;

      return {
        ...state,
        timelineInfo: {
          ...timelineInfo,
          posts,
        },
      };
    },
  },
});

export const {
  signInInstagramSuccess,
  signInInstagramFailed,
  getSignedInUserInfoSuccess,
  getSignedInUserInfoFailed,
  getUserPostsSuccess,
  getUserPostsFailed,
  getTimelineSuccesss,
  getTimelineFailed,
  getNewsSuccess,
  getNewsFailed,
  setPixelizedUserProfile,
  setPixelizedUserPost,
  setPixelizedNewsProfile,
  setPixelizedNewsThumbnail,
  setPixelizedTimelineProfile,
  setPixelizedTimelinePost,
} = instagramDetails.actions;

export default instagramDetails.reducer;

export const signInInstagram = (username: string, password: string) =>
  showLoadingPage(async (dispatch: Dispatch) => {
    try {
      const pk = await InstagramAPI.signIn(username, password);
      dispatch(signInInstagramSuccess(pk));
    } catch (err) {
      dispatch(signInInstagramFailed(err.toString()));
    }
  });

export const getSignedInUserInfo = (userPk: number) =>
  showLoadingPage(async (dispatch: Dispatch) => {
    try {
      const info = await InstagramAPI.getUserInfo(userPk);
      dispatch(getSignedInUserInfoSuccess(info));
    } catch (err) {
      dispatch(getSignedInUserInfoFailed(err.toString()));
    }
  });

export const getUserPosts = (userPk: number) =>
  showLoadingPage(async (dispatch: Dispatch) => {
    try {
      const posts = await InstagramAPI.getUserPosts(userPk);
      dispatch(getUserPostsSuccess(posts));
    } catch (err) {
      dispatch(getUserPostsFailed(err.toString()));
    }
  });

export const getTimeline = () =>
  showLoadingPage(async (dispatch: Dispatch) => {
    try {
      const timeline = await InstagramAPI.getTimeline();
      dispatch(getTimelineSuccesss(timeline));
    } catch (err) {
      dispatch(getTimelineFailed(err.toString()));
    }
  });

export const getNews = () =>
  showLoadingPage(async (dispatch: Dispatch) => {
    try {
      const news = await InstagramAPI.getNews();
      dispatch(getNewsSuccess(news));
    } catch (err) {
      dispatch(getNewsFailed(err.toString()));
    }
  });

export const setPixelizedUrl = (
  type: string,
  pixelizedMediaUrl: string,
  idx?: number
) => (dispatch: Dispatch) => {
  switch (type) {
    case 'feed-post':
      dispatch(setPixelizedTimelinePost({ index: idx!, pixelizedMediaUrl }));
      break;
    case 'feed-profile':
      dispatch(setPixelizedTimelineProfile({ index: idx!, pixelizedMediaUrl }));
      break;
    case 'news-thumbnail':
      dispatch(setPixelizedNewsThumbnail({ index: idx!, pixelizedMediaUrl }));
      break;
    case 'news-profile':
      dispatch(setPixelizedNewsProfile({ index: idx!, pixelizedMediaUrl }));
      break;
    case 'user-thumbnail':
      dispatch(setPixelizedUserPost({ index: idx!, pixelizedMediaUrl }));
      break;
    case 'user-profile':
      dispatch(setPixelizedUserProfile(pixelizedMediaUrl));
      break;
    default:
      break;
  }
};
