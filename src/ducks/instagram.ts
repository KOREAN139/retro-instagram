import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import * as InstagramAPI from '../api/instagram';
import {
  UserRepositoryInfoResponseUser,
  UsertagsFeedResponseItemsItem
} from 'instagram-private-api';

interface InstagramState {
  signedIn: boolean
  userPk: number
  userInfo: UserRepositoryInfoResponseUser | null
  userPosts: UsertagsFeedResponseItemsItem[]
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
    getUserPostsSuccess(state, action: PayloadAction<UsertagsFeedResponseItemsItem[]>) {
      action.payload.forEach(post => state.userPosts.push(post));
    },
    getUserPostsFailed(state, action:PayloadAction<string>) {
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
