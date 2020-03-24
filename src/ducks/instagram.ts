import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import * as InstagramAPI from '../api/instagram';
import {
  UserRepositoryInfoResponseUser,
  GetUserFeedResponse,
  GetTimelineResponse
} from 'instagram-private-api';
import {
  DetailUserInfo,
  UserPostInfo,
  TimelineInfo
} from 'retro-instagram';

interface InstagramState {
  signedIn: boolean
  userPk: number
  userInfo: DetailUserInfo | null
  userPostInfo: UserPostInfo
  timelineInfo: TimelineInfo
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
  }
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
          has_more_comments: hasMoreComments,
          preview_comments: previewComments,
        } = post;

        state.userPostInfo.posts.push({
          mediaType,
          mediaUrl,
          commentCount,
          hasMoreComments,
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
          caption,
          has_liked: hasLiked,
          like_count: likeCount,
          comment_count: commentCount,
          has_more_comments: hasMoreComments,
          preview_comments: previewComments,
        } = post;

        const userInfo = {
          username: user.username,
          profilePicture: {
            mediaUrl: user.profile_pic_url,
          },
        };

        const postWithCaption = {
          id,
          mediaType,
          mediaUrl,
          commentCount,
          hasMoreComments,
          previewComments,
          hasLiked,
          likeCount,
          caption: caption.text,
        };

        state.timelineInfo.posts.push({
          user: userInfo,
          post: postWithCaption,
        });
      });
    },
    getTimelineFailed(state, action:PayloadAction<string>) {
    },
    setPixelizedUserProfile(state, action: PayloadAction<string>) {
      state.userInfo!.profilePicture.pixelizedMediaUrl = action.payload;
    },
    setPixelizedUserPost(state, action: PayloadAction<SetPixelizedUrlPayload>) {
      const { index, pixelizedMediaUrl } = action.payload;
      state.userPostInfo.posts[index].pixelizedMediaUrl = pixelizedMediaUrl;
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
  setPixelizedUserProfile,
  setPixelizedUserPost,
  setPixelizedTimelineProfile,
  setPixelizedTimelinePost,
} = instagramDetails.actions;

export default instagramDetails.reducer;

export const signInInstagram = (username: string, password: string) =>
  async (dispatch: Dispatch) => {
    try {
      const pk = await InstagramAPI.signIn(username, password);
      dispatch(signInInstagramSuccess(pk));
    } catch (err) {
      console.error(err);
      dispatch(signInInstagramFailed(err.toString()));
    }
  };

export const getSignedInUserInfo = (userPk: number) =>
  async (dispatch: Dispatch) => {
    try {
      const info = await InstagramAPI.getUserInfo(userPk);
      dispatch(getSignedInUserInfoSuccess(info));
    } catch (err) {
      dispatch(getSignedInUserInfoFailed(err.toString()));
    }
  };

export const getUserPosts = (userPk: number) =>
  async (dispatch: Dispatch) => {
    try {
      const posts = await InstagramAPI.getUserPosts(userPk);
      dispatch(getUserPostsSuccess(posts));
    } catch (err) {
      dispatch(getUserPostsFailed(err.toString()));
    }
  };

export const getTimeline = (userPk: number) =>
  async (dispatch: Dispatch) => {
    try {
      const timeline = await InstagramAPI.getTimeline(userPk);
      dispatch(getTimelineSuccesss(timeline));
    } catch (err) {
      dispatch(getTimelineFailed(err.toString()));
    }
  };

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
      case 'user-thumbnail':
        dispatch(setPixelizedUserPost({index: idx!, pixelizedMediaUrl}));
        break;
      case 'user-profile':
        dispatch(setPixelizedUserProfile(pixelizedMediaUrl));
        break;
    }
  };
