import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createHashHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk, { ThunkAction } from 'redux-thunk';
import { Action } from '@reduxjs/toolkit';
import instagramReducer from '@ducks/instagram';
import loadingReducer from '@ducks/loading';

export const history = createHashHistory();

const rootReducer = combineReducers({
  router: connectRouter(history),
  instagram: instagramReducer,
  loading: loadingReducer,
});

export const configureStore = () => {
  return createStore(
    rootReducer,
    applyMiddleware(
      thunk,
      routerMiddleware(history)
    ),
  );
};

export type RootState = ReturnType<typeof rootReducer>;

export type Thunk<ReturnType = void> = ThunkAction<ReturnType, RootState, undefined, Action<any>>;
