import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createHashHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import instagramReducer from '../ducks/instagram';

export const history = createHashHistory();

export const configureStore = () => {
  return createStore(
    combineReducers({
      router: connectRouter(history),
      instagram: instagramReducer,
    }),
    applyMiddleware(
      thunk,
      routerMiddleware(history)
    ),
  );
};
