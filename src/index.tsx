import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import RootPage from './pages';
import * as serviceWorker from './serviceWorker';
import * as Mousetrap from 'mousetrap';
import 'mousetrap/plugins/global-bind/mousetrap-global-bind';

// prevent refresh on app
Mousetrap.bindGlobal([
    'command+r',
    'command+shift+r',
    'f5',
    'ctrl+f5',
    'ctrl+r'
  ],
  () => false
);

ReactDOM.render(<RootPage />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
