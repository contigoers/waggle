import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import promise from 'redux-promise';

import Router from './components/Router';
import reducers from './reducers';

import './styles.scss';
import './search-styles.scss';

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(promise)));
/* eslint-enable */

ReactDOM.render(
  <Router store={store} />
  , document.getElementById('app'),
);
