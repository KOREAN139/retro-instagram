import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';

export const history = createBrowserHistory();

export const configureStore = () => {
	return createStore(
		combineReducers({
			router : connectRouter(history)
		}),
		applyMiddleware(routerMiddleware(history))
	);
};
