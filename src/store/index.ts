import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createHashHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import instagramReducer from '../ducks/instagram';

export const history = createHashHistory();

const rootReducer = combineReducers({
  router: connectRouter(history),
  instagram: instagramReducer,
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
