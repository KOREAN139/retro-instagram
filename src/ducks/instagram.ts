import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import * as InstagramAPI from '../api/instagram';
import { showLoadingPage } from './loading';
import {
  UserRepositoryInfoResponseUser,
  GetUserFeedResponse,
  GetTimelineResponse,
  GetNewsResponse
} from 'instagram-private-api';
import {
  DetailUserInfo,
  UserPostInfo,
  CommentItem,
  TimelineInfo,
  NewsInfo
} from 'retro-instagram';

interface InstagramState {
  signedIn: boolean
  userPk: number
  userInfo: DetailUserInfo | null
  userPostInfo: UserPostInfo
  timelineInfo: TimelineInfo
  newsInfo: NewsInfo
};

interface SetPixelizedUrlPayload {
  index: number
  pixelizedMediaUrl: string
};

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
      state.signedIn = true;
      state.userPk = action.payload;
    },
    signInInstagramFailed(state, action: PayloadAction<string>) {
    },
    getSignedInUserInfoSuccess(state, action: PayloadAction<UserRepositoryInfoResponseUser>) {
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

      state.userInfo = {
        username,
        fullName,
        profilePicture: { mediaUrl },
        mediaCount,
        followerCount,
        followingCount,
        biography,
        externalUrl,
      };
    },
    getSignedInUserInfoFailed(state, action: PayloadAction<string>) {
    },
    getUserPostsSuccess(state, action: PayloadAction<GetUserFeedResponse>) {
      const { moreAvailable, posts } = action.payload;
      state.userPostInfo.moreAvailable = moreAvailable;
      posts.forEach(post => {
        const mediaType = post.carousel_media ? 'Carousel' :
          post.video_versions ? 'Video' : 'Photo';

        const mediaUrl = post.carousel_media ?
          post.carousel_media[0].image_versions2.candidates[0].url :
          post.image_versions2.candidates[0].url;

        const {
          like_count: likeCount,
          comment_count: commentCount,
          preview_comments: previewCommentInfo,
        } = post;

        const previewComments: CommentItem[] = [];
        if (previewCommentInfo && previewCommentInfo.length) {
          previewCommentInfo.forEach(comment => {
            const { user, text } = comment;
            const { username } = user;
            return previewComments.push({ username, text });
          })
        }

        state.userPostInfo.posts.push({
          mediaType,
          mediaUrl,
          commentCount,
          previewComments,
          likeCount,
        });
      });
    },
    getUserPostsFailed(state, action:PayloadAction<string>) {
    },
    getTimelineSuccesss(state, action:PayloadAction<GetTimelineResponse>) {
      const { moreAvailable, posts } = action.payload;
      const postsWithoutAd = posts.filter(p => !p.injected);

      state.timelineInfo.moreAvailable = moreAvailable;
      if (!postsWithoutAd.length) {
        return;
      }

      postsWithoutAd.forEach(post => {
        const mediaType = post.carousel_media ? 'Carousel' :
          post.video_versions ? 'Video' : 'Photo';

        const mediaUrl = post.carousel_media ?
          post.carousel_media[0].image_versions2.candidates[0].url :
          post.image_versions2!.candidates[0].url;

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
          previewCommentInfo.forEach(comment => {
            const { user, text } = comment;
            const { username } = user;
            return previewComments.push({ username, text });
          })
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

        state.timelineInfo.posts.push({
          user: userInfo,
          post: postWithCaption,
        });
      });
    },
    getTimelineFailed(state, action:PayloadAction<string>) {
    },
    getNewsSuccess(state, action:PayloadAction<GetNewsResponse>) {
      const {
        partition,
        new_stories: newStories,
        old_stories: oldStories,
      } = action.payload;

      const { time_bucket: timePartition } = partition;
      state.newsInfo.timePartition = timePartition;

      const stories = [...newStories, ...oldStories];
      const storiesWithProfile = stories.filter(s => s.args.profile_image);
      storiesWithProfile.forEach(story => {
        const { args } = story;
        const {
          text,
          links,
          media,
          profile_image: profilePictureUrl,
        } = args;

        let thumbnail = undefined;
        if (media && media.length) {
          thumbnail = { mediaUrl: media[0].image };
        }

        state.newsInfo.news.push({
          text,
          links,
          thumbnail,
          profilePicture: { mediaUrl: profilePictureUrl! },
        });
      });
    },
    getNewsFailed(state, action:PayloadAction<string>) {
    },
    setPixelizedUserProfile(state, action: PayloadAction<string>) {
      state.userInfo!.profilePicture.pixelizedMediaUrl = action.payload;
    },
    setPixelizedUserPost(state, action: PayloadAction<SetPixelizedUrlPayload>) {
      const { index, pixelizedMediaUrl } = action.payload;
      state.userPostInfo.posts[index].pixelizedMediaUrl = pixelizedMediaUrl;
    },
    setPixelizedNewsProfile(state, action: PayloadAction<SetPixelizedUrlPayload>) {
      const { index, pixelizedMediaUrl } = action.payload;
      state.newsInfo.news[index].profilePicture.pixelizedMediaUrl = pixelizedMediaUrl;
    },
    setPixelizedNewsThumbnail(state, action: PayloadAction<SetPixelizedUrlPayload>) {
      const { index, pixelizedMediaUrl } = action.payload;
      state.newsInfo.news[index].thumbnail!.pixelizedMediaUrl = pixelizedMediaUrl;
    },
    setPixelizedTimelineProfile(state, action: PayloadAction<SetPixelizedUrlPayload>) {
      const { index, pixelizedMediaUrl } = action.payload;
      state.timelineInfo.posts[index].user.profilePicture.pixelizedMediaUrl = pixelizedMediaUrl;
    },
    setPixelizedTimelinePost(state, action: PayloadAction<SetPixelizedUrlPayload>) {
      const { index, pixelizedMediaUrl } = action.payload;
      state.timelineInfo.posts[index].post.pixelizedMediaUrl = pixelizedMediaUrl;
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
      console.error(err);
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

export const getTimeline = (userPk: number) =>
  showLoadingPage(async (dispatch: Dispatch) => {
    try {
      const timeline = await InstagramAPI.getTimeline(userPk);
      await InstagramAPI.getNews();
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
) =>
  (dispatch: Dispatch) => {
    switch (type) {
      case 'feed-post':
        dispatch(setPixelizedTimelinePost({index: idx!, pixelizedMediaUrl}));
        break;
      case 'feed-profile':
        dispatch(setPixelizedTimelineProfile({index: idx!, pixelizedMediaUrl}));
        break;
      case 'news-thumbnail':
        dispatch(setPixelizedNewsThumbnail({index: idx!, pixelizedMediaUrl}));
        break;
      case 'news-profile':
        dispatch(setPixelizedNewsProfile({index: idx!, pixelizedMediaUrl}));
        break;
      case 'user-thumbnail':
        dispatch(setPixelizedUserPost({index: idx!, pixelizedMediaUrl}));
        break;
      case 'user-profile':
        dispatch(setPixelizedUserProfile(pixelizedMediaUrl));
        break;
    }
  };
