import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import { Thunk, RootState } from '../store';

interface LoadingState {
  loading: boolean
};

const initialState: LoadingState = {
  loading: false,
};

const loadingDetails = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const {
  setLoading,
} = loadingDetails.actions;

export default loadingDetails.reducer;

export const showLoadingPage = <T>(fn: Thunk<Promise<T>>) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(setLoading(true));
    const res = await fn(dispatch, getState, undefined);
    dispatch(setLoading(false));
    return res;
  };
};
