import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import * as InstagramAPI from '../api/instagram';

interface InstagramState {
  signedIn: boolean
};

const initialState: InstagramState = {
  signedIn: false,
};

const instagramDetails = createSlice({
  name: 'instagram',
  initialState,
  reducers: {
    signInInstagramSuccess(state, action: PayloadAction<void>) {
      state.signedIn = true;
    },
    signInInstagramFailed(state, action: PayloadAction<string>) {
    },
  },
});

export const {
  signInInstagramSuccess,
  signInInstagramFailed,
} = instagramDetails.actions;

export default instagramDetails.reducer;

export const signInInstagram = (username: string, password: string) =>
  async (dispatch: Dispatch) => {
    try {
      await InstagramAPI.signIn(username, password);
      dispatch(signInInstagramSuccess());
    } catch (err) {
      console.error(err);
      dispatch(signInInstagramFailed(err.toString()));
    }
  };
