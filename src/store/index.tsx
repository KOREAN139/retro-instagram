import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createHashHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';

export const history = createHashHistory();

export const configureStore = () => {
	return createStore(
		combineReducers({
			router : connectRouter(history)
		}),
		applyMiddleware(routerMiddleware(history))
	);
};
