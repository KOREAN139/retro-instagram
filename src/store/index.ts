import instagramReducer from '@ducks/instagram';
import loadingReducer from '@ducks/loading';
import { Action } from '@reduxjs/toolkit';
import { connectRouter, routerMiddleware } from 'connected-react-router';
/* eslint-disable-next-line import/no-extraneous-dependencies */
import { createHashHistory } from 'history';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk, { ThunkAction } from 'redux-thunk';

export const history = createHashHistory();

const rootReducer = combineReducers({
  router: connectRouter(history),
  instagram: instagramReducer,
  loading: loadingReducer,
});

export const configureStore = () => {
  return createStore(
    rootReducer,
    applyMiddleware(thunk, routerMiddleware(history))
  );
};

export type RootState = ReturnType<typeof rootReducer>;

export type Thunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  undefined,
  Action<any>
>;
