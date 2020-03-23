import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import * as InstagramAPI from '../api/instagram';
import {
  UserRepositoryInfoResponseUser,
  UserFeedResponseItemsItem
} from 'instagram-private-api';
import {
  MediaItem
} from 'retro-instagram';

interface InstagramState {
  signedIn: boolean
  userPk: number
  userInfo: UserRepositoryInfoResponseUser | null
  userPosts: MediaItem[]
};

interface SetPixelizedUrlPayload {
  index: number
  pixelizedMediaUrl: string
};

const initialState: InstagramState = {
  signedIn: false,
  userPk: 0,
  userInfo: null,
  userPosts: [],
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
      state.userInfo = action.payload;
    },
    getSignedInUserInfoFailed(state, action: PayloadAction<string>) {
    },
    getUserPostsSuccess(state, action: PayloadAction<UserFeedResponseItemsItem[]>) {
      action.payload.forEach(post => {
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

        state.userPosts.push({
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
    setPixelizedUserPost(state, action: PayloadAction<SetPixelizedUrlPayload>) {
      const { index, pixelizedMediaUrl } = action.payload;
      state.userPosts[index].pixelizedMediaUrl = pixelizedMediaUrl;
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
  setPixelizedUserPost,
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

export const setPixelizedUrl = (index: number, pixelizedMediaUrl: string) =>
  (dispatch: Dispatch) => {
    dispatch(setPixelizedUserPost({index, pixelizedMediaUrl}));
  };
